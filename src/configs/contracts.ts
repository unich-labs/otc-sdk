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
            address: "0xeDa54F17062fac1a685fEAe8A5d8bDC22f782252",
            deployedBlock: 6439372,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "8EMNysnqHuY88H291esnAcEvwjdNXV5N9XZ3FoD7ffFe",
            authority: "EGN5Sfq1CGsysUY4qhSDyQvgPCBRepqXi8AvChiyeNir",
        },
    },
};
