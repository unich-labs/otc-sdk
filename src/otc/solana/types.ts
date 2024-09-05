import { IdlTypes } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { Otc } from "./idl/otc";

export type NewOrderEvent = {
    configAccount: PublicKey;
    marketId: BN;
    orderId: BN;
    orderSide: IdlTypes<Otc>["OrderSide"];
    amount: BN;
    value: BN;
    orderType: number;
    orderBy: PublicKey;
};

export type NewTradeEvent = {
    configAccount: PublicKey;
    marketId: BN;
    tradeId: BN;
    orderId: BN;
    matchedOrderId: BN;
    amount: BN;
    buyerValue: BN;
    sellerValue: BN;
    buyer: PublicKey;
    seller: PublicKey;
};

export interface OtcEventHandlers {
    NewOrderEvent: NewOrderEvent;
    NewTradeEvent: NewTradeEvent;
}

export type OtcEventType = keyof OtcEventHandlers;
