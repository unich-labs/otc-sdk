"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { ZeroAddress } from "ethers";
import { Label, TextInput, Button, Dropdown, Checkbox } from "flowbite-react";
import { OtcEvm, EvmAddress, EOrderType } from "otc-sdk";
import { useState, useCallback } from "react";
import { useChainId, useAccount, useSendTransaction, useClient } from "wagmi";

export default function CreateOffer() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction();
    const { openConnectModal } = useConnectModal();

    const [offerType, setOfferType] = useState<EOrderType>(EOrderType.Sell);
    const [tokenId, setTokenId] = useState<string>(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
    const [amount, setAmount] = useState<number>(100);
    const [value, setValue] = useState<number>(0.001);
    const [exToken, setExToken] = useState<EvmAddress>(
        ZeroAddress as EvmAddress
    );
    const [fullMatch, setFullMatch] = useState<boolean>(true);
    const [withNative, setWithNative] = useState<boolean>(true);

    const handleCreate = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (!address) return openConnectModal?.();

            const otc = new OtcEvm(chainId);

            const createOtcTokenData = await otc.createOffer(
                offerType,
                tokenId,
                ethers.parseUnits(amount.toString()),
                ethers.parseUnits(value.toString()),
                exToken,
                fullMatch,
                true
            );

            sendTransaction({
                to: createOtcTokenData.to as EvmAddress,
                data: createOtcTokenData.data as any,
                value: createOtcTokenData.value ?? BigInt(0),
            });
        },
        [
            chainId,
            address,
            offerType,
            tokenId,
            amount,
            value,
            exToken,
            fullMatch,
        ]
    );

    return (
        <div>
            <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleCreate}
            >
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
                            htmlFor="tokenId"
                            value="Token ID"
                        />
                    </div>
                    <TextInput
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        id="tokenId"
                        placeholder="Bytes32 of tokenId"
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
                <div>
                    <div className="mb-2 block">
                        <Label
                            className="text-white"
                            htmlFor="value"
                            value="Value"
                        />
                    </div>
                    <TextInput
                        id="value"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(+e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <Checkbox
                        id="withNative"
                        defaultChecked={true}
                        checked={withNative}
                        onClick={() => setWithNative((pre) => !pre)}
                    />
                    <Label className="text-white" htmlFor="withNatives">
                        Create Offer without exchange token?
                    </Label>
                </div>

                {!withNative && (
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className="text-white"
                                htmlFor="exToken"
                                value="Exchang token"
                            />
                        </div>
                        <TextInput
                            id="exToken"
                            type="string"
                            value={exToken}
                            onChange={(e) =>
                                setExToken(e.target.value as EvmAddress)
                            }
                        />
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    <Checkbox
                        id="fullMatch"
                        defaultChecked={true}
                        checked={fullMatch}
                        onClick={() => setFullMatch((pre) => !pre)}
                    />
                    <Label className="text-white" htmlFor="fullMatch">
                        Is Full Match?
                    </Label>
                </div>

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
}
