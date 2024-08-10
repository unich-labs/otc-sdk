"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { ZeroAddress } from "ethers";
import { Label, TextInput, Button, Dropdown, Checkbox } from "flowbite-react";
import { OtcEvm, EvmAddress, EOrderType } from "otc-sdk";
import { useState, useCallback } from "react";
import { useChainId, useAccount, useSendTransaction } from "wagmi";

export default function FillOffer() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction();
    const { openConnectModal } = useConnectModal();

    const [offerId, setOfferId] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0.001);

    const handleFill = useCallback(
        async (e: any) => {
            try {
                e.preventDefault();
                if (!address) return openConnectModal?.();

                if (!offerId) return alert("Invalid Offer");

                const otc = new OtcEvm(chainId);

                // const createOtcTokenData = await otc.fillOffer(
                //     BigInt(offerId),
                //     ethers.parseUnits(amount.toString())
                // );
                // console.log(
                //     "🚀 ~ file: FillOffer.tsx:34 ~ createOtcTokenData:",
                //     createOtcTokenData
                // );

                // sendTransaction({
                //     to: createOtcTokenData.to as EvmAddress,
                //     data: createOtcTokenData.data as any,
                //     value: createOtcTokenData.value ?? BigInt(0),
                // });
            } catch (error: any) {
                console.log(
                    "🚀 ~ file: FillOffer.tsx:41 ~ error:",
                    error,
                    error?.error?.data?.message ||
                        error?.reason ||
                        error?.data?.message ||
                        error?.message ||
                        error
                );
                alert(
                    error?.error?.data?.message ||
                        error?.reason ||
                        error?.data?.message ||
                        error?.message ||
                        error
                );
            }
        },
        [chainId, address, offerId, amount]
    );

    return (
        <div>
            <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleFill}
            >
                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="offerId"
                            value="Offer ID"
                        />
                    </div>
                    <TextInput
                        value={offerId}
                        type="number"
                        onChange={(e) => setOfferId(+e.target.value)}
                        id="offerId"
                        placeholder="Offer Id"
                    />
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

                <Button type="submit">Fill</Button>
            </form>
        </div>
    );
}
