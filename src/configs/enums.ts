/**
 * Market Status
 * @enum EMarketStatus
 */
export enum EMarketStatus {
    /**
     * Active
     */
    Active = 1,
    /**
     * Inactive
     */
    Inactive = 2,
    /**
     * Settle
     */
    Settle = 3,
}

/**
 * Order Side
 * @enum EOrderSide
 */
export enum EOrderSide {
    Buy = 1,
    Sell = 2,
}

/**
 * Order Type
 * @enum EOrderType
 */
export enum EOrderType {
    Standard = 0,
    Bid = 1,
    Cashout = 2,
}

/**
 * Order Status
 * @enum EOrderStatus
 */
export enum EOrderStatus {
    /**
     * Open
     */
    Open = 1,
    /**
     * Filled
     */
    Filled = 2,
    /**
     * Canceled
     */
    Canceled = 3,
}

/**
 * Trade status
 * @enum ETradeStatus
 */
export enum ETradeStatus {
    /**
     * Open
     */
    Open = 1,
    /**
     * Settle Filled
     */
    SettleFilled = 2,
    /**
     * Settle Canceled
     */
    SettleCanceled = 3,
    /**
     * Canceled
     */
    Canceled = 4,
}
