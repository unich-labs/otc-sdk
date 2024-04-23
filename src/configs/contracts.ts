import { CHAIN_ID } from "./chains";

export type EvmAddress = `0x${string}`;

export const CONTRACTS: Record<
    CHAIN_ID,
    {
        OTC: {
            address: EvmAddress | string;
            deployedBlock?: number;
        };
        AUTHORITY?: string;
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
            address: "24XvN4rrtuqyEev5bvAq5p6iW8nFCwAuHD8g4qM9HBSG",
            // deployedBlock: 291071420,
        },
        AUTHORITY: "HYNWdfGBNzzfM6qHk1VK7TwgsT34CrL5KKtbKSqDTDKr",
    },
};
