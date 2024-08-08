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
            address: "0x9127Ed583c2F78f74c448d7a01Cc7985c4FD230a",
            deployedBlock: 6460276,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "8EMNysnqHuY88H291esnAcEvwjdNXV5N9XZ3FoD7ffFe",
            authority: "EGN5Sfq1CGsysUY4qhSDyQvgPCBRepqXi8AvChiyeNir",
        },
    },
};
