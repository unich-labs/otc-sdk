import { EOfferStatus, EOfferType, EOrderStatus } from "../configs";

export type IOtcConfig<BN, Address> = {
    pledgeRate: BN;
    feeRefund: BN;
    feeSettle: BN;
    feeWallet: Address;
};

export type IOffer<BN, Address> = {
    offerType: EOfferType;
    tokenId: string;
    exToken: Address;
    amount: BN;
    value: BN;
    collateral: BN;
    filledAmount: BN;
    status: EOfferStatus;
    offerBy: Address;
    fullMatch: boolean;
};

export type IOrder<BN, Address> = {
    orderId: BN;
    amount: BN;
    seller: Address;
    buyer: Address;
    status: EOrderStatus;
};

export interface IOtc<Address, BN, Transaction> {
    // TODO abstract OTC class
    // config: () => Promise<IOtcConfig<BN, Address>>;
    // getOffer: (offerId: BN) => Promise<IOffer<BN, Address>>;
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
    //     offerType: EOfferType,
    //     tokenId: any,
    //     amount: BN,
    //     value: BN,
    //     exToken: Address,
    //     fullMatch: boolean,
    //     withNative?: boolean,
    //     user?: Address
    // ) => Promise<Transaction>;
}
