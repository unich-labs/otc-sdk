import "mocha";
import { expect, assert } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
    CHAIN_ID,
    CONTRACTS,
    EOrderType,
    EvmAddress,
    OtcEvm,
    WEI6,
} from "../src";
import { ZeroAddress, ethers } from "ethers";

chai.use(chaiAsPromised);

const chainId = CHAIN_ID.SEPOLIA;
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

    it("Create new market", async () => {
        const marketId =
            "0xd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28"; // keccak256("MOCK_MARKET")
        const exToken = ZeroAddress as `0x${string}`;
        const pledgeRate = BigInt(WEI6) / BigInt(5); // 20%
        const minTrade = BigInt(WEI6) * BigInt(WEI6) * BigInt(WEI6); // 1e18
        assert.deepEqual(
            {
                to: otcAddress,
                data: "0x0fbfe9ecd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f2800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030d400000000000000000000000000000000000000000000000000de0b6b3a7640000",
            },
            await otc.newMarket(marketId, exToken, pledgeRate, minTrade)
        );
    });

    // it("Create Sell offer without Native coin", async () => {
    //     const offerType = EOrderType.Sell;
    //     const marketId =
    //         "0xd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28"; // keccak256("MOCK_MARKET")
    //     const amount = BigInt(1000) * BigInt(WEI6);
    //     const price = 0.1;
    //     const isBid = false;
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0xa61707b70000000000000000000000000000000000000000000000000000000000000002d03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000050f44d8921243c00000000000000000000000000000000000000000000000000000000000000000000000000",
    //             value: 1000000n, // TODO use sdk
    //         },
    //         await otc.createOrder(offerType, marketId, amount, price, isBid)
    //     );
    // });

    // it("Create Sell offer with Native coin", async () => {
    //     const offerType = EOrderType.Sell;
    //     const marketId =
    //         "0xd03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28"; // keccak256("MOCK_MARKET")
    //     const amount = BigInt(1000) * BigInt(WEI6);
    //     const price = 0.1;
    //     const isBid = false;
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0xa61707b70000000000000000000000000000000000000000000000000000000000000002d03a9f836291dd24616bdb5d2ed41e6e8946457d29314ba5e9fe483669dd0f28000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000050f44d8921243c00000000000000000000000000000000000000000000000000000000000000000000000000",
    //             value: 1000000n, // TODO use sdk
    //         },
    //         await otc.createOrder(offerType, marketId, amount, price, isBid)
    //     );
    // });

    // it("Fill Sell offer without Native coin", async () => {
    //     const offerId = BigInt(1);
    //     const amount = BigInt(10) * BigInt(WEI6);
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0x78447e7f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000989680",
    //         },
    //         await otc.fillOffer(offerId, amount)
    //     );
    // });

    // it("Fill Sell offer wit Native coin", async () => {
    //     const offerId = BigInt(3);
    //     const amount = BigInt("100000000000000000000") * BigInt(WEI6);
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0x78447e7f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000989680",
    //         },
    //         await otc.fillOffer(offerId, amount)
    //     );
    // });

    // it("Fill invalid offer", async () => {
    //     // const offerId = BigInt(0);
    //     // const amount = BigInt(10) * BigInt(WEI6);
    //     // await expect(
    //     //     otc.getFillOfferValue(offerId, amount)
    //     // ).to.eventually.be.rejectedWith("Invalid Offer");
    // });
});
