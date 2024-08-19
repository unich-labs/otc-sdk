import * as anchor from "@coral-xyz/anchor";
import { BN, IdlTypes } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
    getConfigAccountPda,
    getMarketAccountPda,
    getOrderAccountPda,
    getRoleAccountPda,
    getTradeAccountPda,
    getVaultExTokenAccountPda,
    getVaultTokenAccountPda,
} from "./solana/accounts";
import { IDL, Otc } from "./solana/idl/otc";

import {
    NativeAnchorError,
    NativeError,
    idlErrors,
    parseCustomError,
} from "./solana/errors";
import { OtcEventHandlers, OtcEventType } from "./solana/types";
import { checkOrCreateAssociatedTokenAccount } from "./solana/utils";
import { IOtc } from "./otc.interface";

// TODO wrap sol to wsol

export class OtcSolana implements IOtc<PublicKey, BN, Transaction> {
    public connection: Connection;
    public program: anchor.Program<Otc>;

    // @ts-ignore
    public configPda: PublicKey;
    // @ts-ignore
    public configAccountData: anchor.IdlAccounts<Otc>["configAccount"];

    constructor(connection: Connection, program: PublicKey) {
        this.connection = connection;

        this.program = new anchor.Program(IDL as Otc, program, {
            connection: this.connection,
        });
    }

    async bootstrap(authority: PublicKey) {
        this.configPda = getConfigAccountPda(this.program, authority);
        await this.fetchConfigAccount(this.configPda);
    }

    async fetchConfigAccount(
        configPda: PublicKey,
        commitment?: anchor.web3.Commitment
    ): Promise<anchor.IdlAccounts<Otc>["configAccount"]> {
        this.configAccountData = await this.program.account.configAccount.fetch(
            configPda,
            commitment
        );
        return this.configAccountData;
    }

    async fetchRoleAccount(
        user: PublicKey,
        configPda?: PublicKey
    ): Promise<anchor.IdlAccounts<Otc>["roleAccount"]> {
        const configAccount = configPda ?? this.configPda;
        if (!configAccount) {
            throw new Error(`Config Account not found`);
        }
        const roleAccountPda = getRoleAccountPda(
            this.program,
            this.configPda,
            user
        );
        return this.program.account.roleAccount.fetch(
            roleAccountPda,
            "confirmed"
        );
    }

    fetchMarketAccount(
        marketId: BN
    ): Promise<anchor.IdlAccounts<Otc>["marketAccount"]> {
        return this.program.account.marketAccount.fetch(
            getMarketAccountPda(this.program, this.configPda, marketId)
        );
    }

    fetchOrderAccount(
        marketId: BN,
        orderId: BN
    ): Promise<anchor.IdlAccounts<Otc>["orderAccount"]> {
        return this.program.account.orderAccount.fetch(
            getOrderAccountPda(this.program, this.configPda, marketId, orderId)
        );
    }

    fetchTradeAccount(
        marketId: BN,
        tradeId: BN
    ): Promise<anchor.IdlAccounts<Otc>["tradeAccount"]> {
        return this.program.account.tradeAccount.fetch(
            getTradeAccountPda(this.program, this.configPda, marketId, tradeId)
        );
    }

    fetchLastOrderId(marketId: BN): Promise<BN> {
        return this.fetchMarketAccount(marketId).then((r) => r.lastOrderId);
    }

    fetchLastTradeId(marketId: BN): Promise<BN> {
        return this.fetchMarketAccount(marketId).then((r) => r.lastTradeId);
    }

    fetchLastCashoutId(marketId: BN): Promise<BN> {
        return this.fetchMarketAccount(marketId).then((r) => r.lastCashoutId);
    }

    initialize(
        authority: PublicKey,
        feeWallet: PublicKey
    ): Promise<Transaction> {
        const configPda = getConfigAccountPda(this.program, authority);
        return this.program.methods
            .initialize()
            .accounts({
                configAccount: configPda,
                feeWallet,
                authority,
            })
            .transaction();
    }

    setRole(data: {
        authority: PublicKey;
        user: PublicKey;
        role: anchor.IdlTypes<Otc>["Role"];
    }): Promise<Transaction> {
        this.configPda = getConfigAccountPda(this.program, data.authority);
        const rolePda = getRoleAccountPda(
            this.program,
            this.configPda,
            data.user
        );
        return this.program.methods
            .setRole(data.role)
            .accounts({
                configAccount: this.configPda,
                roleAccount: rolePda,
                user: data.user,
                authority: data.authority,
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
                configAccount: this.configPda,
                authority: this.configAccountData.authority,
            })
            .transaction();
    }

    async newMarket(data: {
        operator: PublicKey;
        marketId: BN;
        exToken: PublicKey;
        pledgeRate: BN;
        minTrade: BN;
    }): Promise<Transaction> {
        const rolePda = getRoleAccountPda(
            this.program,
            this.configPda,
            data.operator
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            data.exToken
        );
        if (!exTokenInfo.value) throw new Error("Exchange token is not exits");

        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            data.exToken
        );

        const tx = new Transaction();

        const createFeeWalletAtaTx = await checkOrCreateAssociatedTokenAccount(
            this.connection,
            this.configAccountData.feeWallet,
            data.operator,
            data.exToken
        );

        if (createFeeWalletAtaTx) tx.add(createFeeWalletAtaTx);

        const newMarketTx = await this.program.methods
            .newMarket(data.marketId, data.pledgeRate, data.minTrade)
            .accounts({
                marketAccount: marketPda,
                vaultExTokenAccount: vaultExTokenPda,
                exToken: data.exToken,
                configAccount: this.configPda,
                roleAccount: rolePda,
                operator: data.operator,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        tx.add(newMarketTx);

        return tx;
    }

    async updateMarket(data: {
        operator: PublicKey;
        marketId: BN;
        updateData: {
            status?: anchor.IdlTypes<Otc>["MarketStatus"];
            settleTime?: BN;
            settleDuration?: BN;
            settleRate?: BN;
            pledgeRate?: BN;
        };
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const rolePda = getRoleAccountPda(
            this.program,
            this.configPda,
            data.operator
        );

        return this.program.methods
            .updateMarket(
                data.marketId,
                data.updateData.status ?? null,
                data.updateData.settleTime ?? null,
                data.updateData.settleDuration ?? null,
                data.updateData.settleRate ?? null,
                data.updateData.pledgeRate ?? null
            )
            .accounts({
                marketAccount: marketPda,
                configAccount: this.configPda,
                roleAccount: rolePda,
                operator: data.operator,
                authority: this.configAccountData.authority,
            })
            .transaction();
    }

    async settleMarket(data: {
        operator: PublicKey;
        marketId: BN;
        token: PublicKey;
        settleTime: BN;
        settleDuration: BN;
        settleRate: BN;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const rolePda = getRoleAccountPda(
            this.program,
            this.configPda,
            data.operator
        );

        const tokenInfo = await this.connection.getParsedAccountInfo(
            data.token
        );
        if (!tokenInfo.value) throw new Error("OTC token is not exits");

        const vaultTokenPda = getVaultTokenAccountPda(
            this.program,
            this.configPda,
            data.token
        );

        const tx = new Transaction();

        const createFeeWalletAtaTx = await checkOrCreateAssociatedTokenAccount(
            this.connection,
            this.configAccountData.feeWallet,
            data.operator,
            data.token
        );

        if (createFeeWalletAtaTx) tx.add(createFeeWalletAtaTx);

        const settleTx = await this.program.methods
            .settleMarket(
                data.marketId,
                data.settleTime,
                data.settleDuration,
                data.settleRate
            )
            .accounts({
                marketAccount: marketPda,
                configAccount: this.configPda,
                vaultTokenAccount: vaultTokenPda,
                token: data.token,
                roleAccount: rolePda,
                operator: data.operator,
                authority: this.configAccountData.authority,
                tokenProgram: tokenInfo.value.owner,
            })
            .transaction();

        tx.add(settleTx);

        return tx;
    }

    async createOrder(data: {
        marketId: BN;
        orderId?: BN;
        user: PublicKey;
        orderType: IdlTypes<Otc>["OrderType"];
        amount: BN;
        value: BN;
        slippage: BN;
        isBid: boolean;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );

        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            marketAccountData.exToken
        );
        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const userExTokenAta = await getAssociatedTokenAddress(
            marketAccountData.exToken,
            data.user,
            false,
            exTokenInfo.value.owner
        );

        let _orderId = data.orderId;
        if (!_orderId) {
            _orderId = (await this.fetchLastOrderId(data.marketId)).add(
                new BN(1)
            );
        }

        const orderPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            _orderId
        );

        const transaction = await this.program.methods
            .createOrder(
                data.marketId,
                data.orderType,
                data.amount,
                data.value,
                data.slippage,
                data.isBid
            )
            .accounts({
                marketAccount: marketPda,
                orderAccount: orderPda,
                vaultExTokenAccount: vaultExTokenPda,
                configAccount: this.configPda,
                userExTokenAccount: userExTokenAta,
                user: data.user,
                exToken: marketAccountData.exToken,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async cancelOrder(data: {
        user: PublicKey;
        marketId: BN;
        orderId: BN;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );

        const orderPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.orderId
        );

        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            marketAccountData.exToken
        );
        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const [userExTokenAta, feeWalletExTokenAta] = await Promise.all([
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                data.user,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            ),
        ]);

        const transaction = await this.program.methods
            .cancelOrder(data.marketId, data.orderId)
            .accounts({
                marketAccount: marketPda,
                orderAccount: orderPda,
                vaultExTokenAccount: vaultExTokenPda,
                feeExTokenAccount: feeWalletExTokenAta,
                userTokenAccount: userExTokenAta,
                configAccount: this.configPda,
                exToken: marketAccountData.exToken,
                user: data.user,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async fillOrder(data: {
        marketId: BN;
        orderId: BN;
        tradeId?: BN;
        amount: BN;
        user: PublicKey;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );

        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            marketAccountData.exToken
        );
        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const [userExTokenAta, feeWalletExTokenAta] = await Promise.all([
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                data.user,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            ),
        ]);

        const orderPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.orderId
        );

        let _tradeId = data.tradeId;
        if (!_tradeId) {
            _tradeId = (await this.fetchLastTradeId(data.marketId)).add(
                new BN(1)
            );
        }

        const tradePda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            _tradeId
        );

        const transaction = await this.program.methods
            .fillOrder(data.marketId, data.orderId, data.amount)
            .accounts({
                marketAccount: marketPda,
                tradeAccount: tradePda,
                orderAccount: orderPda,
                vaultExTokenAccount: vaultExTokenPda,
                configAccount: this.configPda,
                userTokenAccount: userExTokenAta,
                feeExTokenAccount: feeWalletExTokenAta,
                exToken: marketAccountData.exToken,
                user: data.user,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async matchOrder(data: {
        user: PublicKey;
        marketId: BN;
        orderBuyId: BN;
        orderSellId: BN;
        tradeId?: BN;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );

        const orderBuyPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.orderBuyId
        );

        const orderSellPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.orderSellId
        );

        let _tradeId = data.tradeId;
        if (!_tradeId) {
            _tradeId = (await this.fetchLastTradeId(data.marketId)).add(
                new BN(1)
            );
        }

        const tradePda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            _tradeId
        );

        const transaction = await this.program.methods
            .matchOrder(data.marketId, data.orderBuyId, data.orderSellId)
            .accounts({
                marketAccount: marketPda,
                orderBuyAccount: orderBuyPda,
                orderSellAccount: orderSellPda,
                tradeAccount: tradePda,
                configAccount: this.configPda,
                user: data.user,
                authority: this.configAccountData.authority,
            })
            .transaction();

        return transaction;
    }

    async settleFilled(data: {
        user: PublicKey;
        marketId: BN;
        tradeId: BN;
    }): Promise<Transaction> {
        const [marketAccountData, tradeAccountData] = await Promise.all([
            this.fetchMarketAccount(data.marketId),
            this.fetchTradeAccount(data.marketId, data.tradeId),
        ]);

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const vaultTokenPda = getVaultTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.token
        );

        const [exTokenInfo, otcTokenInfo] = await Promise.all([
            this.connection.getParsedAccountInfo(marketAccountData.exToken),
            this.connection.getParsedAccountInfo(marketAccountData.token),
        ]);
        if (!exTokenInfo.value) throw new Error("Invalid exchange token");
        if (!otcTokenInfo.value) throw new Error("Invalid OTC token");

        const [
            buyerExTokenAta,
            sellerExTokenAta,
            buyerTokenAta,
            sellerTokenAta,
            feeWalletExTokenAta,
            feeWalletTokenAta,
        ] = await Promise.all([
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                tradeAccountData.buyer,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                tradeAccountData.seller,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.token,
                tradeAccountData.buyer,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.token,
                tradeAccountData.seller,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.token,
                this.configAccountData.feeWallet,
                false,
                otcTokenInfo.value.owner
            ),
        ]);
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const tradePda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.tradeId
        );

        const transaction = this.program.methods
            .settleFilled(data.marketId, data.tradeId)
            .accounts({
                marketAccount: marketPda,
                tradeAccount: tradePda,
                vaultExTokenAccount: vaultExTokenPda,
                vaultTokenAccount: vaultTokenPda,
                configAccount: this.configPda,
                buyerExTokenAccount: buyerExTokenAta,
                sellerExTokenAccount: sellerExTokenAta,
                buyerTokenAccount: buyerTokenAta,
                sellerTokenAccount: sellerTokenAta,
                feeExTokenAccount: feeWalletExTokenAta,
                feeTokenAccount: feeWalletTokenAta,
                user: data.user,
                token: marketAccountData.token,
                exToken: marketAccountData.exToken,
                authority: this.configAccountData.authority,
                tokenProgram: otcTokenInfo.value.owner,
                exTokenProgram: exTokenInfo.value.owner,
            })
            .transaction();
        return transaction;
    }

    async settleCanceled(data: {
        user: PublicKey;
        marketId: BN;
        tradeId: BN;
    }): Promise<Transaction> {
        const [marketAccountData, tradeAccountData] = await Promise.all([
            this.fetchMarketAccount(data.marketId),
            this.fetchTradeAccount(data.marketId, data.tradeId),
        ]);

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const vaultTokenPda = getVaultTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.token
        );

        const [exTokenInfo, otcTokenInfo] = await Promise.all([
            this.connection.getParsedAccountInfo(marketAccountData.exToken),
            this.connection.getParsedAccountInfo(marketAccountData.token),
        ]);
        if (!exTokenInfo.value) throw new Error("Invalid exchange token");
        if (!otcTokenInfo.value) throw new Error("Invalid OTC token");

        const [
            buyerExTokenAta,
            sellerExTokenAta,
            buyerTokenAta,
            sellerTokenAta,
            feeWalletExTokenAta,
        ] = await Promise.all([
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                tradeAccountData.buyer,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                tradeAccountData.seller,
                false,
                exTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.token,
                tradeAccountData.buyer,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.token,
                tradeAccountData.seller,
                false,
                otcTokenInfo.value.owner
            ),
            getAssociatedTokenAddress(
                marketAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            ),
        ]);
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const tradePda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.tradeId
        );

        const transaction = this.program.methods
            .settleCanceled(data.marketId, data.tradeId)
            .accounts({
                marketAccount: marketPda,
                tradeAccount: tradePda,
                vaultExTokenAccount: vaultExTokenPda,
                vaultTokenAccount: vaultTokenPda,
                configAccount: this.configPda,
                buyerExTokenAccount: buyerExTokenAta,
                sellerExTokenAccount: sellerExTokenAta,
                buyerTokenAccount: buyerTokenAta,
                sellerTokenAccount: sellerTokenAta,
                feeExTokenAccount: feeWalletExTokenAta,
                user: data.user,
                token: marketAccountData.token,
                exToken: marketAccountData.exToken,
                authority: this.configAccountData.authority,
                tokenProgram: otcTokenInfo.value.owner,
                exTokenProgram: exTokenInfo.value.owner,
            })
            .transaction();
        return transaction;
    }

    prepareTransaction(tx: Transaction) {
        const _tx = new Transaction();

        // TODO impl

        // calculate compute unit limit

        // set compute price
    }

    parseError(err: any) {
        const anchorError = anchor.AnchorError.parse(err.logs);
        if (anchorError) {
            // Parse Anchor error into another type such that it's consistent.
            return NativeAnchorError.parse(anchorError);
        }

        const programError = anchor.ProgramError.parse(err, idlErrors);
        if (typeof err == typeof 0 && idlErrors.has(err)) {
            return new NativeAnchorError(
                parseInt(err),
                // @ts-ignore
                idlErrors.get(err),
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
            let simulatedError = anchor.AnchorError.parse(
                err.simulationResponse.logs
            );
            if (simulatedError) {
                return NativeAnchorError.parse(simulatedError);
            }
        }

        return err;
    }

    // listen events
    addEventListener<T extends OtcEventType>(
        eventType: T,
        callback: (
            event: OtcEventHandlers[T],
            slot: number,
            signature: string
        ) => void
    ) {
        return this.program.addEventListener(
            eventType,
            (event: any, slot: number, signature: string) => {
                let processedEvent;
                switch (eventType) {
                    // case "createEvent":
                    // 	processedEvent = toCreateEvent(event as CreateEvent);
                    // 	callback(
                    // 		processedEvent as PumpFunEventHandlers[T],
                    // 		slot,
                    // 		signature
                    // 	);
                    // 	break;
                    // case "tradeEvent":
                    // 	processedEvent = toTradeEvent(event as TradeEvent);
                    // 	callback(
                    // 		processedEvent as PumpFunEventHandlers[T],
                    // 		slot,
                    // 		signature
                    // 	);
                    // 	break;
                    // case "completeEvent":
                    // 	processedEvent = toCompleteEvent(event as CompleteEvent);
                    // 	callback(
                    // 		processedEvent as PumpFunEventHandlers[T],
                    // 		slot,
                    // 		signature
                    // 	);
                    // 	console.log("completeEvent", event, slot, signature);
                    // 	break;
                    // case "setParamsEvent":
                    // 	processedEvent = toSetParamsEvent(event as SetParamsEvent);
                    // 	callback(
                    // 		processedEvent as PumpFunEventHandlers[T],
                    // 		slot,
                    // 		signature
                    // 	);
                    // 	break;
                    default:
                        console.error("Unhandled event type:", eventType);
                }
            }
        );
    }

    removeEventListener(eventId: number) {
        this.program.removeEventListener(eventId);
    }
}
