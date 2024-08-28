"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { sendTransaction, waitForTransactionReceipt } from "@wagmi/core";
import { ethers } from "ethers";
import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { EOrderType, OtcEvm, OtcSolana, CHAIN_ID } from "otc-sdk";
import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { config } from "../providers";
import { PublicKey, Transaction } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export default function CreateOffer() {
    // evm
    const { address } = useAccount();
    const { openConnectModal } = useConnectModal();

    // solana
    const { connection } = useConnection();
    const {
        wallet,
        publicKey: usePublicKey,
        sendTransaction: sendTransactionSolana,
    } = useWallet();

    const [marketId, setMarketId] = useState<string>(
        "0xd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28"
    );
    const [offerType, setOfferType] = useState<EOrderType>(EOrderType.Sell);
    const [amount, setAmount] = useState<number>(10);
    const [price, setPrice] = useState<number>(1);
    const [isBid, setIdBid] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleCreate = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (!address) return openConnectModal?.();

            try {
                if (submitting) return;

                const otc = new OtcEvm(CHAIN_ID.SEPOLIA);

                setSubmitting(true);

                const parsedAmount = ethers.parseUnits(amount.toString());

                const collateral = await otc.getOrderCollateral(
                    marketId,
                    parsedAmount,
                    price
                );

                let txHash;
                // TODO check allowance then ignore approve
                // const approveTx = await otc.approve(marketId, collateral);
                // let txHash = await sendTransaction(config as any, {
                //     to: approveTx.to as `0x${string}`,
                //     data: approveTx.data as `0x${string}`,
                // });

                // NOTE waitForTransactionReceipt not work wait too long
                // await waitForTransactionReceipt(config, {
                //     hash: txHash,
                // });

                const createOrderTx = await otc.createOrder({
                    offerType,
                    marketId,
                    amount: parsedAmount,
                    price,
                    isBid: false,
                });

                txHash = await sendTransaction(config as any, {
                    to: createOrderTx.to as `0x${string}`,
                    data: createOrderTx.data as `0x${string}`,
                    value: createOrderTx.value ?? BigInt(0),
                });

                setSubmitting(false);
                console.log(
                    `Create order tx https://sepolia.etherscan.io/tx/${txHash}`
                );
                alert(
                    `Create order tx https://sepolia.etherscan.io/tx/${txHash}`
                );
            } catch (error: any) {
                setSubmitting(false);

                alert(
                    error?.error?.data?.message ||
                        error?.reason ||
                        error?.data?.message ||
                        error?.message ||
                        error
                );
            }
        },
        [address, offerType, marketId, amount, price]
    );

    const handleCreateSolana = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (!usePublicKey) return alert("connect wallet first");
            if (submitting) return;

            const otc = new OtcSolana(connection, CHAIN_ID.SOLANA_DEVNET);
            await otc.bootstrap();
            try {
                // default 9 decimals
                const parsedAmount = new BN(
                    ethers.parseUnits(amount.toString(), 9)
                );

                // TODO format by exToken decimals
                const value = new BN(
                    ethers.parseUnits((amount * price).toString(), 9)
                );

                const marketId = new BN(3); // in example marketId is 3, pledge rate is 50%

                const matchOrderIds = [1].map((e) => new BN(e)); // list order id that is matched with order, 1 is order sell 500 with price is 0.01

                // create order buy
                const createOrderTx = await otc.createOrder({
                    marketId,
                    // orderId, // optional
                    user: usePublicKey,
                    orderType:
                        offerType == EOrderType.Sell
                            ? { sell: {} }
                            : { buy: {} },
                    amount: parsedAmount,
                    value: value,
                    isBid,
                    // only work if this order is order buy or comment matchOrderIds
                    matchOrderIds:
                        offerType == EOrderType.Sell ? [] : matchOrderIds,
                });

                const signature = await sendTransactionSolana(
                    createOrderTx,
                    connection
                );
                console.log(
                    `Create order tx https://explorer.solana.com/tx/${signature}?cluster=devnet`
                );

                await connection.confirmTransaction(signature, "processed");

                setSubmitting(false);

                alert(
                    `Create order tx https://explorer.solana.com/tx/${signature}?cluster=devnet`
                );
            } catch (error: any) {
                setSubmitting(false);
                const err = otc.parseError(error);
                console.log("🚀 ~ file: CreateOrder.tsx:160 ~ err:", err);
                alert(err);
            }
        },
        [connection, usePublicKey, offerType, marketId, amount, price]
    );

    const handleCashoutSolana = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (!usePublicKey) return alert("connect wallet first");
            if (submitting) return;

            const otc = new OtcSolana(connection, CHAIN_ID.SOLANA_DEVNET);
            await otc.bootstrap();
            try {
                // TODO impl
                // THIS IS EXAMPLE
                const marketId = new BN(3); // in example marketId is 3, pledge rate is 50%

                const tradeId = new BN(1); // NOTE change that

                const tradeAccountData = await otc.fetchTradeAccount(
                    marketId,
                    tradeId
                );

                if (
                    !(
                        usePublicKey.equals(tradeAccountData.buyer) ||
                        usePublicKey.equals(tradeAccountData.seller)
                    )
                )
                    return alert("Only buyer or seller can cashout");

                const createOrderTx = await otc.cashoutTrade({
                    marketId,
                    tradeId,
                    amount: tradeAccountData.amount,
                    value: tradeAccountData.buyerValue,
                    user: usePublicKey,
                    matchOrderIds: [], // pass order
                });

                const signature = await sendTransactionSolana(
                    createOrderTx,
                    connection
                );
                console.log(
                    `Create order tx https://explorer.solana.com/tx/${signature}?cluster=devnet`
                );

                await connection.confirmTransaction(signature, "processed");

                setSubmitting(false);

                alert(
                    `Create order tx https://explorer.solana.com/tx/${signature}?cluster=devnet`
                );
            } catch (error: any) {
                setSubmitting(false);
                const err = otc.parseError(error);
                console.log("🚀 ~ file: CreateOrder.tsx:160 ~ err:", err);
                alert(err);
            }
        },
        [connection, usePublicKey, offerType, marketId, amount, price]
    );

    return (
        <div>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="market"
                            value="Choose market"
                        />
                    </div>
                    <select
                        name="Choose market"
                        id="market"
                        value={marketId}
                        onChange={(e) => setMarketId(e.target.value)}
                        className="text-black"
                    >
                        <option value="0xd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28">
                            TEST/USDC (EVM only)
                        </option>
                        <option value="1">TEST/SOL (Solana only)</option>
                    </select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="offerType"
                            value="Offer type"
                        />
                    </div>

                    <Dropdown
                        label={offerType === EOrderType.Buy ? "Buy" : "Sell"}
                        value={offerType}
                    >
                        <Dropdown.Item
                            value={EOrderType.Buy}
                            onClick={() => setOfferType(EOrderType.Buy)}
                        >
                            Buy
                        </Dropdown.Item>
                        <Dropdown.Item
                            value={EOrderType.Sell}
                            onClick={() => setOfferType(EOrderType.Sell)}
                        >
                            Sell
                        </Dropdown.Item>
                    </Dropdown>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="amount"
                            value="Amount"
                        />
                    </div>
                    <TextInput
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e: any) => setAmount(+e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="price"
                            value="Price"
                        />
                    </div>
                    <TextInput
                        id="price"
                        value={price}
                        onChange={(e: any) => setPrice(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <Checkbox
                        id="fullMatch"
                        checked={isBid}
                        onChange={() => setIdBid((pre) => !pre)}
                    />
                    <Label className="text-white" htmlFor="fullMatch">
                        Is Bid Order?
                    </Label>
                </div>

                <Button onClick={handleCreate}>
                    {!submitting ? "Create EVM" : "Submitting EVM"}
                </Button>

                <Button onClick={handleCreateSolana}>
                    {!submitting ? "Create Solana" : "Submitting Solana"}
                </Button>

                <Button onClick={handleCashoutSolana}>
                    {!submitting ? "Cashout Solana" : "Submitting Solana"}
                </Button>
            </form>
        </div>
    );
}
