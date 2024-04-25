"use client";

import { EvmAddress, OtcEvm } from "otc-sdk";
import { useCallback, useState } from "react";
import { useAccount, useChainId, useSendTransaction } from "wagmi";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BytesLike } from "ethers";

export default function CreateOtcToken() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction();
    const { openConnectModal } = useConnectModal();

    const [tokenId, setTokenId] = useState<string>(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
    const [settleDuration, setSettleDuration] = useState<number>(86400);

    const handleCreate = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (!address) return openConnectModal?.();

            const otc = new OtcEvm(chainId);

            const createOtcTokenData = await otc.createOtcToken(
                tokenId,
                settleDuration
            );

            sendTransaction({
                to: createOtcTokenData.to as EvmAddress,
                data: createOtcTokenData.data as `0x${string}`,
            });
        },
        [chainId, address]
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
                            htmlFor="settleDuration"
                            value="Settle duration"
                        />
                    </div>
                    <TextInput
                        id="settleDuration"
                        type="number"
                        value={settleDuration}
                        onChange={(e) => setSettleDuration(+e.target.value)}
                    />
                </div>
                {/* <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div> */}
                <Button type="submit">Create</Button>
            </form>
        </div>
    );
}
