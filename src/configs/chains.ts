export enum CHAIN_ID {
    // ETHEREUM = 1,
    ARBITRUM_SEPOLIA = 421614,
    SOLANA_DEVNET = 99999999990,
}

export const CHAINS: Record<
    CHAIN_ID,
    {
        isMainnet: boolean;
        name: string;
        rpcUrls: string[];
        explorerUrl: string;
    }
> = {
    [CHAIN_ID.ARBITRUM_SEPOLIA]: {
        isMainnet: false,
        name: "Arbitrum Sepolia",
        rpcUrls: [
            "https://public.stackup.sh/api/v1/node/arbitrum-sepolia",
            "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
        ],
        explorerUrl: "https://sepolia.arbiscan.io/",
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        isMainnet: false,
        name: "Solana Devnet",
        rpcUrls: ["https://api.devnet.solana.com"],
        explorerUrl: "https://explorer.solana.com/",
    },
};
