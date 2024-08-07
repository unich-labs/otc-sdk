import {
    Contract,
    Provider,
    JsonRpcProvider,
    ContractTransaction,
    ZeroAddress,
    formatUnits,
    formatEther,
    Log,
    Interface,
} from "ethers";
import {
    CHAINS,
    CHAIN_ID,
    CONTRACTS,
    EOrderType,
    EvmAddress,
    WEI6,
} from "../configs";
import OtcAbi from "./evm/abis";
import { EvmNetwork } from "../networks";
import { IOtc, IOrder, IOtcConfig } from "./otc.interface";
import { EVM_OTC_TOPIC0 } from "../configs/events";

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
     * Get order info
     * @param orderId id of order
     * @returns IOrder
     */
    async getOrder(orderId: bigint): Promise<IOrder<bigint, EvmAddress>> {
        const offer = await this._contract.offers(orderId);
        return {
            orderType: offer[0],
            tokenId: offer[1],
            exToken: offer[2],
            amount: offer[3],
            value: offer[4],
            collateral: offer[5],
            filledAmount: offer[6],
            status: offer[7],
            offerBy: offer[8],
            fullMatch: offer[9],
        };
    }

    /**
     * Get trade info
     * @param tradeId id of trade
     * @returns Trade info
     */
    async getTrade(tradeId: bigint): Promise<any> {
        return this._contract.trades(tradeId);
    }

    /**
     * Get OTC token info
     * @param tokenId id of token
     * @returns OTC token info
     */
    async getToken(tokenId: string): Promise<any> {
        return this._contract.tokens(tokenId);
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
        if (order.amount === BigInt(0)) throw new Error("Invalid Order");
        if (order.exToken !== ZeroAddress) return BigInt(0);
        return this.getValueFromSqrtPriceX96(amount, order.amount); // TODO
    }

    async getOrderCollateral(
        tokenId: string,
        amount: bigint,
        price: number
    ): Promise<bigint> {
        const value = this.getValueFromPrice(amount, price);
        const token = await this.getToken(tokenId);
        const collateral = BigInt(WEI6); // TODO
        // (value * BigInt(token.pledgeRate)) / BigInt(WEI6);

        return collateral;
    }

    // MARK: Operator functions

    /**
     * Add new OTC token by operator
     * @param tokenId id of OTC token
     * @param pledgeRate pledge rate of OTC token
     * @returns Promise<ContractTransaction>
     */
    addOtcToken(
        tokenId: string,
        pledgeRate: bigint
    ): Promise<ContractTransaction> {
        return this.contract.addOtcToken.populateTransaction(
            tokenId,
            pledgeRate
        );
    }

    tokenToSettlePhase(
        tokenId: string,
        tokenAddress: EvmAddress,
        settleRate: bigint,
        settleDuration: bigint
    ): Promise<ContractTransaction> {
        return this.contract.tokenToSettlePhase.populateTransaction(
            tokenId,
            tokenAddress,
            settleRate,
            settleDuration
        );
    }

    tokenToggleActivation(tokenId: string): Promise<ContractTransaction> {
        return this.contract.tokenToggleActivation.populateTransaction(tokenId);
    }

    tokenForceCancelSettlePhase(tokenId: string): Promise<ContractTransaction> {
        return this.contract.tokenForceCancelSettlePhase.populateTransaction(
            tokenId
        );
    }

    updateSettleDuration(
        tokenId: string,
        settleDuration: bigint
    ): Promise<ContractTransaction> {
        return this.contract.updateSettleDuration.populateTransaction(
            tokenId,
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

    setAcceptedTokens(
        tokenAddresses: EvmAddress[],
        isAccepted: boolean
    ): Promise<ContractTransaction> {
        return this.contract.setAcceptedTokens.populateTransaction(
            tokenAddresses,
            isAccepted
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
     * Create a new order
     * @param offerType order type
     * @param tokenId id of otc token
     * @param amount order amount
     * @param price order price
     * @param exToken exchange token contract address, if exToken == 0x0000000000000000000000000000000000000000 => createOrderETH, else createOrder
     * @param slippage slippage of order
     * @param isBid is bid order
     * @returns Promise<ContractTransaction>
     */
    async createOrder(
        offerType: EOrderType,
        tokenId: string,
        amount: bigint,
        price: number,
        exToken: EvmAddress,
        slippage: bigint,
        isBid: boolean
    ): Promise<ContractTransaction> {
        let methodName = "createOrder";
        const sqrtPriceX96 = BigInt(Math.sqrt(price) * 2 ** 96);
        let payload = [
            offerType,
            tokenId,
            amount,
            sqrtPriceX96,
            exToken,
            slippage,
            isBid,
        ];
        let overrides = {};
        if (exToken == ZeroAddress) {
            const collateral = await this.getOrderCollateral(
                tokenId,
                amount,
                price
            );

            methodName = "createOrderETH";
            payload = [
                offerType,
                tokenId,
                amount,
                sqrtPriceX96,
                slippage,
                isBid,
            ];
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
    async matchBidOrder(
        bidOrderId: bigint,
        orderId: bigint
    ): Promise<ContractTransaction> {
        return this.contract.matchBidOrder.populateTransaction(
            bidOrderId,
            orderId
        );
    }

    /**
     * Change amount and price of open order by order owner
     * @param orderId id of order
     * @param amount updated amount
     * @param price updated price
     * @returns Promise<ContractTransaction>
     */
    async changeOrder(
        orderId: bigint,
        amount: bigint,
        price: number
    ): Promise<ContractTransaction> {
        return this.contract.changeOrder.populateTransaction(
            orderId,
            amount,
            this.getSqrtX96(price)
        );
    }

    /**
     * Fill open order
     * @param orderId id of order
     * @param amount fill amount
     * @returns Promise<ContractTransaction>
     */
    async fillOffer(
        orderId: bigint,
        amount: bigint
    ): Promise<ContractTransaction> {
        let methodName = "fillOffer";
        let payload = [orderId, amount];
        let overrides = {};
        const collateral = await this.getFillOrderCollateral(orderId, amount);
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
        // TODO impl
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
     * @param tradeIds list id of trade that is cash out
     * @param amount cash out amount
     * @param price cash out price
     * @returns Promise<ContractTransaction>
     */
    async cashOutTrades(
        tradeIds: bigint[],
        amount: bigint,
        price: number
    ): Promise<ContractTransaction> {
        return this.contract.cashOutTrades.populateTransaction(
            tradeIds,
            amount,
            this.getSqrtX96(price)
        );
    }

    async buyCashOut(cashOutId: bigint): Promise<ContractTransaction> {
        // TODO impl
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
                    case EVM_OTC_TOPIC0.NewToken:
                        event = "NewToken";
                        break;

                    case EVM_OTC_TOPIC0.UpdateAcceptedTokens:
                        event = "UpdateAcceptedTokens";
                        break;

                    case EVM_OTC_TOPIC0.TokenToSettlePhase:
                        event = "TokenToSettlePhase";
                        break;

                    case EVM_OTC_TOPIC0.UpdateTokenStatus:
                        event = "UpdateTokenStatus";
                        break;

                    case EVM_OTC_TOPIC0.TokenForceCancelSettlePhase:
                        event = "TokenForceCancelSettlePhase";
                        break;

                    case EVM_OTC_TOPIC0.Settle2Steps:
                        event = "Settle2Steps";
                        break;

                    case EVM_OTC_TOPIC0.UpdateTokenSettleDuration:
                        event = "UpdateTokenSettleDuration";
                        break;

                    case EVM_OTC_TOPIC0.NewOrder:
                        event = "NewOrder";
                        break;

                    case EVM_OTC_TOPIC0.OrderUpdated:
                        event = "OrderUpdated";
                        break;

                    case EVM_OTC_TOPIC0.OrderClosed:
                        event = "OrderClosed";
                        break;

                    case EVM_OTC_TOPIC0.NewTrade:
                        event = "NewTrade";
                        break;

                    case EVM_OTC_TOPIC0.TradeSettleFilled:
                        event = "TradeSettleFilled";
                        break;

                    case EVM_OTC_TOPIC0.TradeSettleCancelled:
                        event = "TradeSettleCancelled";
                        break;

                    case EVM_OTC_TOPIC0.TradeCashOuted:
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
