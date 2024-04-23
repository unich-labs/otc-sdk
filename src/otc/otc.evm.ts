import {
    Contract,
    Provider,
    Signer,
    JsonRpcProvider,
    ContractTransaction,
    ethers,
} from "ethers";
import {
    CHAINS,
    CHAIN_ID,
    CONTRACTS,
    EOfferType,
    EvmAddress,
    WEI6,
} from "../configs";
import { OtcAbi } from "../abis";
import { EvmNetwork } from "../networks";
import { IOtc, IOffer, IOtcConfig } from "./otc.interface";

export class OtcEvm implements IOtc<EvmAddress, bigint, ContractTransaction> {
    protected _contractAddress: EvmAddress;
    protected _contract: Contract;
    protected _network: EvmNetwork;

    constructor(chainId: CHAIN_ID) {
        this._contractAddress = CONTRACTS[chainId].OTC.address as EvmAddress;
        this._network = new EvmNetwork(
            CHAINS[chainId].rpcUrls.map((r) => new JsonRpcProvider(r))
        );
        this._contract = new Contract(this._contractAddress, OtcAbi, {
            provider: this._network.provider,
        });
    }

    get contract(): Contract {
        return this._contract;
    }

    set contract(contractAddress: EvmAddress) {
        this._contract = new Contract(contractAddress, OtcAbi, {
            provider: this._network.provider,
        });
    }

    address(): string {
        return this._contractAddress;
    }

    async config(): Promise<IOtcConfig<bigint, EvmAddress>> {
        const config = await this._contract.config();
        return {
            pledgeRate: config[0],
            feeRefund: config[1],
            feeSettle: config[2],
            feeWallet: config[3],
        };
    }

    async getOfferCollateral(value: bigint): Promise<bigint> {
        const config = await this.config();
        return (value * config.pledgeRate) / WEI6;
    }

    async getOffer(offerId: bigint): Promise<IOffer<bigint, EvmAddress>> {
        const offer = await this._contract.offers(offerId);
        return {
            offerType: offer[0],
            tokenId: offer[1],
            exToken: offer[2],
            amount: offer[3],
            value: offer[4],
            collateral: offer[5],
            filledAmount: offer[6],
            status: offer[7],
            offerBy: offer[8],
            fullMatch: offer[9],
        };
    }

    async getOrder(orderId: bigint): Promise<any> {
        return this._contract.orders(orderId);
    }

    async getToken(tokenId: string): Promise<any> {
        return this._contract.tokens(tokenId);
    }

    async getLastOfferId(): Promise<any> {
        return this._contract.lastOfferId();
    }

    async getLastOrderId(): Promise<any> {
        return this._contract.lastOrderId();
    }

    async getFillOfferAmount(offerId: bigint, amount: bigint): Promise<bigint> {
        const offer = await this.getOffer(offerId);
        if (offer.amount === BigInt(0)) throw new Error("Invalid Offer");
        let value = offer.collateral;
        if (offer.offerType === EOfferType.Sell) {
            value = offer.value;
        }
        return (value * amount) / offer.amount;
    }

    createOtcToken(
        tokenId: string,
        settleDuration: number
    ): Promise<ContractTransaction> {
        return this.contract.createToken.populateTransaction(
            tokenId,
            settleDuration
        );
    }

    settleOtcToken(
        tokenId: string,
        tokenAddress: EvmAddress,
        settleRate: bigint
    ): Promise<ContractTransaction> {
        return this.contract.tokenToSettlePhase.populateTransaction(
            tokenId,
            tokenAddress,
            settleRate
        );
    }

    async createOffer(
        offerType: EOfferType,
        tokenId: string,
        amount: bigint,
        value: bigint,
        exToken: EvmAddress,
        fullMatch: boolean,
        withNative: boolean = false
    ): Promise<ContractTransaction> {
        let methodName = "newOffer";
        let payload = [offerType, tokenId, amount, value, exToken, fullMatch];
        let overrides = {};

        if (withNative) {
            methodName = "newOfferETH";
            payload = [offerType, tokenId, amount, value, fullMatch];
            let collateral = value;
            if (offerType === EOfferType.Sell) {
                collateral = await this.getOfferCollateral(value);
            }
            overrides = {
                value: collateral,
            };
        }

        return this.contract[methodName].populateTransaction(...payload, {
            ...overrides,
        });
    }

    async fillOffer(
        offerId: bigint,
        amount: bigint,
        withNative: boolean = false
    ): Promise<ContractTransaction> {
        let methodName = "fillOffer";
        let payload = [offerId, amount];
        let overrides = {};

        if (withNative) {
            methodName = "fillOfferETH";
            let value = await this.getFillOfferAmount(offerId, amount);
            overrides = {
                value,
            };
        }

        return this.contract[methodName].populateTransaction(...payload, {
            ...overrides,
        });
    }
}
