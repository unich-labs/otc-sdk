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
    [CHAIN_ID.SEPOLIA]: {
        OTC: {
            address: "0x42de05e4748f7b507133f4f49e171f1cb6003380",
            deployedBlock: 6471245,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "8EMNysnqHuY88H291esnAcEvwjdNXV5N9XZ3FoD7ffFe",
            authority: "EGN5Sfq1CGsysUY4qhSDyQvgPCBRepqXi8AvChiyeNir",
        },
    },
};
