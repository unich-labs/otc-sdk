import { CHAIN_ID } from "./chains";

export type EvmAddress = `0x${string}`;

/**
 * @typedef CONTRACTS
 * @type {object}
 */
export const CONTRACTS: Record<
    CHAIN_ID,
    {
        OTC: {
            address: EvmAddress | string;
            deployedAtBlockOrSignature?: number | string;
            authority?: string;
        };
    }
> = {
    [CHAIN_ID.SEPOLIA]: {
        OTC: {
            address: "0x4E62Ac30576C024788B1A05eA3F54a2214B39bc7",
            deployedAtBlockOrSignature: 6510437,
        },
    },
    [CHAIN_ID.SOLANA_DEVNET]: {
        OTC: {
            address: "5HGM4NpYcUkj8fyPAFR1oJwSGCC5697yGVYZi3Unx7G4",
            authority: "B3z3mdndXbQdTeq3jhLsLJyzg13oKyzL8SJxpEtyQ9mp",
            deployedAtBlockOrSignature:
                "24tcekCtARNy5JEg71pkhr8x19A8GtUBE253J9HddQmEA3nHGmhUMUtCJ3e3weoWBhYVnLNB7HTXFT8pez6sCePf",
        },
    },
};
