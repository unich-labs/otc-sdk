import {
    Contract,
    ContractTransaction,
    Interface,
    JsonRpcProvider,
    Log,
    Provider,
    ZeroAddress,
} from "ethers";
import {
    CHAINS,
    CHAIN_ID,
    CONTRACTS,
    EOrderType,
    EvmAddress,
    WEI6,
} from "../configs";
import { OTC_TOPIC0 } from "./evm/events";
import { EvmNetwork } from "../networks";
import { OtcAbi, ERC20Abi } from "./evm/abis";
import { IMarket, IOrder, IOtc, IOtcConfig, ITrade } from "./otc.interface";

export class OtcEvm implements IOtc<EvmAddress, bigint, ContractTransaction> {
    protected _contractAddress: EvmAddress;
    protected _contract: Contract;
    protected _network: EvmNetwork;

    constructor(chainId: CHAIN_ID, providers?: Provider[]) {
        this._contractAddress = CONTRACTS[chainId].OTC.address as EvmAddress;
        this._network = new EvmNetwork(
            providers ??
                CHAINS[chainId].rpcUrls.map((r) => new JsonRpcProvider(r))
        );
        this._contract = new Contract(this._contractAddress, OtcAbi, {
            provider: this._network.provider,
        });
    }

    get contract(): Contract {
        return this._contract;
    }

    get provider() {
        return this._network.provider;
    }

    set contract(contractAddress: EvmAddress) {
        this._contract = new Contract(contractAddress, OtcAbi, {
            provider: this._network.provider,
        });
    }

    /**
     * Get OTC contract address
     * @returns OTC contract address
     */
    address(): string {
        return this._contractAddress;
    }

    /**
     * Get OTC contract config
     * @returns OTC contract config
     */
    async config(): Promise<IOtcConfig<bigint, EvmAddress>> {
        const config = await this._contract.config();
        return {
            feeRefund: config[0],
            feeSettle: config[1],
            feeWallet: config[2],
        };
    }

    /**
     * Get OTC token info
     * @param marketId id of token
     * @returns Promise<IMarket<bigint, EvmAddress>>
     */
    async getMarket(marketId: string): Promise<IMarket<bigint, EvmAddress>> {
        const token = await this._contract.markets(marketId);
        return {
            token: token[0],
            exToken: token[1],
            pledgeRate: token[2],
            settleTime: token[3],
            settleDuration: token[4],
            settleRate: token[5],
            status: token[6],
            minTrade: token[7],
            tokenDecimals: token[8],
            exTokenDecimals: token[9],
        };
    }

    /**
     * Get order info
     * @param orderId id of order
     * @returns IOrder
     */
    async getOrder(orderId: bigint): Promise<IOrder<bigint, EvmAddress>> {
        const order = await this._contract.orders(orderId);
        return {
            marketId: order[0],
            orderType: order[1],
            isBid: order[2],
            amount: order[3],
            sqrtPriceX96: order[4],
            filledAmount: order[5],
            status: order[6],
            orderBy: order[7],
        };
    }

    /**
     * Get trade info
     * @param tradeId id of trade
     * @returns Promise<ITrade<bigint, EvmAddress>>
     */
    async getTrade(tradeId: bigint): Promise<ITrade<bigint, EvmAddress>> {
        const trade = await this._contract.trades(tradeId);
        return {
            marketId: trade[0],
            amount: trade[1],
            buyerSqrtPriceX96: trade[2],
            sellerSqrtPriceX96: trade[3],
            settled: trade[4].toNumber(),
            buyerCashOuted: trade[5],
            sellerCashOuted: trade[6],
            seller: trade[7],
            buyer: trade[8],
            status: trade[9],
        };
    }

    async getLastOrderId(): Promise<bigint> {
        return this._contract.lastOrderId();
    }

    async getLastTradeId(): Promise<bigint> {
        return this._contract.lastTradeId();
    }

    getSqrtX96(price: number): BigInt {
        return BigInt(Math.sqrt(price) * 2 ** 96);
    }

    async getValueFromPrice(amount: bigint, price: number): Promise<bigint> {
        return this.contract.getValueFromPrice(
            amount,
            this.getSqrtX96(price),
            9
        );
    }

    async getValueFromSqrtPriceX96(
        amount: bigint,
        sqrtPriceX96: bigint
    ): Promise<bigint> {
        return this.contract.getValueFromPrice(amount, sqrtPriceX96, 9);
    }

    async getFillOrderCollateral(
        orderId: bigint,
        amount: bigint
    ): Promise<bigint> {
        const order = await this.getOrder(orderId);
        const market = await this.getMarket(order.marketId);
        if (order.amount === BigInt(0)) throw new Error("Invalid Order");
        if (market.exToken !== ZeroAddress) return BigInt(0);
        const value = await this.getValueFromSqrtPriceX96(
            amount,
            order.sqrtPriceX96
        );
        return (value * BigInt(market.pledgeRate)) / BigInt(WEI6);
    }

    async getOrderCollateral(
        marketId: string,
        amount: bigint,
        price: number
    ): Promise<bigint> {
        const [value, market] = await Promise.all([
            this.getValueFromPrice(amount, price),
            this.getMarket(marketId),
        ]);
        return (value * BigInt(market.pledgeRate)) / BigInt(WEI6);
    }
    // MARK: Operator functions

    /**
     * Add new market by operator
     * @param tokenId id of OTC token
     * @param pledgeRate pledge rate of OTC token
     * @returns Promise<ContractTransaction>
     */
    newMarket(data: {
        marketId: string;
        exToken: EvmAddress;
        pledgeRate: bigint;
        minTrade: bigint;
    }): Promise<ContractTransaction> {
        return this.contract.newMarket.populateTransaction(
            data.marketId,
            data.exToken,
            data.pledgeRate,
            data.minTrade
        );
    }

    settleMarket(data: {
        marketId: string;
        tokenAddress: EvmAddress;
        settleTime: bigint;
        settleDuration: bigint;
        settleRate: bigint;
    }): Promise<ContractTransaction> {
        return this.contract.settleMarket.populateTransaction(
            data.marketId,
            data.tokenAddress,
            data.settleTime,
            data.settleDuration,
            data.settleRate
        );
    }

    marketToggleActivation(marketId: string): Promise<ContractTransaction> {
        return this.contract.marketToggleActivation.populateTransaction(
            marketId
        );
    }

    marketForceCancelSettlePhase(
        marketId: string
    ): Promise<ContractTransaction> {
        return this.contract.marketForceCancelSettlePhase.populateTransaction(
            marketId
        );
    }

    updateSettleDuration(
        marketId: string,
        settleDuration: bigint
    ): Promise<ContractTransaction> {
        return this.contract.updateSettleDuration.populateTransaction(
            marketId,
            settleDuration
        );
    }

    updateConfig(
        feeWallet: EvmAddress,
        feeSettle: bigint,
        feeRefund: bigint
    ): Promise<ContractTransaction> {
        return this.contract.updateConfig.populateTransaction(
            feeWallet,
            feeSettle,
            feeRefund
        );
    }

    forceCancelOrder(orderId: bigint): Promise<ContractTransaction> {
        return this.contract.forceCancelOrder.populateTransaction(orderId);
    }

    settle2Steps(orderId: bigint, hash: string): Promise<ContractTransaction> {
        return this.contract.settle2Steps.populateTransaction(orderId, hash);
    }

    // MARK: User functions

    /**
     * Approve ERC20 for OTC
     * @param marketId id of market
     * @param amount approved amount
     * @returns Promise<ContractTransaction>
     */
    async approve(
        marketId: string,
        amount: bigint
    ): Promise<ContractTransaction> {
        const market = await this.getMarket(marketId);
        const erc20 = new Contract(market.exToken, ERC20Abi, {
            provider: this._network.provider,
        });
        return erc20.approve.populateTransaction(this._contractAddress, amount);
    }

    /**
     * Create a new order
     * @param offerType order type
     * @param marketId id of market
     * @param amount order amount
     * @param price order price
     * @param isBid is bid order
     * @returns Promise<ContractTransaction>
     */
    async createOrder(data: {
        offerType: EOrderType;
        marketId: string;
        amount: bigint;
        price: number;
        isBid: boolean;
    }): Promise<ContractTransaction> {
        let methodName = "createOrder";
        const sqrtPriceX96 = BigInt(Math.sqrt(data.price) * 2 ** 96);
        let payload = [
            data.offerType,
            data.marketId,
            data.amount,
            sqrtPriceX96,
            data.isBid,
        ];

        let overrides = {};
        const market = await this.getMarket(data.marketId);
        if (market.exToken == ZeroAddress) {
            const collateral = await this.getOrderCollateral(
                data.marketId,
                data.amount,
                data.price
            );
            methodName = "createOrderETH";
            overrides = {
                value: collateral,
            };
        }

        return this.contract[methodName].populateTransaction(...payload, {
            ...overrides,
        });
    }

    /**
     * Accept bid order by order owner
     * @param bidOrderId id of bid order
     * @param orderId id of matched order
     * @returns Promise<ContractTransaction>
     */
    async matchBidOrder(data: {
        bidOrderId: bigint;
        orderId: bigint;
    }): Promise<ContractTransaction> {
        return this.contract.matchBidOrder.populateTransaction(
            data.bidOrderId,
            data.orderId
        );
    }

    /**
     * Change amount and price of open order by order owner
     * @param orderId id of order
     * @param amount updated amount
     * @param price updated price
     * @returns Promise<ContractTransaction>
     */
    async changeOrder(data: {
        orderId: bigint;
        amount: bigint;
        price: number;
    }): Promise<ContractTransaction> {
        return this.contract.changeOrder.populateTransaction(
            data.orderId,
            data.amount,
            this.getSqrtX96(data.price)
        );
    }

    /**
     * Fill open order
     * @param orderId id of order
     * @param amount fill amount
     * @returns Promise<ContractTransaction>
     */
    async fillOffer(data: {
        orderId: bigint;
        amount: bigint;
    }): Promise<ContractTransaction> {
        let methodName = "fillOffer";
        let payload = [data.orderId, data.amount];
        let overrides = {};
        const collateral = await this.getFillOrderCollateral(
            data.orderId,
            data.amount
        );
        if (collateral == BigInt(0)) {
            methodName = "fillOfferETH";
            overrides = {
                value: collateral,
            };
        }

        return this.contract[methodName].populateTransaction(...payload, {
            ...overrides,
        });
    }

    /**
     * Cancel open order by order owner
     * @param orderId id of order
     * @returns Promise<ContractTransaction>
     */
    async cancelOrder(orderId: bigint): Promise<ContractTransaction> {
        return this.contract.cancelOrder.populateTransaction(orderId);
    }

    /**
     * Settle trade order by buyer or seller of trade order
     * @param tradeId id of trade order that is settled
     * @returns
     */
    async settleFilled(tradeId: bigint): Promise<ContractTransaction> {
        return this.contract.settleFilled.populateTransaction(tradeId);
    }

    /**
     * Cancel unfulfilled settled trade order by buyer or seller of trade order to refund assets
     * @param tradeId id of trade order that is canceled
     * @returns
     */
    async settleCancelled(tradeId: bigint): Promise<ContractTransaction> {
        return this.contract.settleCancelled.populateTransaction(tradeId);
    }

    /**
     * Cash out trades with ids
     * @param tradeId id of trade that is cash out
     * @param amount cash out amount
     * @param price cash out price
     * @returns Promise<ContractTransaction>
     */
    async cashOutTrade(data: {
        tradeId: bigint;
        amount: bigint;
        price: number;
    }): Promise<ContractTransaction> {
        return this.contract.cashOutTrade.populateTransaction(
            data.tradeId,
            data.amount,
            this.getSqrtX96(data.price)
        );
    }

    async buyCashOut(cashOutId: bigint): Promise<ContractTransaction> {
        return this.contract.buyCashOut.populateTransaction(cashOutId);
    }

    /**
     * Parse logs of OTC contract
     * @param logs transaction logs
     * @returns Event info
     */
    async parseLogs(logs: Log[]) {
        const otcIface = new Interface(OtcAbi);
        return logs.map((log) => {
            try {
                let event;
                switch (log.topics[0]) {
                    case OTC_TOPIC0.NewMarket:
                        event = "NewMarket";
                        break;

                    case OTC_TOPIC0.SettledMarket:
                        event = "SettledMarket";
                        break;

                    case OTC_TOPIC0.UpdateMarketStatus:
                        event = "UpdateMarketStatus";
                        break;

                    case OTC_TOPIC0.MarketForceCancelSettlePhase:
                        event = "MarketForceCancelSettlePhase";
                        break;

                    case OTC_TOPIC0.UpdateMarketSettleDuration:
                        event = "UpdateMarketSettleDuration";
                        break;

                    case OTC_TOPIC0.NewOrder:
                        event = "NewOrder";
                        break;

                    case OTC_TOPIC0.OrderUpdated:
                        event = "OrderUpdated";
                        break;

                    case OTC_TOPIC0.OrderClosed:
                        event = "OrderClosed";
                        break;

                    case OTC_TOPIC0.NewTrade:
                        event = "NewTrade";
                        break;

                    case OTC_TOPIC0.TradeSettleFilled:
                        event = "TradeSettleFilled";
                        break;

                    case OTC_TOPIC0.TradeSettleCancelled:
                        event = "TradeSettleCancelled";
                        break;

                    case OTC_TOPIC0.TradeCashOuted:
                        event = "TradeCashOuted";
                        break;

                    default:
                        break;
                }
                if (!event) return undefined;
                return otcIface.decodeEventLog(event, log.data, log.topics);
            } catch {
                return undefined;
            }
        });
    }
}
