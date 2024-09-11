export type Otc = {
  "version": "0.1.0",
  "name": "otc",
  "constants": [
    {
      "name": "BID_ORDER",
      "type": "u8",
      "value": "1"
    },
    {
      "name": "BUYER_SETTLED",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "CASHOUT_ORDER",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "CONFIG_PDA_SEED",
      "type": "bytes",
      "value": "[99, 111, 110, 102, 105, 103]"
    },
    {
      "name": "EX_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[101, 120, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "MARKET_PDA_SEED",
      "type": "bytes",
      "value": "[109, 97, 114, 107, 101, 116]"
    },
    {
      "name": "ORDER_PDA_SEED",
      "type": "bytes",
      "value": "[111, 114, 100, 101, 114]"
    },
    {
      "name": "ROLE_PDA_SEED",
      "type": "bytes",
      "value": "[114, 111, 108, 101]"
    },
    {
      "name": "SEAT_PDA_SEED",
      "type": "bytes",
      "value": "[115, 101, 97, 116]"
    },
    {
      "name": "SELLER_SETTLED",
      "type": "u8",
      "value": "3"
    },
    {
      "name": "STANDARD_ORDER",
      "type": "u8",
      "value": "0"
    },
    {
      "name": "TRADE_PDA_SEED",
      "type": "bytes",
      "value": "[116, 114, 97, 100, 101]"
    },
    {
      "name": "VAULT_EX_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116, 95, 101, 120, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "VAULT_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "WEI6",
      "type": "u64",
      "value": "1000000"
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateConfig",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRefund",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeSettle",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeWallet",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "setRole",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "role",
          "type": {
            "defined": "Role"
          }
        }
      ]
    },
    {
      "name": "newMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "pledgeRate",
          "type": "u64"
        },
        {
          "name": "minTrade",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "status",
          "type": {
            "option": {
              "defined": "MarketStatus"
            }
          }
        },
        {
          "name": "settleTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "settleDuration",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "settleRate",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minTrade",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "settleMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "settleTime",
          "type": "i64"
        },
        {
          "name": "settleDuration",
          "type": "i64"
        },
        {
          "name": "settleRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createOrder",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "matchOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderBuyAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderSellAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderBuyId",
          "type": "u64"
        },
        {
          "name": "orderSellId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchBidOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderBidAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "orderBidId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "fillOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cashoutTrade",
      "accounts": [
        {
          "name": "cashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchCashoutOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeCashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashoutByExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "cashoutId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleFilled",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleCanceled",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeRefund",
            "type": "u64"
          },
          {
            "name": "feeSettle",
            "type": "u64"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "exToken",
            "type": "publicKey"
          },
          {
            "name": "pledgeRate",
            "type": "u64"
          },
          {
            "name": "settleTime",
            "type": "i64"
          },
          {
            "name": "settleDuration",
            "type": "i64"
          },
          {
            "name": "settleRate",
            "type": "u64"
          },
          {
            "name": "minTrade",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "lastOrderId",
            "type": "u64"
          },
          {
            "name": "lastTradeId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "configAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderSide",
            "type": {
              "defined": "OrderSide"
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "filledAmount",
            "type": "u64"
          },
          {
            "name": "orderBy",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "orderType",
            "type": "u8"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roleAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "role",
            "type": {
              "defined": "Role"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tradeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "buyerValue",
            "type": "u64"
          },
          {
            "name": "sellerValue",
            "type": "u64"
          },
          {
            "name": "totalReserve",
            "type": "u64"
          },
          {
            "name": "settled",
            "type": "u8"
          },
          {
            "name": "buyerCashouted",
            "type": "u64"
          },
          {
            "name": "sellerCashouted",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Active"
          },
          {
            "name": "Inactive"
          },
          {
            "name": "Settled"
          }
        ]
      }
    },
    {
      "name": "OrderSide",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    },
    {
      "name": "Role",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Operator"
          },
          {
            "name": "Admin"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CanceledOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CashoutEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          },
          "index": false
        },
        {
          "name": "cashoutBy",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "value",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "ClosedOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "refund",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "FilledCashoutEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "cashoutId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializedEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeWallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRefund",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeSettle",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "exToken",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pledgeRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "minTrade",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          },
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "value",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderType",
          "type": "u8",
          "index": false
        },
        {
          "name": "orderBy",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tradeId",
          "type": {
            "option": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "NewTradeEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "matchedOrderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "buyerValue",
          "type": "u64",
          "index": false
        },
        {
          "name": "sellerValue",
          "type": "u64",
          "index": false
        },
        {
          "name": "buyer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "seller",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SetRoleEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "role",
          "type": {
            "defined": "Role"
          },
          "index": false
        }
      ]
    },
    {
      "name": "SettleCanceledEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "doer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SettleFilledEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "doer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SettleMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "settleTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleDuration",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateConfigEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeWallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRefund",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeSettle",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        },
        {
          "name": "settleTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleDuration",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "minTrade",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6001,
      "name": "Initialized",
      "msg": "Initialized"
    },
    {
      "code": 6002,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6003,
      "name": "MintIsNotOwnedByTokenProgram",
      "msg": "Mint is not owned by token program"
    },
    {
      "code": 6004,
      "name": "InsufficientAllocations",
      "msg": "Insufficient Allocations"
    },
    {
      "code": 6005,
      "name": "OrderOwnerOnly",
      "msg": "Order Owner Only"
    },
    {
      "code": 6006,
      "name": "TradeOwnerOnly",
      "msg": "Trade Owner Only"
    },
    {
      "code": 6007,
      "name": "InvalidFeeWallet",
      "msg": "Invalid Fee Wallet"
    },
    {
      "code": 6008,
      "name": "InvalidSettleTime",
      "msg": "Invalid Settle Time"
    },
    {
      "code": 6009,
      "name": "InvalidMatchingPrice",
      "msg": "Invalid Matching Price"
    },
    {
      "code": 6010,
      "name": "InvalidMarket",
      "msg": "Invalid Market"
    },
    {
      "code": 6011,
      "name": "InvalidMarketStatus",
      "msg": "Invalid Market Status"
    },
    {
      "code": 6012,
      "name": "InvalidExToken",
      "msg": "Invalid Exchange Token"
    },
    {
      "code": 6013,
      "name": "InvalidOtcToken",
      "msg": "Invalid OTC Token"
    },
    {
      "code": 6014,
      "name": "InvalidOrderStatus",
      "msg": "Invalid Order Status"
    },
    {
      "code": 6015,
      "name": "InvalidTradeStatus",
      "msg": "Invalid Trade Status"
    },
    {
      "code": 6016,
      "name": "InvalidMinTrade",
      "msg": "Invalid Min Trade"
    },
    {
      "code": 6017,
      "name": "Settled",
      "msg": "Settled"
    },
    {
      "code": 6018,
      "name": "OnlyForSettled",
      "msg": "Only For Settled"
    },
    {
      "code": 6019,
      "name": "InvalidOrder",
      "msg": "Invalid Order"
    },
    {
      "code": 6020,
      "name": "InvalidAmount",
      "msg": "Invalid Amount"
    }
  ]
};

export const IDL: Otc = {
  "version": "0.1.0",
  "name": "otc",
  "constants": [
    {
      "name": "BID_ORDER",
      "type": "u8",
      "value": "1"
    },
    {
      "name": "BUYER_SETTLED",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "CASHOUT_ORDER",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "CONFIG_PDA_SEED",
      "type": "bytes",
      "value": "[99, 111, 110, 102, 105, 103]"
    },
    {
      "name": "EX_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[101, 120, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "MARKET_PDA_SEED",
      "type": "bytes",
      "value": "[109, 97, 114, 107, 101, 116]"
    },
    {
      "name": "ORDER_PDA_SEED",
      "type": "bytes",
      "value": "[111, 114, 100, 101, 114]"
    },
    {
      "name": "ROLE_PDA_SEED",
      "type": "bytes",
      "value": "[114, 111, 108, 101]"
    },
    {
      "name": "SEAT_PDA_SEED",
      "type": "bytes",
      "value": "[115, 101, 97, 116]"
    },
    {
      "name": "SELLER_SETTLED",
      "type": "u8",
      "value": "3"
    },
    {
      "name": "STANDARD_ORDER",
      "type": "u8",
      "value": "0"
    },
    {
      "name": "TRADE_PDA_SEED",
      "type": "bytes",
      "value": "[116, 114, 97, 100, 101]"
    },
    {
      "name": "VAULT_EX_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116, 95, 101, 120, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "VAULT_TOKEN_PDA_SEED",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116, 95, 116, 111, 107, 101, 110]"
    },
    {
      "name": "WEI6",
      "type": "u64",
      "value": "1000000"
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateConfig",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeRefund",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeSettle",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeWallet",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "setRole",
      "accounts": [
        {
          "name": "configAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "role",
          "type": {
            "defined": "Role"
          }
        }
      ]
    },
    {
      "name": "newMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "pledgeRate",
          "type": "u64"
        },
        {
          "name": "minTrade",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "status",
          "type": {
            "option": {
              "defined": "MarketStatus"
            }
          }
        },
        {
          "name": "settleTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "settleDuration",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "settleRate",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minTrade",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "settleMarket",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roleAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "settleTime",
          "type": "i64"
        },
        {
          "name": "settleDuration",
          "type": "i64"
        },
        {
          "name": "settleRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createOrder",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "matchOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderBuyAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderSellAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderBuyId",
          "type": "u64"
        },
        {
          "name": "orderSellId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchBidOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderBidAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "orderBidId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "fillOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cashoutTrade",
      "accounts": [
        {
          "name": "cashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchCashoutOrder",
      "accounts": [
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "orderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeCashoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashoutByExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "cashoutId",
          "type": "u64"
        },
        {
          "name": "orderId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleFilled",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleCanceled",
      "accounts": [
        {
          "name": "marketAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeExTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "u64"
        },
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeRefund",
            "type": "u64"
          },
          {
            "name": "feeSettle",
            "type": "u64"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "exToken",
            "type": "publicKey"
          },
          {
            "name": "pledgeRate",
            "type": "u64"
          },
          {
            "name": "settleTime",
            "type": "i64"
          },
          {
            "name": "settleDuration",
            "type": "i64"
          },
          {
            "name": "settleRate",
            "type": "u64"
          },
          {
            "name": "minTrade",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "lastOrderId",
            "type": "u64"
          },
          {
            "name": "lastTradeId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "configAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderSide",
            "type": {
              "defined": "OrderSide"
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "filledAmount",
            "type": "u64"
          },
          {
            "name": "orderBy",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "orderType",
            "type": "u8"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roleAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "role",
            "type": {
              "defined": "Role"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tradeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "buyerValue",
            "type": "u64"
          },
          {
            "name": "sellerValue",
            "type": "u64"
          },
          {
            "name": "totalReserve",
            "type": "u64"
          },
          {
            "name": "settled",
            "type": "u8"
          },
          {
            "name": "buyerCashouted",
            "type": "u64"
          },
          {
            "name": "sellerCashouted",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Active"
          },
          {
            "name": "Inactive"
          },
          {
            "name": "Settled"
          }
        ]
      }
    },
    {
      "name": "OrderSide",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    },
    {
      "name": "Role",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Operator"
          },
          {
            "name": "Admin"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CanceledOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CashoutEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          },
          "index": false
        },
        {
          "name": "cashoutBy",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "value",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "ClosedOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "refund",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "FilledCashoutEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "cashoutId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializedEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeWallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRefund",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeSettle",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "exToken",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pledgeRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "minTrade",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NewOrderEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderSide",
          "type": {
            "defined": "OrderSide"
          },
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "value",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderType",
          "type": "u8",
          "index": false
        },
        {
          "name": "orderBy",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tradeId",
          "type": {
            "option": "u64"
          },
          "index": false
        }
      ]
    },
    {
      "name": "NewTradeEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "matchedOrderId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "buyerValue",
          "type": "u64",
          "index": false
        },
        {
          "name": "sellerValue",
          "type": "u64",
          "index": false
        },
        {
          "name": "buyer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "seller",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SetRoleEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "role",
          "type": {
            "defined": "Role"
          },
          "index": false
        }
      ]
    },
    {
      "name": "SettleCanceledEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "doer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SettleFilledEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeId",
          "type": "u64",
          "index": false
        },
        {
          "name": "doer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SettleMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "settleTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleDuration",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateConfigEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeWallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRefund",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeSettle",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateMarketEvent",
      "fields": [
        {
          "name": "configAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        },
        {
          "name": "settleTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleDuration",
          "type": "i64",
          "index": false
        },
        {
          "name": "settleRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "minTrade",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6001,
      "name": "Initialized",
      "msg": "Initialized"
    },
    {
      "code": 6002,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6003,
      "name": "MintIsNotOwnedByTokenProgram",
      "msg": "Mint is not owned by token program"
    },
    {
      "code": 6004,
      "name": "InsufficientAllocations",
      "msg": "Insufficient Allocations"
    },
    {
      "code": 6005,
      "name": "OrderOwnerOnly",
      "msg": "Order Owner Only"
    },
    {
      "code": 6006,
      "name": "TradeOwnerOnly",
      "msg": "Trade Owner Only"
    },
    {
      "code": 6007,
      "name": "InvalidFeeWallet",
      "msg": "Invalid Fee Wallet"
    },
    {
      "code": 6008,
      "name": "InvalidSettleTime",
      "msg": "Invalid Settle Time"
    },
    {
      "code": 6009,
      "name": "InvalidMatchingPrice",
      "msg": "Invalid Matching Price"
    },
    {
      "code": 6010,
      "name": "InvalidMarket",
      "msg": "Invalid Market"
    },
    {
      "code": 6011,
      "name": "InvalidMarketStatus",
      "msg": "Invalid Market Status"
    },
    {
      "code": 6012,
      "name": "InvalidExToken",
      "msg": "Invalid Exchange Token"
    },
    {
      "code": 6013,
      "name": "InvalidOtcToken",
      "msg": "Invalid OTC Token"
    },
    {
      "code": 6014,
      "name": "InvalidOrderStatus",
      "msg": "Invalid Order Status"
    },
    {
      "code": 6015,
      "name": "InvalidTradeStatus",
      "msg": "Invalid Trade Status"
    },
    {
      "code": 6016,
      "name": "InvalidMinTrade",
      "msg": "Invalid Min Trade"
    },
    {
      "code": 6017,
      "name": "Settled",
      "msg": "Settled"
    },
    {
      "code": 6018,
      "name": "OnlyForSettled",
      "msg": "Only For Settled"
    },
    {
      "code": 6019,
      "name": "InvalidOrder",
      "msg": "Invalid Order"
    },
    {
      "code": 6020,
      "name": "InvalidAmount",
      "msg": "Invalid Amount"
    }
  ]
};
