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
import OtcAbi from "../abis/OTC.json";
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
            pledgeRate: config[0],
            feeRefund: config[1],
            feeSettle: config[2],
            feeWallet: config[3],
        };
    }

    async getOfferCollateral(value: bigint): Promise<bigint> {
        const config = await this.config();
        return (value * config.pledgeRate) / BigInt(WEI6);
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

    async getFillOrderValue(orderId: bigint, amount: bigint): Promise<bigint> {
        const order = await this.getOrder(orderId);
        if (order.amount === BigInt(0)) throw new Error("Invalid Order");
        if (order.exToken !== ZeroAddress) return BigInt(0);
        let value = order.collateral;
        if (order.orderType === EOrderType.Sell) {
            value = order.value;
        }
        return (value * amount) / order.amount;
    }

    /**
     * Add a new OTC token
     * @param tokenId id of OTC token
     * @param settleDuration settle duration of otc token
     * @returns Promise<ContractTransaction>
     */
    createOtcToken(
        tokenId: string,
        settleDuration: number
    ): Promise<ContractTransaction> {
        return this.contract.createToken.populateTransaction(
            tokenId,
            settleDuration
        );
    }

    /**
     * Settle OTC token
     * @param tokenId id of OTC token
     * @param tokenAddress contract address of OTC token
     * @param settleRate settle rate of OTC token
     * @returns Promise<ContractTransaction>
     */
    settleOtcToken(
        tokenId: string,
        tokenAddress: EvmAddress,
        settleRate: bigint
    ): Promise<ContractTransaction> {
        return this.contract.tokenToSettlePhase.populateTransaction(
            tokenId,
            tokenAddress,
            settleRate
        );
    }

    /**
     * Create a new order
     * @param offerType order type
     * @param pledgeRate pledge rate of OTC token
     * @param tokenId id of otc token
     * @param amount order amount
     * @param price order price
     * @param exToken exchange token contract address
     * @param slippage slippage of order
     * @param isBid is bid order
     * @returns Promise<ContractTransaction>
     */
    async createOffer(
        offerType: EOrderType,
        pledgeRate: bigint,
        tokenId: string,
        amount: bigint,
        price: number,
        exToken: EvmAddress,
        slippage: bigint,
        isBid: boolean
    ): Promise<ContractTransaction> {
        let methodName = "newOffer";
        const sqrtPriceX96 = BigInt(Math.sqrt(price) * 2 ** 96);
        const _value = await this.contract.getValueFromPrice(
            amount,
            sqrtPriceX96,
            9
        );
        const collateral = (_value * pledgeRate) / BigInt(WEI6);
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
            methodName = "newOfferETH";
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
        let value = await this.getFillOrderValue(orderId, amount);
        if (value !== BigInt(0)) {
            methodName = "fillOfferETH";
            overrides = {
                value,
            };
        }

        return this.contract[methodName].populateTransaction(...payload, {
            ...overrides,
        });
    }

    /**
     * Cashout trades with ids
     * @param tradeIds ids of trades
     * @param amount cashout amount
     * @param value cashout value
     * @returns Promise<ContractTransaction>
     */
    async cashoutOrders(
        tradeIds: bigint[],
        amount: bigint,
        value: bigint
    ): Promise<ContractTransaction> {
        return this.contract["shareOrders"].populateTransaction(
            tradeIds,
            amount,
            value
        );
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
                    case EVM_OTC_TOPIC0.NEW_TOKEN:
                        event = "NewToken";
                        break;

                    case EVM_OTC_TOPIC0.NEW_ORDER:
                        event = "NewOrder";
                        break;

                    case EVM_OTC_TOPIC0.CLOSE_ORDER:
                        event = "CloseOrder";
                        break;

                    case EVM_OTC_TOPIC0.NEW_TRADE:
                        event = "NewTrade";
                        break;

                    case EVM_OTC_TOPIC0.CASHOUT_ORDER:
                        event = "ShareOrder";
                        break;

                    case EVM_OTC_TOPIC0.SETTLE_FILLED:
                        event = "SettleFilled";
                        break;
                    case EVM_OTC_TOPIC0.SETTLE_CANCELED:
                        event = "SettleCancelled";
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
