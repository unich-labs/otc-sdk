import * as lodash from "lodash";

export abstract class Network<P, S> {
    protected _providers: P[];
    protected _signer: S | undefined;

    constructor(providers: P[]) {
        this._providers = providers;
    }

    get signer(): S | undefined {
        return this._signer;
    }

    set signer(signer: S | undefined) {
        this._signer = signer;
    }

    get provider(): P {
        return lodash.sample(this._providers)!;
    }

    get signerOrProvider(): S | P {
        return this._signer ?? this.provider;
    }
}
