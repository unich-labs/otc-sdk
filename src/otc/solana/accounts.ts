import { PublicKey } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Otc, IDL } from "./idl/otc";

const getSeed = (seed: string, program: anchor.Program<Otc>): Buffer => {
    return Buffer.from(
        // @ts-ignore
        JSON.parse(program.idl.constants.find((c) => c.name === seed)!.value)
    );
};

const toBuffer = (value: BN, endian?: any, length?: any) => {
    try {
        return value.toBuffer(endian, length);
    } catch (error) {
        return value.toArrayLike(Buffer, endian, length);
    }
};

export const getConfigAccountPda = (
    program: Program<Otc>,
    configAuthority: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [getSeed("CONFIG_PDA_SEED", program), configAuthority.toBuffer()],
        program.programId
    )[0];
};

export const getRoleAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    user: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("ROLE_PDA_SEED", program),
            configAccount.toBuffer(),
            user.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getSeatAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    user: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("SEAT_PDA_SEED", program),
            configAccount.toBuffer(),
            user.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getMarketAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    marketId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("MARKET_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(new BN(marketId), "be", 8),
        ],
        program.programId
    )[0];
};

export const getVaultExTokenAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    tokenMint: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("VAULT_EX_TOKEN_PDA_SEED", program),
            configAccount.toBuffer(),
            tokenMint.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getVaultTokenAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    tokenMint: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("VAULT_TOKEN_PDA_SEED", program),
            configAccount.toBuffer(),
            tokenMint.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getOrderAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    marketId: BN,
    orderId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("ORDER_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(marketId, "be", 8),
            toBuffer(orderId, "be", 8),
        ],
        program.programId
    )[0];
};

export const getTradeAccountPda = (
    program: Program<Otc>,
    configAccount: PublicKey,
    marketId: BN,
    tradeId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("TRADE_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(marketId, "be", 8),
            toBuffer(tradeId, "be", 8),
        ],
        program.programId
    )[0];
};
