import {
    BN,
    Program,
    IdlAccounts,
    IdlTypes,
    web3,
    AnchorError,
    ProgramError,
} from "@coral-xyz/anchor";
import {
    Connection,
    PublicKey,
    Transaction,
    Commitment,
} from "@solana/web3.js";
import {
    CHAINS,
    CHAIN_ID,
    CONTRACTS,
    EOfferStatus,
    EOfferType,
    EvmAddress,
    WEI6,
} from "../configs";
import { IDL, Otc } from "../idl";
import { SolanaNetwork } from "../networks";
import { IOffer, IOtc, IOtcConfig } from "./otc.interface";
import {
    getConfigAccountPubKey,
    getExTokenAccountPubKey,
    getOrderAccountPubKey,
    getOtcTokenAccountPubKey,
    getRoleAccountPubKey,
    getTradeAccountPubKey,
    getVaultExTokenAccountPubKey,
    getVaultOtcTokenAccountPubKey,
} from "./solana/accounts";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { ContractTransaction } from "ethers";
import {
    NativeAnchorError,
    NativeError,
    idlErrors,
    parseCustomError,
} from "./solana/errors";

export class OtcSolana implements IOtc<PublicKey, BN, Transaction> {
    public connection: Connection;
    public program: Program<Otc>;

    // @ts-ignore
    public configAccountPubKey: PublicKey;
    // @ts-ignore
    configAccountData: IdlAccounts<Otc>["configAccount"];

    constructor(connection: Connection, programId: string) {
        this.connection = connection;

        this.program = new Program(IDL, new PublicKey(programId), {
            connection: this.connection,
        });
    }

    async bootstrap(authority: PublicKey) {
        this.configAccountPubKey = getConfigAccountPubKey(
            this.program,
            authority
        );
        await this.fetchConfigAccount(this.configAccountPubKey);
    }

    async fetchConfigAccount(
        configAccountPubKey: PublicKey,
        commitment?: web3.Commitment
    ): Promise<IdlAccounts<Otc>["configAccount"]> {
        this.configAccountData = await this.program.account.configAccount.fetch(
            configAccountPubKey,
            commitment
        );
        return this.configAccountData;
    }

    async fetchRoleAccount(
        user: PublicKey,
        configAccountPubKey?: PublicKey
    ): Promise<IdlAccounts<Otc>["roleAccount"]> {
        const configAccount = configAccountPubKey ?? this.configAccountPubKey;
        if (!configAccount) {
            throw new Error(`Config Account not found`);
        }
        const roleAccount = getRoleAccountPubKey(
            this.program,
            this.configAccountPubKey,
            user
        );
        return this.program.account.roleAccount.fetch(roleAccount, "confirmed");
    }

    fetchOtcTokenAccount(
        tokenId: BN
    ): Promise<IdlAccounts<Otc>["otcTokenAccount"]> {
        return this.program.account.otcTokenAccount.fetch(
            getOtcTokenAccountPubKey(
                this.program,
                this.configAccountPubKey,
                tokenId
            )
        );
    }

    fetchExTokenAccount(
        token: PublicKey
    ): Promise<IdlAccounts<Otc>["exTokenAccount"]> {
        return this.program.account.exTokenAccount.fetch(
            getExTokenAccountPubKey(
                this.program,
                this.configAccountPubKey,
                token
            )
        );
    }

    fetchOrderAccount(orderId: BN): Promise<IdlAccounts<Otc>["orderAccount"]> {
        return this.program.account.orderAccount.fetch(
            getOrderAccountPubKey(
                this.program,
                this.configAccountPubKey,
                orderId
            )
        );
    }

    fetchTradeAccount(tradeId: BN): Promise<IdlAccounts<Otc>["tradeAccount"]> {
        return this.program.account.tradeAccount.fetch(
            getTradeAccountPubKey(
                this.program,
                this.configAccountPubKey,
                tradeId
            )
        );
    }

    fetchLastOrderId(): Promise<BN> {
        return this.fetchConfigAccount(this.configAccountPubKey).then(
            (r) => r.lastOrderId
        );
    }

    fetchLastTradeId(): Promise<BN> {
        return this.fetchConfigAccount(this.configAccountPubKey).then(
            (r) => r.lastTradeId
        );
    }

    fetchLastCashoutId(): Promise<BN> {
        return this.fetchConfigAccount(this.configAccountPubKey).then(
            (r) => r.lastCashoutId
        );
    }

    createConfigAccount(
        signer: PublicKey,
        feeWallet: PublicKey
    ): Promise<Transaction> {
        if (this.configAccountPubKey) {
            throw new Error("Config account already exists");
        }
        this.configAccountPubKey = getConfigAccountPubKey(this.program, signer);
        return this.program.methods
            .initializeConfig()
            .accounts({
                configAccount: this.configAccountPubKey,
                authority: signer,
                feeWallet: feeWallet,
            })
            .transaction();
    }

    setRole(
        signer: PublicKey,
        user: PublicKey,
        role: IdlTypes<Otc>["Role"]
    ): Promise<Transaction> {
        this.configAccountPubKey = getConfigAccountPubKey(this.program, signer);
        const roleAccount = getRoleAccountPubKey(
            this.program,
            this.configAccountPubKey,
            user
        );
        return this.program.methods
            .setRole(role)
            .accounts({
                configAccount: this.configAccountPubKey,
                roleAccount: roleAccount,
                user: user,
                authority: signer,
            })
            .transaction();
    }

    init(authority: PublicKey, feeWallet: PublicKey): Promise<Transaction> {
        const configAccountPubKey = getConfigAccountPubKey(
            this.program,
            authority
        );

        return this.program.methods
            .initializeConfig()
            .accounts({
                feeWallet: feeWallet,
                configAccount: configAccountPubKey,
                authority,
            })
            .transaction();
    }

    updateConfigAccount(data: {
        feeRefund?: BN;
        feeSettle?: BN;
        feeWallet?: PublicKey;
    }): Promise<Transaction> {
        return this.program.methods
            .updateConfig(
                data.feeRefund ?? null,
                data.feeSettle ?? null,
                data.feeWallet ?? null
            )
            .accounts({
                configAccount: this.configAccountPubKey,
                authority: this.configAccountData.authority,
            })
            .transaction();
    }

    addOtcToken(
        operator: PublicKey,
        tokenId: BN,
        pledgeRate: BN
    ): Promise<Transaction> {
        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tokenId
        );
        const roleAccountPubkey = getRoleAccountPubKey(
            this.program,
            this.configAccountPubKey,
            operator
        );
        return this.program.methods
            .addOtcToken(tokenId, pledgeRate)
            .accounts({
                otcTokenAccount: otcTokenAccountPubKey,
                configAccount: this.configAccountPubKey,
                roleAccount: roleAccountPubkey,
                operator: operator,
                authority: this.configAccountData.authority,
            })
            .transaction();
    }

    async settleOtcToken(
        operator: PublicKey,
        tokenId: BN,
        otcToken: PublicKey,
        settleRate: BN,
        settleDuration: BN,
        feeOtcTokenAccount: PublicKey,
        tokenProgram: PublicKey
    ): Promise<Transaction> {
        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tokenId
        );

        const roleAccountPubkey = getRoleAccountPubKey(
            this.program,
            this.configAccountPubKey,
            operator
        );

        const vaultOtcTokenAccountPubKey = getVaultOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            otcToken
        );

        return this.program.methods
            .settleOtcToken(tokenId, settleRate, settleDuration) // TODO
            .accounts({
                vaultOtcTokenAccount: vaultOtcTokenAccountPubKey,
                otcTokenAccount: otcTokenAccountPubKey,
                mint: otcToken,
                feeOtcTokenAccount: feeOtcTokenAccount,
                configAccount: this.configAccountPubKey,
                roleAccount: roleAccountPubkey,
                operator: operator,
                authority: this.configAccountData.authority,
                feeWallet: this.configAccountData.feeWallet,
                tokenProgram,
            })
            .transaction();
    }

    async setExToken(
        operator: PublicKey,
        token: PublicKey,
        feeExTokenAccount: PublicKey,
        tokenProgram: PublicKey,
        is_accepted: boolean
    ): Promise<Transaction> {
        const roleAccountPubkey = getRoleAccountPubKey(
            this.program,
            this.configAccountPubKey,
            operator
        );

        const exTokenAccountPubKey = getExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            token
        );

        const vaultTokenAccountPubKey = getVaultExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            token
        );

        return this.program.methods
            .setExToken(is_accepted)
            .accounts({
                vaultTokenAccount: vaultTokenAccountPubKey,
                exTokenAccount: exTokenAccountPubKey,
                feeExTokenAccount,
                mint: token,
                configAccount: this.configAccountPubKey,
                feeWallet: this.configAccountData.feeWallet,
                roleAccount: roleAccountPubkey,
                operator,
                authority: this.configAccountData.authority,
                tokenProgram,
            })
            .transaction();
    }

    async createOrder(
        orderId: BN,
        user: PublicKey,
        orderType: IdlTypes<Otc>["OrderType"],
        exToken: PublicKey,
        tokenId: BN,
        amount: BN,
        value: BN,
        slippage: BN,
        isBid: boolean
    ): Promise<Transaction> {
        const vaultTokenAccountPubKey = getVaultExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            exToken
        );

        const exTokenAccountPubKey = getExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            exToken
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(exToken);

        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const userExTokenAccount = await getAssociatedTokenAddress(
            exToken,
            user,
            false,
            exTokenInfo.value.owner
        );

        const orderAccountPubKey = getOrderAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderId
        );

        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tokenId
        );

        // let hash = [
        // 	0xde, 0xa5, 0x66, 0xb6, 0x94, 0x3b, 0xe0, 0xe9, 0x62, 0x53, 0xc2, 0x21,
        // 	0x5b, 0x1b, 0xac, 0x69, 0xe7, 0xa8, 0x1e, 0xdb, 0x41, 0xc5, 0x02, 0x8b,
        // 	0x4f, 0x5c, 0x45, 0xc5, 0x3b, 0x49, 0x54, 0xd0,
        // ];
        // let recovery_id = 1;
        // let signature = [
        // 	0x97, 0xa4, 0xee, 0x31, 0xfe, 0x82, 0x65, 0x72, 0x9f, 0x4a, 0xa6, 0x7d,
        // 	0x24, 0xd4, 0xa7, 0x27, 0xf8, 0xc3, 0x15, 0xa4, 0xc8, 0xf9, 0x80, 0xeb,
        // 	0x4c, 0x4d, 0x4a, 0xfa, 0x6e, 0xc9, 0x42, 0x41, 0x5d, 0x10, 0xd9, 0xc2,
        // 	0x8a, 0x90, 0xe9, 0x92, 0x9c, 0x52, 0x4b, 0x2c, 0xfb, 0x65, 0xdf, 0xbc,
        // 	0xf6, 0x8c, 0xfd, 0x68, 0xdb, 0x17, 0xf9, 0x5d, 0x23, 0x5f, 0x96, 0xd8,
        // 	0xf0, 0x72, 0x01, 0x2d,
        // ];

        const transaction = await this.program.methods
            .createOrder(
                orderId,
                orderType,
                tokenId,
                amount,
                value,
                slippage,
                isBid
            )
            .accounts({
                otcTokenAccount: otcTokenAccountPubKey,
                orderAccount: orderAccountPubKey,
                vaultTokenAccount: vaultTokenAccountPubKey,
                configAccount: this.configAccountPubKey,
                exTokenAccount: exTokenAccountPubKey,
                userTokenAccount: userExTokenAccount,
                user: user,
                exToken: exToken,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async matchOrder(
        user: PublicKey,
        tradeBuyId: BN,
        tradeSellId: BN,
        tradeId: BN
    ): Promise<Transaction> {
        const orderBuyAccountPubKey = getOrderAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tradeBuyId
        );

        const orderSellAccountPubKey = getOrderAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tradeSellId
        );

        const tradeAccountPubKey = getTradeAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tradeId
        );

        const transaction = await this.program.methods
            .matchOrder(tradeBuyId, tradeSellId, tradeId)
            .accounts({
                tradeAccount: tradeAccountPubKey,
                orderBuyAccount: orderBuyAccountPubKey,
                orderSellAccount: orderSellAccountPubKey,
                configAccount: this.configAccountPubKey,
                user: user,
                authority: this.configAccountData.authority,
            })
            .transaction();

        return transaction;
    }

    async fillOrder(
        user: PublicKey,
        exToken: PublicKey,
        orderId: BN,
        tradeId: BN,
        amount: BN
    ): Promise<Transaction> {
        const vaultTokenAccountPubKey = getVaultExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            exToken
        );

        const exTokenAccountPubKey = getExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            exToken
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(exToken);

        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const userExTokenAccount = await getAssociatedTokenAddress(
            exToken,
            user,
            false,
            exTokenInfo.value.owner
        );

        const orderAccountPubKey = getOrderAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderId
        );

        const tradeAccountPubKey = getTradeAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tradeId
        );

        const transaction = await this.program.methods
            .fillOrder(orderId, tradeId, amount)
            .accounts({
                tradeAccount: tradeAccountPubKey,
                orderAccount: orderAccountPubKey,
                vaultTokenAccount: vaultTokenAccountPubKey,
                configAccount: this.configAccountPubKey,
                exTokenAccount: exTokenAccountPubKey,
                userTokenAccount: userExTokenAccount,
                exToken: exToken,
                user: user,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async settleFilled(
        signer: PublicKey,
        orderId: BN,
        tradeId: BN
    ): Promise<Transaction> {
        const [orderAccountData, tradeAccountData] = await Promise.all([
            this.fetchOrderAccount(orderId),
            this.fetchTradeAccount(tradeId),
        ]);

        const vaultTokenAccountPubKey = getVaultExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderAccountData.exToken
        );

        const otcTokenAccountData = await this.fetchOtcTokenAccount(
            orderAccountData.tokenId
        );

        const vaultOtcTokenAccountPubKey = getVaultOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            otcTokenAccountData.token
        );

        const exTokenAccountPubKey = getExTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderAccountData.exToken
        );

        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderAccountData.tokenId
        );

        const [exTokenInfo, otcTokenInfo] = await Promise.all([
            this.connection.getParsedAccountInfo(orderAccountData.exToken),
            this.connection.getParsedAccountInfo(otcTokenAccountData.token),
        ]);

        if (!exTokenInfo.value) throw new Error("Invalid ex token");
        if (!otcTokenInfo.value) throw new Error("Invalid OTC token");

        const [
            buyerExTokenAccount,
            sellerExTokenAccount,
            buyerOtcTokenAccount,
            sellerOtcTokenAccount,
            feeExTokenAccount,
            feeOtcTokenAccount,
        ] = await Promise.all([
            getAssociatedTokenAddress(
                orderAccountData.exToken,
                tradeAccountData.buyer,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                orderAccountData.exToken,
                tradeAccountData.seller,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                otcTokenAccountData.token,
                tradeAccountData.buyer,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                otcTokenAccountData.token,
                tradeAccountData.seller,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                orderAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                otcTokenAccountData.token,
                this.configAccountData.feeWallet,
                false,
                otcTokenInfo.value.owner
            ),
        ]);

        const orderAccountPubKey = getOrderAccountPubKey(
            this.program,
            this.configAccountPubKey,
            orderId
        );

        const tradeAccountPubKey = getTradeAccountPubKey(
            this.program,
            this.configAccountPubKey,
            tradeId
        );

        const transaction = await (signer.equals(tradeAccountData.buyer)
            ? this.program.methods
                  .buyerSettleFilled(orderId, tradeId)
                  .accounts({
                      tradeAccount: tradeAccountPubKey,
                      orderAccount: orderAccountPubKey,
                      vaultTokenAccount: vaultTokenAccountPubKey,
                      vaultOtcTokenAccount: vaultOtcTokenAccountPubKey,
                      otcTokenAccount: otcTokenAccountPubKey,
                      exTokenAccount: exTokenAccountPubKey,
                      configAccount: this.configAccountPubKey,
                      otcToken: otcTokenAccountData.token,
                      exToken: orderAccountData.exToken,
                      buyerExTokenAccount,
                      sellerExTokenAccount,
                      buyerOtcTokenAccount,
                      feeExTokenAccount,
                      feeOtcTokenAccount,
                      buyer: signer,
                      authority: this.configAccountData.authority,
                      exTokenProgram: exTokenInfo.value.owner,
                      otcTokenProgram: otcTokenInfo.value.owner,
                  })
                  .transaction()
            : this.program.methods
                  .sellerSettleFilled(orderId, tradeId)
                  .accounts({
                      tradeAccount: tradeAccountPubKey,
                      orderAccount: orderAccountPubKey,
                      vaultTokenAccount: vaultTokenAccountPubKey,
                      vaultOtcTokenAccount: vaultOtcTokenAccountPubKey,
                      otcTokenAccount: otcTokenAccountPubKey,
                      exTokenAccount: exTokenAccountPubKey,
                      configAccount: this.configAccountPubKey,
                      otcToken: otcTokenAccountData.token,
                      exToken: orderAccountData.exToken,
                      sellerExTokenAccount,
                      buyerOtcTokenAccount,
                      sellerOtcTokenAccount,
                      feeExTokenAccount,
                      feeOtcTokenAccount,
                      seller: signer,
                      authority: this.configAccountData.authority,
                      exTokenProgram: exTokenInfo.value.owner,
                      otcTokenProgram: otcTokenInfo.value.owner,
                  })
                  .transaction());

        return transaction;
    }

    parseError(err: any) {
        const anchorError = AnchorError.parse(err.logs);
        if (anchorError) {
            // Parse Anchor error into another type such that it's consistent.
            return NativeAnchorError.parse(anchorError);
        }

        const programError = ProgramError.parse(err, idlErrors);
        if (typeof err == typeof 0 && idlErrors.has(err)) {
            return new NativeAnchorError(
                parseInt(err),
                idlErrors.get(err) ?? "Unknown Error",
                [],
                []
            );
        }
        if (programError) {
            return programError;
        }

        let customErr = parseCustomError(err);
        if (customErr != null) {
            return customErr;
        }

        let nativeErr = NativeError.parse(err);
        if (nativeErr != null) {
            return nativeErr;
        }

        if (err.simulationResponse) {
            let simulatedError = AnchorError.parse(err.simulationResponse.logs);
            if (simulatedError) {
                return NativeAnchorError.parse(simulatedError);
            }
        }

        return err;
    }
}
