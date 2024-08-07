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
            address: "0xF9bC334f084c72D727536455BE714d8303b62661",
            deployedBlock: 6453139,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "8EMNysnqHuY88H291esnAcEvwjdNXV5N9XZ3FoD7ffFe",
            authority: "EGN5Sfq1CGsysUY4qhSDyQvgPCBRepqXi8AvChiyeNir",
        },
    },
};
