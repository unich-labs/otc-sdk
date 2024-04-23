import { assert, expect } from "chai";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers } from "ethers";
import {
    CHAIN_ID,
    CONTRACTS,
    EOfferType,
    EvmAddress,
    OtcEvm,
    WEI6,
} from "../src";

chai.use(chaiAsPromised);

const chainId = CHAIN_ID.ARBITRUM_SEPOLIA;
const otcAddress = CONTRACTS[chainId].OTC.address;

describe("OTC EVM testing", () => {
    let otc: OtcEvm;

    beforeEach(function () {
        otc = new OtcEvm(chainId);
    });

    it("Constructor success", () => {
        assert.equal(otcAddress, otc.address());
    });

    it("Get config", async () => {
        const config = await otc.config();
    });

    it("Create OTC token", async () => {
        const tokenId =
            "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
        const settleDuration = 86400; // 1 day

        assert.deepEqual(
            {
                to: otcAddress,
                data: "0xf1ee8fdd464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de650000000000000000000000000000000000000000000000000000000000015180",
            },
            await otc.createOtcToken(tokenId, settleDuration)
        );
    });

    it("Create Sell offer without Native coin", async () => {
        const offerType = EOfferType.Sell;
        const tokenId =
            "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
        const amount = BigInt(1000) * WEI6;
        const value = BigInt(100) * WEI6;
        const exToken = "0x9aa40cc99973d8407a2ae7b2237d26e615ecafd2";
        const fullMatch = true;
        const withNative = false;

        assert.deepEqual(
            {
                to: otcAddress,
                data: "0x0b8aacb90000000000000000000000000000000000000000000000000000000000000002464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000009aa40cc99973d8407a2ae7b2237d26e615ecafd20000000000000000000000000000000000000000000000000000000000000001",
            },
            await otc.createOffer(
                offerType,
                tokenId,
                amount,
                value,
                exToken,
                fullMatch,
                withNative
            )
        );
    });

    it("Create Sell offer with Native coin", async () => {
        const offerType = EOfferType.Sell;
        const tokenId =
            "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
        const amount = BigInt(1000) * WEI6;
        const value = BigInt(100) * WEI6;
        const exToken = ethers.ZeroAddress;
        const fullMatch = true;
        const withNative = true;

        const collateral = await otc.getOfferCollateral(value);

        assert.deepEqual(
            {
                to: otcAddress,
                data: "0xf564f0ae0000000000000000000000000000000000000000000000000000000000000002464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000000000000000001",
                value: collateral,
            },
            await otc.createOffer(
                offerType,
                tokenId,
                amount,
                value,
                exToken as EvmAddress,
                fullMatch,
                withNative
            )
        );
    });

    it("Fill Sell offer without Native coin", async () => {
        const offerId = BigInt(1);
        const amount = BigInt(10) * WEI6;

        assert.deepEqual(
            {
                to: otcAddress,
                data: "0x78447e7f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000989680",
            },
            await otc.fillOffer(offerId, amount)
        );
    });

    it("Fill Sell offer wit Native coin", async () => {
        const offerId = BigInt(3);
        const amount = BigInt(100000000000000000000) * WEI6;

        // assert.deepEqual(
        //     {
        //         to: otcAddress,
        //         data: "0x78447e7f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000989680",
        //     },
        //     await otc.fillOffer(offerId, amount)
        // );
    });

    it("Fill invalid offer", async () => {
        const offerId = BigInt(0);
        const amount = BigInt(10) * WEI6;
        await expect(
            otc.getFillOfferValue(offerId, amount)
        ).to.eventually.be.rejectedWith("Invalid Offer");
    });
});
