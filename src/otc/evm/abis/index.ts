export const OtcAbi = [
    {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "neededRole",
                type: "bytes32",
            },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
        ],
        name: "AddressEmptyCode",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "AddressInsufficientBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "AlreadyExistsError",
        type: "error",
    },
    {
        inputs: [],
        name: "EmptyError",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedInnerCall",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
        ],
        name: "MarketForceCancelSettlePhase",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "settleRate",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint48",
                name: "settleTime",
                type: "uint48",
            },
            {
                indexed: false,
                internalType: "uint48",
                name: "settleDuration",
                type: "uint48",
            },
        ],
        name: "MarketToSettlePhase",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "exToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "pledgeRate",
                type: "uint256",
            },
        ],
        name: "NewMarket",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "orderType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                indexed: false,
                internalType: "address",
                name: "doer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "isBid",
                type: "bool",
            },
        ],
        name: "NewOrder",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tradeId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "matchedOrderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "buyerSqrtPriceX96",
                type: "uint160",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "sellerSqrtPriceX96",
                type: "uint160",
            },
            {
                indexed: false,
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "NewTrade",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "refundAmount",
                type: "uint256",
            },
        ],
        name: "OrderClosed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "OrderUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "doer",
                type: "address",
            },
        ],
        name: "Settle2Steps",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "tradeIds",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "address",
                name: "cashOutBy",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
        ],
        name: "TradeCashOuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "doer",
                type: "address",
            },
        ],
        name: "TradeSettleCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "doer",
                type: "address",
            },
        ],
        name: "TradeSettleFilled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "oldFeeWallet",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "oldFeeSettle",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "oldFeeRefund",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newFeeWallet",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newFeeSettle",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newFeeRefund",
                type: "uint256",
            },
        ],
        name: "UpdateConfig",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint48",
                name: "prevDuration",
                type: "uint48",
            },
            {
                indexed: false,
                internalType: "uint48",
                name: "duration",
                type: "uint48",
            },
        ],
        name: "UpdateMarketSettleDuration",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "prevStatus",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "status",
                type: "uint8",
            },
        ],
        name: "UpdateMarketStatus",
        type: "event",
    },
    {
        inputs: [],
        name: "ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "OPERATOR_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "cashOutId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "buyCashOut",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
        ],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "tradeIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
        ],
        name: "cashOutTrades",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "cashOuts",
        outputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "cashOutBy",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "uint256",
                name: "filledAmount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
        ],
        name: "changeOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "config",
        outputs: [
            {
                internalType: "uint256",
                name: "feeRefund",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feeSettle",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "feeWallet",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "orderType",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "bool",
                name: "isBid",
                type: "bool",
            },
        ],
        name: "createOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "orderType",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "bool",
                name: "isBid",
                type: "bool",
            },
        ],
        name: "createOrderETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "fillOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "fillOrderETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
        ],
        name: "forceCancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "uint8",
                name: "exDecimals",
                type: "uint8",
            },
        ],
        name: "getValueFromPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "lastCashOutId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "lastOrderId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "lastTradeId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
        ],
        name: "marketForceCancelSettlePhase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint152",
                name: "settleRate",
                type: "uint152",
            },
            {
                internalType: "uint48",
                name: "settleDuration",
                type: "uint48",
            },
        ],
        name: "marketToSettlePhase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
        ],
        name: "marketToggleActivation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "markets",
        outputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "address",
                name: "exToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "pledgeRate",
                type: "uint256",
            },
            {
                internalType: "uint48",
                name: "settleTime",
                type: "uint48",
            },
            {
                internalType: "uint48",
                name: "settleDuration",
                type: "uint48",
            },
            {
                internalType: "uint152",
                name: "settleRate",
                type: "uint152",
            },
            {
                internalType: "uint8",
                name: "status",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "minTrade",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "bidOrderId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
        ],
        name: "matchBidOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "exToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "pledgeRate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minTrade",
                type: "uint256",
            },
        ],
        name: "newMarket",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "orders",
        outputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "uint8",
                name: "orderType",
                type: "uint8",
            },
            {
                internalType: "bool",
                name: "isBid",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "uint256",
                name: "filledAmount",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "status",
                type: "uint8",
            },
            {
                internalType: "address",
                name: "orderBy",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "callerConfirmation",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "orderId",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "settle2Steps",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tradeId",
                type: "uint256",
            },
        ],
        name: "settleCancelled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tradeId",
                type: "uint256",
            },
        ],
        name: "settleFilled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "trades",
        outputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint160",
                name: "buyerSqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "uint160",
                name: "sellerSqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "uint8",
                name: "settled",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "buyerCashOuted",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sellerCashOuted",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "status",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "feeWallet_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "feeSettle_",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feeRefund_",
                type: "uint256",
            },
        ],
        name: "updateConfig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "marketId",
                type: "bytes32",
            },
            {
                internalType: "uint48",
                name: "duration",
                type: "uint48",
            },
        ],
        name: "updateSettleDuration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdrawStuckToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
