import {
    Connection,
    PublicKey,
    TransactionInstruction,
    SystemProgram,
} from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createSyncNativeInstruction,
    getAssociatedTokenAddressSync,
    NATIVE_MINT,
    getAccount,
    TokenAccountNotFoundError,
    TokenInvalidAccountOwnerError,
} from "@solana/spl-token";

export async function getNumberDecimals(
    connection: Connection,
    token: PublicKey
): Promise<number> {
    const info = await connection.getParsedAccountInfo(token);
    const result = (info.value?.data as any).parsed.info.decimals as number;
    return result;
}

export async function buildInstructionsWrapSol(
    connection: Connection,
    user: PublicKey,
    lamports: number
) {
    const instructions: TransactionInstruction[] = [];
    const associatedTokenAccount = getAssociatedTokenAddressSync(
        NATIVE_MINT,
        user
    );
    try {
        await getAccount(connection, associatedTokenAccount);
    } catch (error: unknown) {
        if (
            error instanceof TokenAccountNotFoundError ||
            error instanceof TokenInvalidAccountOwnerError
        ) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    user,
                    associatedTokenAccount,
                    user,
                    NATIVE_MINT
                )
            );
        }
    }
    instructions.push(
        SystemProgram.transfer({
            fromPubkey: user,
            toPubkey: associatedTokenAccount,
            lamports: lamports,
        }),
        createSyncNativeInstruction(associatedTokenAccount)
    );

    return instructions;
}

export async function buildInstructionsUnWrapSol(user: PublicKey) {
    const instructions: TransactionInstruction[] = [];
    const associatedTokenAccount = getAssociatedTokenAddressSync(
        NATIVE_MINT,
        user
    );
    instructions.push(
        createCloseAccountInstruction(associatedTokenAccount, user, user)
    );
    return instructions;
}

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
export const randomInt = (min: number, max: number) => {
    min = Math.max(1, min);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
