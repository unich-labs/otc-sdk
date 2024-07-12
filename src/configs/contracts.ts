import { CHAIN_ID } from "./chains";

export type EvmAddress = `0x${string}`;

export const CONTRACTS: Record<
    CHAIN_ID,
    {
        OTC: {
            address: EvmAddress | string;
            deployedBlock?: number;
            authority?: string;
        };
    }
> = {
    [CHAIN_ID.ARBITRUM_SEPOLIA]: {
        OTC: {
            address: "0xE0b56499b1269e9C2760d8783034DB49e3eb895A",
            deployedBlock: 30446090,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "8EMNysnqHuY88H291esnAcEvwjdNXV5N9XZ3FoD7ffFe",
            authority: "EGN5Sfq1CGsysUY4qhSDyQvgPCBRepqXi8AvChiyeNir",
        },
    },
};
