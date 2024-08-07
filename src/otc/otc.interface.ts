import { EOrderStatus, EOrderType, ETradeStatus } from "../configs";

export type IOtcConfig<BN, Address> = {
    feeRefund: BN;
    feeSettle: BN;
    feeWallet: Address;
};

export type IOrder<BN, Address> = {
    orderType: EOrderType;
    tokenId: string;
    exToken: Address;
    amount: BN;
    value: BN;
    collateral: BN;
    filledAmount: BN;
    status: EOrderStatus;
    offerBy: Address;
    fullMatch: boolean;
};

export type ITrade<BN, Address> = {
    orderId: BN;
    amount: BN;
    seller: Address;
    buyer: Address;
    status: ETradeStatus;
};

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
    //     offerType: EOrderType,
    //     tokenId: any,
    //     amount: BN,
    //     value: BN,
    //     exToken: Address,
    //     fullMatch: boolean,
    //     user?: Address
    // ) => Promise<Transaction>;
}
