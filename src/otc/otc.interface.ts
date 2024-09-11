import {
    EOrderStatus,
    EOrderSide,
    ETradeStatus,
    EMarketStatus,
} from "../configs";

/**
 * Config interface
 */
export interface IOtcConfig<BN, Address> {
    /**
     * fee to refund
     */
    feeRefund: BN;

    /**
     * fee to settle and cash out
     */
    feeSettle: BN;

    /**
     * fee wallet that is received fee
     */
    feeWallet: Address;
}

/**
 * Market interface
 */
export interface IMarket<BN, Address> {
    /**
     * OTC token address
     */
    token: Address;

    /**
     * exchange token address
     */
    exToken: Address;

    /**
     * pledge rate of market
     */
    pledgeRate: BN;

    /**
     * settle time of market
     */
    settleTime: BN;

    /**
     * settle duration of market
     */
    settleDuration: BN;

    /**
     * settle rate of market
     */
    settleRate: BN;

    /**
     * market status
     */
    status: EMarketStatus;

    /**
     * min exchange token amount to trade on market
     */
    minTrade: BN;

    /**
     * exchange token decimals
     */
    exTokenDecimals: number;
}

/**
 *  Order interface
 */
export interface IOrder<BN, Address> {
    /**
     * id of market
     */
    marketId: string;

    /**
     * order type (buy or sell)
     */
    orderSide: EOrderSide;

    /**
     * order amount
     */
    amount: BN;

    /**
     * sqrtX96 price of order
     */
    sqrtPriceX96: BN;

    /**
     * filled amount of order
     */
    filledAmount: BN;

    /**
     * order status
     */
    status: EOrderStatus;

    /**
     * order type (0 standard order, 1 bid order, 2 cashout order)
     */
    orderType: boolean;

    /**
     * order owner address
     */
    orderBy: Address;

    /**
     * cashout trade id if order type is cashout order
     */
    cashoutTradeId: Address;
}

/**
 * Trade order interface
 */
export interface ITrade<BN, Address> {
    /**
     * id of market
     */
    marketId: BN;

    /**
     * amount of trade order
     */
    amount: BN;

    /**
     * sqrtX96 price of buyer
     */
    buyerSqrtPriceX96: BN;

    /**
     * sqrtX96 price of seller
     */
    sellerSqrtPriceX96: BN;

    /**
     * settled status
     * default 1
     * buyer settled: 2
     * seller settled: 3
     * both buyer and seller settle: 6
     */
    settled: number;

    /**
     * amount that buyer cash out
     */
    buyerCashOuted: BN;

    /**
     * amount that seller cash out
     */
    sellerCashOuted: BN;

    /**
     * seller address
     */
    seller: Address;

    /**
     * buyer address
     */
    buyer: Address;

    /**
     * trade order status
     */
    status: ETradeStatus;
}

/**
 * Cash out interface
 */
export interface ICashOut<BN, Address> {
    /**
     * id of trade that is cash out
     */
    tradeId: BN;

    /**
     * address whose cash out trade
     */
    cashOutBy: BN;

    /**
     * cash out amount
     */
    amount: BN;

    /**
     * cash out sqrtX96 price
     */
    sqrtPriceX96: BN;

    /**
     * filled amount of cash out
     */
    filledAmount: number;
}

export interface IOtc<Address, BN, Transaction> {
    // TODO abstract OTC class
    // config: () => Promise<IOtcConfig<BN, Address>>;
    // getOffer: (offerId: BN) => Promise<IOrder<BN, Address>>;
    // getOrder: (orderId: BN) => Promise<IOrder<BN, Address>>;
    // createOtcToken: (
    //     tokenId: any,
    //     settleDuration: number,
    //     operator: Address
    // ) => Promise<Transaction>;
    // settleOtcToken: (
    //     tokenId: any,
    //     tokenAddress: Address,
    //     settleRate: BN,
    //     operator: Address
    // ) => Promise<Transaction>;
    // createOffer: (
    //     offerType: EOrderSide,
    //     tokenId: any,
    //     amount: BN,
    //     value: BN,
    //     exToken: Address,
    //     fullMatch: boolean,
    //     user?: Address
    // ) => Promise<Transaction>;
}
