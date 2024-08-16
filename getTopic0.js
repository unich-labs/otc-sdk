const { keccak256, toUtf8Bytes, Contract } = require("ethers");
const OtcAbi = require("./OTC.json");
const { JsonRpcProvider } = require("ethers");

const contract = new Contract(
    "0xeDa54F17062fac1a685fEAe8A5d8bDC22f782252",
    OtcAbi,
    {
        provider: new JsonRpcProvider("https://rpc.sepolia.org"),
    }
);

const result = [
    "NewMarket",
    "SettledMarket",
    "UpdateMarketStatus",
    "MarketForceCancelSettlePhase",
    "UpdateMarketSettleDuration",
    "NewOrder",
    "OrderUpdated",
    "OrderClosed",
    "NewTrade",
    "TradeSettleCancelled",
    "TradeSettleFilled",
    "TradeCashOuted",
].reduce((acc, cur) => {
    // @ts-expect-error
    acc[cur] = contract.interface.fragments.find(
        // @ts-expect-error
        (e) => e.type == "event" && e.name == cur
        // @ts-expect-error
    ).topicHash;

    return acc;
}, {});

console.log("🚀 ~ file: getTopic0.js:14 ~ result ~ result:", result);

// const NewToken = keccak256(toUtf8Bytes("NewToken(bytes32,uint256)"));
// console.log("🚀 ~ NewToken", NewToken);

// const UpdateAcceptedTokens = keccak256(
//     toUtf8Bytes("UpdateAcceptedTokens(address[],bool)")
// );
// console.log("🚀 ~ UpdateAcceptedTokens:", UpdateAcceptedTokens);

// const TokenToSettlePhase = keccak256(
//     toUtf8Bytes("TokenToSettlePhase(bytes32,address,uint256,uint48,uint48)")
// );
// console.log("🚀 ~ TokenToSettlePhase:", TokenToSettlePhase);

// const UpdateTokenStatus = keccak256(
//     toUtf8Bytes("UpdateTokenStatus(address[],bool)")
// );
// console.log("🚀 ~ UpdateTokenStatus:", UpdateTokenStatus);

// const TokenForceCancelSettlePhase = keccak256(
//     toUtf8Bytes("TokenForceCancelSettlePhase(address[],bool)")
// );
// console.log("🚀 ~ TokenForceCancelSettlePhase:", TokenForceCancelSettlePhase);

// const Settle2Steps = keccak256(toUtf8Bytes("Settle2Steps(address[],bool)"));
// console.log("🚀 ~ Settle2Steps:", Settle2Steps);

// const UpdateTokenSettleDuration = keccak256(
//     toUtf8Bytes("UpdateTokenSettleDuration(address[],bool)")
// );
// console.log("🚀 ~ UpdateTokenSettleDuration:", UpdateTokenSettleDuration);
