export enum CHAIN_ID {
    // ETHEREUM = 1,
    SEPOLIA = 11155111,
    // SOLANA_MAINNET = 99999999999,
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
    [CHAIN_ID.SEPOLIA]: {
        isMainnet: false,
        name: "Sepolia",
        rpcUrls: ["https://1rpc.io/sepolia"],
        explorerUrl: "https://sepolia.etherscan.io/",
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        isMainnet: false,
        name: "Solana Devnet",
        rpcUrls: ["https://api.devnet.solana.com"],
        explorerUrl: "https://explorer.solana.com/",
    },
};
