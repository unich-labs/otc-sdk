import * as anchor from "@coral-xyz/anchor";
import { BN, IdlTypes } from "@coral-xyz/anchor";
import {
    getAssociatedTokenAddress,
    createSyncNativeInstruction,
    createCloseAccountInstruction,
} from "@solana/spl-token";
import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
} from "@solana/web3.js";
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
import {
    NewOrderEvent,
    NewTradeEvent,
    OtcEventHandlers,
    OtcEventType,
} from "./solana/types";
import { checkOrCreateAssociatedTokenAccount } from "./solana/utils";
import { IOtc } from "./otc.interface";
import { CHAIN_ID, CONTRACTS, WEI6 } from "../configs";

const WSOL = new PublicKey("So11111111111111111111111111111111111111112");

export class OtcSolana implements IOtc<PublicKey, BN, Transaction> {
    public connection: Connection;
    public program: anchor.Program<Otc>;
    private chainId: CHAIN_ID;

    // @ts-ignore
    public configPda: PublicKey;
    // @ts-ignore
    public configAccountData: anchor.IdlAccounts<Otc>["configAccount"];

    constructor(
        connection: Connection,
        chainId: CHAIN_ID = CHAIN_ID.SOLANA_DEVNET
    ) {
        this.connection = connection;
        this.chainId = chainId;
        this.program = new anchor.Program(
            IDL as Otc,
            new PublicKey(CONTRACTS[chainId].OTC.address),
            {
                connection: this.connection,
            }
        );
    }

    /**
     * bootstrap sdk
     * @param authority address of authority
     */
    async bootstrap(authority?: PublicKey) {
        this.configPda = getConfigAccountPda(
            this.program,
            authority ??
                new PublicKey(CONTRACTS[this.chainId].OTC?.authority ?? "")
        );
        await this.fetchConfigAccount(this.configPda);
    }

    /**
     * fetch config account data
     * @param configPda config account PDA
     * @param commitment connection commitment
     * @returns configAccount
     */
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

    /**
     * fetch role account data
     * @param user user address
     * @param configPda config account PDA
     * @returns roleAccount
     */
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

    /**
     * fetch market account data
     * @param marketId id of market
     * @returns marketAccount
     */
    fetchMarketAccount(
        marketId: BN
    ): Promise<anchor.IdlAccounts<Otc>["marketAccount"]> {
        return this.program.account.marketAccount.fetch(
            getMarketAccountPda(this.program, this.configPda, marketId)
        );
    }

    /**
     * fetch order account data
     * @param marketId id of market
     * @param orderId id of order
     * @returns orderAccount
     */
    fetchOrderAccount(
        marketId: BN,
        orderId: BN
    ): Promise<anchor.IdlAccounts<Otc>["orderAccount"]> {
        return this.program.account.orderAccount.fetch(
            getOrderAccountPda(this.program, this.configPda, marketId, orderId)
        );
    }

    /**
     * fetch trade account data
     * @param marketId id of market
     * @param tradeId id of trade
     * @returns trade account
     */
    fetchTradeAccount(
        marketId: BN,
        tradeId: BN
    ): Promise<anchor.IdlAccounts<Otc>["tradeAccount"]> {
        return this.program.account.tradeAccount.fetch(
            getTradeAccountPda(this.program, this.configPda, marketId, tradeId)
        );
    }

    /**
     * fetch last order id
     * @param marketId id of market
     * @returns lastOrderId
     */
    async fetchLastOrderId(marketId: BN): Promise<BN> {
        return this.fetchMarketAccount(marketId).then((r) => r.lastOrderId);
    }

    /**
     * fetch last trade id
     * @param marketId id of market
     * @returns lastTradeId
     */
    async fetchLastTradeId(marketId: BN): Promise<BN> {
        return this.fetchMarketAccount(marketId).then((r) => r.lastTradeId);
    }

    /**
     * initialize program with authority
     * @param authority authority address
     * @param feeWallet fee wallet address
     * @returns Promise<Transaction>
     */
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

    /**
     * set role for user account by operator only
     * @param authority authority address
     * @param user user address
     * @param role user role
     * @returns
     */
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

    /**
     * update program config by operator only
     * @param feeRefund fee refund
     * @param feeSettle fee settle
     * @param feeWallet fee wallet address
     * @returns
     */
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

    /**
     * create new market by operator only
     * @param operator operator address
     * @param marketId id of market
     * @param exToken exchange token of market
     * @param pledgeRate pledge rate of market
     * @param minTrade min exchange token amount to trade on market
     * @returns Promise<Transaction>
     */
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

        const { tx: createFeeWalletAtaTx } =
            await checkOrCreateAssociatedTokenAccount(
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

    /**
     * update market data by operator only
     * @param operator operator address
     * @param marketId id of market
     * @param updateData data that will been updated of market
     * @returns
     */
    async updateMarket(data: {
        operator: PublicKey;
        marketId: BN;
        updateData: {
            status?: anchor.IdlTypes<Otc>["MarketStatus"];
            settleTime?: BN;
            settleDuration?: BN;
            settleRate?: BN;
            minTrade?: BN;
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
                data.updateData.minTrade ?? null
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

    /**
     * settle market by operator only
     * @param operator operator address
     * @param marketId id of market
     * @param token OTC token address of market
     * @param settleTime settle time of market
     * @param settleDuration settle duration of market
     * @param settleRate settle rate of market
     * @returns Promise<Transaction>
     */
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

        const { tx: createFeeWalletAtaTx } =
            await checkOrCreateAssociatedTokenAccount(
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

    /**
     * create a new order
     * @param marketId id of market
     * @param orderId id of order (optional)
     * @param user user address who create order
     * @param orderSide order type (buy/sell)
     * @param amount OTC token amount of order
     * @param value exchange token value of order
     * @param orderType 0 - standard order, 1 - bid order, 2 - cashout order
     * @param matchOrderIds list order id that matched with new order
     * @returns Promise<Transaction>
     */
    async createOrder(data: {
        marketId: BN;
        orderId?: BN;
        user: PublicKey;
        orderSide: IdlTypes<Otc>["OrderSide"];
        amount: BN;
        value: BN;
        orderType: number;
        matchOrderIds?: BN[];
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

        const tx = new Transaction();

        const { ata: userExTokenAta, tx: createFeeWalletAtaTx } =
            await checkOrCreateAssociatedTokenAccount(
                this.connection,
                data.user,
                data.user,
                marketAccountData.exToken
            );

        // check and wrap sol to wsol
        if (marketAccountData.exToken.equals(WSOL)) {
            if (createFeeWalletAtaTx) tx.add(createFeeWalletAtaTx);

            tx.add(
                SystemProgram.transfer({
                    fromPubkey: data.user,
                    toPubkey: userExTokenAta,
                    lamports: BigInt(
                        data.value
                            .mul(marketAccountData.pledgeRate)
                            .div(new BN(WEI6))
                            .toString()
                    ),
                })
            );

            tx.add(createSyncNativeInstruction(userExTokenAta));
        }

        const createOrderTx = await this.program.methods
            .createOrder(
                data.marketId,
                data.orderSide,
                data.amount,
                data.value,
                data.orderType
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

        tx.add(createOrderTx);

        if (data.matchOrderIds?.length) {
            const vaultExTokenPda = getVaultExTokenAccountPda(
                this.program,
                this.configPda,
                marketAccountData.exToken
            );

            const feeWalletExTokenAta = await getAssociatedTokenAddress(
                marketAccountData.exToken,
                this.configAccountData.feeWallet,
                false,
                exTokenInfo.value.owner
            );

            const isBuy = Object.keys(data.orderSide).includes("buy");

            let length = data.matchOrderIds.length;
            for (let i = 0; i < length; i++) {
                let orderBuyId = isBuy ? _orderId : data.matchOrderIds[i];
                let orderSellId = !isBuy ? _orderId : data.matchOrderIds[i];
                const orderBuyPda = getOrderAccountPda(
                    this.program,
                    this.configPda,
                    data.marketId,
                    orderBuyId
                );
                const orderSellPda = getOrderAccountPda(
                    this.program,
                    this.configPda,
                    data.marketId,
                    orderSellId
                );

                let tradeId = (await this.fetchLastTradeId(data.marketId)).add(
                    new BN(i + 1)
                );
                const tradePda = getTradeAccountPda(
                    this.program,
                    this.configPda,
                    data.marketId,
                    tradeId
                );

                const matchOrderTx = await this.program.methods
                    .matchOrder(data.marketId, orderBuyId, orderSellId)
                    .accounts({
                        marketAccount: marketPda,
                        orderBuyAccount: orderBuyPda,
                        orderSellAccount: orderSellPda,
                        tradeAccount: tradePda,
                        configAccount: this.configPda,
                        vaultExTokenAccount: vaultExTokenPda,
                        feeExTokenAccount: feeWalletExTokenAta,
                        exToken: marketAccountData.exToken,
                        user: data.user,
                        authority: this.configAccountData.authority,
                        tokenProgram: exTokenInfo.value.owner,
                    })
                    .transaction();

                tx.add(matchOrderTx);
            }
        }

        return tx;
    }

    /**
     * cancel order
     * @param user user address who created order
     * @param marketId id of market
     * @param orderId id of open order
     * @returns Promise<Transaction>
     */
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

    /**
     * fill open order
     * @param marketId id of market
     * @param orderId id of open order
     * @param tradeId id of trade (optional)
     * @param user user address who fill order
     * @returns Promise<Transaction>
     */
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

    /**
     * match two open order
     * @param user user address who match order
     * @param marketId id of market
     * @param orderBuyId id of order buy
     * @param orderSellId id of order sell
     * @param tradeId id of trade (optional)
     * @returns
     */
    async matchOrder(data: {
        user: PublicKey;
        marketId: BN;
        orderBuyId: BN;
        orderSellId: BN;
        tradeId?: BN;
    }): Promise<Transaction> {
        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            marketAccountData.exToken
        );
        if (!exTokenInfo.value) throw new Error("Invalid ex token");

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

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const feeWalletExTokenAta = await getAssociatedTokenAddress(
            marketAccountData.exToken,
            this.configAccountData.feeWallet,
            false,
            exTokenInfo.value.owner
        );

        const transaction = await this.program.methods
            .matchOrder(data.marketId, data.orderBuyId, data.orderSellId)
            .accounts({
                marketAccount: marketPda,
                orderBuyAccount: orderBuyPda,
                orderSellAccount: orderSellPda,
                vaultExTokenAccount: vaultExTokenPda,
                feeExTokenAccount: feeWalletExTokenAta,
                tradeAccount: tradePda,
                configAccount: this.configPda,
                exToken: marketAccountData.exToken,
                user: data.user,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    /**
     * cashout an trade
     * @param user user address who is one of buyer seller or seller of trade
     * @param marketId id of market
     * @param tradeId id of trade
     * @param amount cashout amount
     * @param value cashout value
     * @param cashoutId id of new cashout (optional)
     * @param matchOrderIds list order id that match with new cashout (optional)
     * @returns
     */
    async cashoutTrade(data: {
        user: PublicKey;
        marketId: BN;
        tradeId: BN;
        amount: BN;
        value: BN;
        cashoutId?: BN;
        matchOrderIds?: BN[];
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        let _cashoutId = data.cashoutId;
        if (!_cashoutId) {
            _cashoutId = (await this.fetchLastOrderId(data.marketId)).add(
                new BN(1)
            );
        }

        const cashoutPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            _cashoutId
        );

        const tradePda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.tradeId
        );

        const cashoutTx = await this.program.methods
            .cashoutTrade(data.marketId, data.tradeId, data.amount, data.value)
            .accounts({
                marketAccount: marketPda,
                cashoutAccount: cashoutPda,
                tradeAccount: tradePda,
                configAccount: this.configPda,
                user: data.user,
                authority: this.configAccountData.authority,
            })
            .transaction();

        const tx = new Transaction();

        tx.add(cashoutTx);

        if (data.matchOrderIds?.length) {
            const exTokenInfo = await this.connection.getParsedAccountInfo(
                marketAccountData.exToken
            );
            if (!exTokenInfo.value) throw new Error("Invalid ex token");

            const vaultExTokenPda = getVaultExTokenAccountPda(
                this.program,
                this.configPda,
                marketAccountData.exToken
            );

            const [cashoutByExTokenAta, feeWalletExTokenAta] =
                await Promise.all([
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

            let length = data.matchOrderIds.length;
            for (let i = 0; i < length; i++) {
                let _tradeId = (await this.fetchLastTradeId(data.marketId)).add(
                    new BN(i + 1)
                );
                const _tradePda = getTradeAccountPda(
                    this.program,
                    this.configPda,
                    data.marketId,
                    _tradeId
                );

                const orderPda = getOrderAccountPda(
                    this.program,
                    this.configPda,
                    data.marketId,
                    data.matchOrderIds[i]
                );

                const matchCashoutOrderTx = await this.program.methods
                    .matchCashoutOrder(
                        data.marketId,
                        _cashoutId,
                        data.matchOrderIds[i]
                    )
                    .accounts({
                        marketAccount: marketPda,
                        cashoutAccount: cashoutPda,
                        orderAccount: orderPda,
                        tradeCashoutAccount: tradePda,
                        tradeAccount: _tradePda,
                        configAccount: this.configPda,
                        vaultExTokenAccount: vaultExTokenPda,
                        cashoutByExTokenAccount: cashoutByExTokenAta,
                        feeExTokenAccount: feeWalletExTokenAta,
                        exToken: marketAccountData.exToken,
                        user: data.user,
                        authority: this.configAccountData.authority,
                        tokenProgram: exTokenInfo.value.owner,
                    })
                    .transaction();

                tx.add(matchCashoutOrderTx);
            }
        }

        return tx;
    }

    /**
     * match cashout with open order
     * @param user user address who is one of buyer seller or seller of trade
     * @param marketId id of market
     * @param cashoutId id of cashout
     * @param orderId id of order that is matched with cashout
     * @param tradeId id of new trade (optional)
     * @returns
     */
    async matchCashoutOrder(data: {
        user: PublicKey;
        marketId: BN;
        cashoutId: BN;
        orderId: BN;
        tradeId?: BN;
    }): Promise<Transaction> {
        const marketPda = getMarketAccountPda(
            this.program,
            this.configPda,
            data.marketId
        );
        const marketAccountData = await this.fetchMarketAccount(data.marketId);

        const exTokenInfo = await this.connection.getParsedAccountInfo(
            marketAccountData.exToken
        );
        if (!exTokenInfo.value) throw new Error("Invalid ex token");

        const cashoutPda = getOrderAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            data.cashoutId
        );

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

        const vaultExTokenPda = getVaultExTokenAccountPda(
            this.program,
            this.configPda,
            marketAccountData.exToken
        );

        const feeWalletExTokenAta = await getAssociatedTokenAddress(
            marketAccountData.exToken,
            this.configAccountData.feeWallet,
            false,
            exTokenInfo.value.owner
        );

        const cashoutAccountData = await this.fetchOrderAccount(
            data.marketId,
            data.cashoutId
        );

        const tradeCashoutPda = getTradeAccountPda(
            this.program,
            this.configPda,
            data.marketId,
            cashoutAccountData.tradeId
        );

        const transaction = await this.program.methods
            .matchCashoutOrder(data.marketId, data.cashoutId, data.orderId)
            .accounts({
                marketAccount: marketPda,
                cashoutAccount: cashoutPda,
                orderAccount: orderPda,
                tradeCashoutAccount: tradeCashoutPda,
                tradeAccount: tradePda,
                configAccount: this.configPda,
                vaultExTokenAccount: vaultExTokenPda,
                feeExTokenAccount: feeWalletExTokenAta,
                exToken: marketAccountData.exToken,
                user: data.user,
                authority: this.configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    /**
     * settle filled trade
     * @param user user address who is one of buyer seller or seller of trade
     * @param marketId id of market
     * @param tradeId id of trade
     * @returns
     */
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

    /**
     * settle canceled trade
     * @param user user address who is one of buyer seller or seller of trade
     * @param marketId id of market
     * @param tradeId id of trade
     * @returns
     */
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

    // TODO impl
    // async prepareTransaction(tx: Transaction): Promise<VersionedTransaction> {
    //     const instructions = tx.instructions;

    //     const [microLamports, units, recentBlockhash] = await Promise.all([
    //         100 /* Get optimal priority fees - https://solana.com/developers/guides/advanced/how-to-use-priority-fees*/,
    //         getSimulationComputeUnits(
    //             this.connection,
    //             tx.instructions,
    //             tx.feePayer!,
    //             []
    //         ),
    //         this.connection.getLatestBlockhash(),
    //     ]);

    //     instructions.unshift(
    //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports })
    //     );

    //     if (units) {
    //         // probably should add some margin of error to units
    //         instructions.unshift(
    //             ComputeBudgetProgram.setComputeUnitLimit({ units })
    //         );
    //     }

    //     return new VersionedTransaction(
    //         new TransactionMessage({
    //             instructions,
    //             recentBlockhash: recentBlockhash.blockhash,
    //             payerKey: tx.feePayer!,
    //         }).compileToV0Message()
    //     );
    // }

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
                    case "NewOrderEvent":
                        processedEvent = event as NewOrderEvent;
                        callback(
                            processedEvent as OtcEventHandlers[T],
                            slot,
                            signature
                        );
                        break;

                    case "NewTradeEvent":
                        processedEvent = event as NewTradeEvent;
                        callback(
                            processedEvent as OtcEventHandlers[T],
                            slot,
                            signature
                        );
                        break;

                    // TODO add more events

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
