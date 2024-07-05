import { PublicKey } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { Otc } from "../../idl";

const getSeed = (seed: string, program: Program<Otc>): Buffer => {
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

export const getConfigAccountPubKey = (
    program: Program<Otc>,
    configAuthority: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [getSeed("CONFIG_PDA_SEED", program), configAuthority.toBuffer()],
        program.programId
    )[0];
};

export const getVaultConfigAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [getSeed("VAULT_CONFIG_PDA_SEED", program), configAccount.toBuffer()],
        program.programId
    )[0];
};

export const getRoleAccountPubKey = (
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

export const getOtcTokenAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey,
    tokenId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("OTC_TOKEN_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(new BN(tokenId), "be", 8),
        ],
        program.programId
    )[0];
};

export const getExTokenAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey,
    tokenMint: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("EX_TOKEN_PDA_SEED", program),
            configAccount.toBuffer(),
            tokenMint.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getVaultExTokenAccountPubKey = (
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

export const getVaultOtcTokenAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey,
    tokenMint: PublicKey
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("VAULT_OTC_TOKEN_PDA_SEED", program),
            configAccount.toBuffer(),
            tokenMint.toBuffer(),
        ],
        program.programId
    )[0];
};

export const getOrderAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey,
    orderId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("ORDER_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(orderId, "be", 8),
        ],
        program.programId
    )[0];
};
export const getTradeAccountPubKey = (
    program: Program<Otc>,
    configAccount: PublicKey,
    orderId: BN
) => {
    return PublicKey.findProgramAddressSync(
        [
            getSeed("TRADE_PDA_SEED", program),
            configAccount.toBuffer(),
            toBuffer(orderId, "be", 8),
        ],
        program.programId
    )[0];
};
