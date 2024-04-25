import { ethers } from "ethers";
import { Network } from "./network.abstract";

export class EvmNetwork extends Network<ethers.Provider, ethers.Signer> {
    constructor(providers: ethers.Provider[]) {
        super(providers);
    }
}
