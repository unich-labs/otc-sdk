"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { sendTransaction, waitForTransactionReceipt } from "@wagmi/core";
import { ethers } from "ethers";
import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { EOrderType, OtcEvm } from "otc-sdk";
import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { config } from "../providers";

export default function CreateOffer() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { openConnectModal } = useConnectModal();

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

                const otc = new OtcEvm(chainId);

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
                alert("Create order success. TxHash: " + txHash);
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
        [chainId, address, offerType, marketId, amount, price]
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
                            TEST/USDC
                        </option>
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
                        onChange={(e) => setAmount(+e.target.value)}
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
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(+e.target.value)}
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
                    {!submitting ? "Create" : "Submitting"}
                </Button>
            </form>
        </div>
    );
}
