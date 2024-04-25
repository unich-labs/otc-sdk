import { Network } from "./network.abstract";
import { Connection } from "@solana/web3.js";

export class SolanaNetwork extends Network<Connection, undefined> {
    constructor(providers: Connection[]) {
        super(providers);
    }
}
