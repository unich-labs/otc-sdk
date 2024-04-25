import { BN, Program, IdlAccounts, IdlTypes } from "@coral-xyz/anchor";
import {
    Connection,
    PublicKey,
    Transaction,
    Commitment,
} from "@solana/web3.js";
import {
    CHAINS,
    CHAIN_ID,
    CONTRACTS,
    EOfferStatus,
    EOfferType,
    EvmAddress,
    WEI6,
} from "../configs";
import { IDL, Otc } from "../idl";
import { SolanaNetwork } from "../networks";
import { IOffer, IOtc, IOtcConfig } from "./otc.interface";
import {
    getConfigAccountPubKey,
    getExTokenAccountPubKey,
    getOfferAccountPubKey,
    getOtcTokenAccountPubKey,
    getRoleAccountPubKey,
    getVaultExTokenAccountPubKey,
} from "./solana/accounts";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { ContractTransaction } from "ethers";

export class OtcSolana implements IOtc<PublicKey, BN, Transaction> {
    protected _programId: PublicKey;
    protected _program: Program<Otc>;
    protected _connection: SolanaNetwork;
    protected _configAccountPubkey: PublicKey;
    // @ts-expect-error
    protected _configAccountData: IdlAccounts<Otc>["configAccount"];

    constructor(
        chainId: CHAIN_ID,
        connections?: Connection[],
        authority?: PublicKey,
        commitment?: Commitment
    ) {
        if (!CONTRACTS[chainId].AUTHORITY) throw new Error("No solana program");
        this._programId = new PublicKey(CONTRACTS[chainId].OTC.address);

        this._connection = new SolanaNetwork(
            connections ??
                CHAINS[chainId].rpcUrls.map(
                    (r) =>
                        new Connection(r, {
                            commitment: commitment ?? "confirmed",
                        })
                )
        );
        this._program = new Program(IDL, new PublicKey(this._programId), {
            connection: this._connection.provider,
        });

        this._configAccountPubkey = getConfigAccountPubKey(
            this.program,
            authority ?? new PublicKey(CONTRACTS[chainId].AUTHORITY!)
        );
    }

    bootstrap(authority: PublicKey, commitment?: Commitment) {
        return this.fetchConfigAccount(authority, commitment);
    }

    async fetchConfigAccount(
        configAccountPubKey: PublicKey,
        commitment?: Commitment
    ): Promise<IdlAccounts<Otc>["configAccount"]> {
        this._configAccountData =
            await this.program.account.configAccount.fetch(
                configAccountPubKey,
                commitment
            );
        return this._configAccountData;
    }

    get program(): Program<Otc> {
        return this._program;
    }

    set contract(programId: PublicKey) {
        this._program = new Program(IDL, programId, {
            connection: this._connection.provider,
        });
    }

    address(): PublicKey {
        return this._programId;
    }

    config(): Promise<IOtcConfig<BN, PublicKey>> {
        return Promise.resolve({
            pledgeRate: this._configAccountData.pledgeRate,
            feeRefund: this._configAccountData.feeRefund,
            feeSettle: this._configAccountData.feeSettle,
            feeWallet: this._configAccountData.feeWallet,
        });
    }

    getOfferCollateral(value: BN): Promise<BN> {
        return Promise.resolve(
            (value * this._configAccountData.pledgeRate) / new BN(WEI6)
        );
    }

    private _getOfferType(offerType: IdlTypes<Otc>["OfferType"]): EOfferType {
        return Object.keys(offerType)[0] === "buy"
            ? EOfferType.Buy
            : EOfferType.Sell;
    }

    private _parseOfferType(offerType: EOfferType): IdlTypes<Otc>["OfferType"] {
        return offerType === EOfferType.Buy ? { buy: {} } : { sell: {} };
    }

    private _getOfferStatus(
        status: IdlTypes<Otc>["OfferStatus"]
    ): EOfferStatus {
        const key = Object.keys(status)[0];
        switch (key) {
            case "filled":
                return EOfferStatus.Filled;

            case "canceled":
                return EOfferStatus.Canceled;

            default:
                return EOfferStatus.Open;
        }
    }

    async getOffer(offerId: BN): Promise<IOffer<BN, PublicKey>> {
        const offerAccountData = await this.program.account.offerAccount.fetch(
            getOfferAccountPubKey(
                this.program,
                this._configAccountPubkey,
                offerId
            )
        );
        return {
            offerType: this._getOfferType(offerAccountData.offerType),
            tokenId: offerAccountData.tokenId,
            exToken: offerAccountData.exToken,
            amount: offerAccountData.amount,
            value: offerAccountData.value,
            collateral: offerAccountData.collateral,
            filledAmount: offerAccountData.filledAmount,
            status: this._getOfferStatus(offerAccountData.status),
            offerBy: offerAccountData.offerBy,
            fullMatch: offerAccountData.fullMatch,
        };
    }

    // async getOrder(orderId: bigint): Promise<any> {
    //     return this._contract.orders(orderId);
    // }

    // async getToken(tokenId: string): Promise<any> {
    //     return this._contract.tokens(tokenId);
    // }

    async getLastOfferId(): Promise<BN> {
        return this._configAccountData.lastOfferId;
    }

    async getLastOrderId(): Promise<BN> {
        return this._configAccountData.lastOrderId;
    }

    // async getFillOfferValue(offerId: BN, amount: BN): Promise<BN> {

    // }

    createOtcToken(
        tokenId: string,
        settleDuration: number,
        operator: PublicKey
    ): Promise<Transaction> {
        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this._configAccountPubkey,
            tokenId
        );
        const roleAccountPubkey = getRoleAccountPubKey(
            this.program,
            this._configAccountPubkey,
            operator
        );
        return this.program.methods
            .createOtcToken(tokenId, settleDuration)
            .accounts({
                otcTokenAccount: otcTokenAccountPubKey,
                configAccount: this._configAccountPubkey,
                roleAccount: roleAccountPubkey,
                operator: operator,
                authority: this._configAccountData.authority,
            })
            .transaction();
    }

    settleOtcToken(
        tokenId: string,
        tokenAddress: PublicKey,
        settleRate: bigint,
        operator: PublicKey
    ): Promise<Transaction> {
        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this._configAccountPubkey,
            tokenId
        );
        const roleAccountPubkey = getRoleAccountPubKey(
            this.program,
            this._configAccountPubkey,
            operator
        );

        return this.program.methods
            .settleOtcToken(tokenId, settleRate)
            .accounts({
                otcTokenAccount: otcTokenAccountPubKey,
                mint: tokenAddress,
                configAccount: this._configAccountPubkey,
                roleAccount: roleAccountPubkey,
                operator: operator,
                authority: this._configAccountData.authority,
            })
            .transaction();
    }

    async createOffer(
        offerType: EOfferType,
        tokenId: BN,
        amount: BN,
        value: BN,
        exToken: PublicKey,
        fullMatch: boolean,
        user: PublicKey
    ): Promise<Transaction> {
        const vaultTokenAccountPubKey = getVaultExTokenAccountPubKey(
            this.program,
            this._configAccountPubkey,
            exToken
        );

        const exTokenAccountPubKey = getExTokenAccountPubKey(
            this.program,
            this._configAccountPubkey,
            exToken
        );

        const [exTokenInfo, lastOfferId] = await Promise.all([
            this._connection.provider.getParsedAccountInfo(exToken),
            this.fetchConfigAccount(this._configAccountPubkey).then(
                (c) => c.lastOfferId
            ),
        ]);

        if (!exTokenInfo.value) throw new Error("Invalid Ex Token");

        const userExTokenAccount = await getAssociatedTokenAddress(
            exToken,
            user,
            false,
            exTokenInfo.value.owner
        );

        const offerAccountPubKey = getOfferAccountPubKey(
            this.program,
            this._configAccountPubkey,
            lastOfferId
        );

        const otcTokenAccountPubKey = getOtcTokenAccountPubKey(
            this.program,
            this._configAccountPubkey,
            tokenId
        );

        const _offerType = this._parseOfferType(offerType);
        const transaction = await this.program.methods
            .createOffer(_offerType, tokenId, amount, value, fullMatch)
            .accounts({
                otcTokenAccount: otcTokenAccountPubKey,
                offerAccount: offerAccountPubKey,
                vaultTokenAccount: vaultTokenAccountPubKey,
                configAccount: this._configAccountPubkey,
                exTokenAccount: exTokenAccountPubKey,
                userTokenAccount: userExTokenAccount,
                user: user,
                exToken: exToken,
                authority: this._configAccountData.authority,
                tokenProgram: exTokenInfo.value.owner,
            })
            .transaction();

        return transaction;
    }

    async fillOffer(offerId: BN, amount: BN): Promise<any> {
        // TODO
        return Promise.resolve();
    }
}
