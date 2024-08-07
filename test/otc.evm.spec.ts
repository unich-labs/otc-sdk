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
import { ethers } from "ethers";

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

    it("Create OTC token", async () => {
        const tokenId =
            "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
        const pledgeRate = BigInt(WEI6) / BigInt(5); // 20%
        assert.deepEqual(
            {
                to: otcAddress,
                data: "0xdb13b93a464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de650000000000000000000000000000000000000000000000000000000000030d40",
            },
            await otc.addOtcToken(tokenId, pledgeRate)
        );
    });

    // it("Create Sell offer without Native coin", async () => {
    //     const offerType = EOrderType.Sell;
    //     const tokenId =
    //         "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
    //     const amount = BigInt(1000) * BigInt(WEI6);
    //     const price = 0.1;
    //     const exToken = "0x9aa40cc99973d8407a2ae7b2237d26e615ecafd2";
    //     const slippage = BigInt(0);
    //     const isBid = false;
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0x041c56600000000000000000000000000000000000000000000000000000000000000002464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000050f44d8921243c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //         },
    //         await otc.createOrder(
    //             offerType,
    //             tokenId,
    //             amount,
    //             price,
    //             exToken,
    //             slippage,
    //             isBid
    //         )
    //     );
    // });

    // it("Create Sell offer with Native coin", async () => {
    //     const offerType = EOrderType.Sell;
    //     const tokenId =
    //         "0x464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65"; // keccak256("MOCK_OTC_TOKEN")
    //     const amount = BigInt(1000) * BigInt(WEI6);
    //     const price = 0.1;
    //     const exToken = ethers.ZeroAddress as EvmAddress;
    //     const slippage = BigInt(0);
    //     const isBid = false;
    //     assert.deepEqual(
    //         {
    //             to: otcAddress,
    //             data: "0xf564f0ae0000000000000000000000000000000000000000000000000000000000000002464bc3e3bd691660d23304498151f69ab2e13e61e836bdbf36ab5b826a12de65000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000000000000000001",
    //             // value: collateral, // TODO
    //         },
    //         await otc.createOrder(
    //             offerType,
    //             tokenId,
    //             amount,
    //             price,
    //             exToken,
    //             slippage,
    //             isBid
    //         )
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
