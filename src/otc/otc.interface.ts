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
    fullMatch: Address;
};

export type IOrder<BN, Address> = {
    orderId: BN;
    amount: BN;
    seller: Address;
    buyer: Address;
    status: EOrderStatus;
};

export interface IOtc<Address, BN, Transaction> {
    config: () => Promise<IOtcConfig<BN, Address>>;
    getOffer: (offerId: BN) => Promise<IOffer<BN, Address>>;
    getOrder: (orderId: BN) => Promise<IOrder<BN, Address>>;
    createOtcToken: (
        tokenId: string,
        settleDuration: number
    ) => Promise<Transaction>;
    settleOtcToken: (
        tokenId: string,
        tokenAddress: Address,
        settleRate: BN
    ) => Promise<Transaction>;
    createOffer: (
        offerType: EOfferType,
        tokenId: string,
        amount: BN,
        value: BN,
        exToken: Address,
        fullMatch: boolean,
        withNative?: boolean
    ) => Promise<Transaction>;
}
