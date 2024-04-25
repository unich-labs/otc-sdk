export type Otc = {
    version: "0.1.0";
    name: "otc";
    constants: [
        {
            name: "CONFIG_PDA_SEED";
            type: "bytes";
            value: "[99, 111, 110, 102, 105, 103, 95, 112, 100, 97, 95, 115, 101, 101, 100]";
        },
        {
            name: "ROLE_PDA_SEED";
            type: "bytes";
            value: "[114, 111, 108, 101, 95, 112, 100, 97, 95, 115, 101, 101, 100]";
        },
        {
            name: "OTC_TOKEN_PDA_SEED";
            type: "bytes";
            value: "[111, 116, 99, 95, 116, 111, 107, 101, 110, 95, 112, 100, 97, 95, 115, 101, 101, 100]";
        },
        {
            name: "OFFER_PDA_SEED";
            type: "bytes";
            value: "[111, 102, 102, 101, 114, 95, 112, 100, 97, 95, 115, 101, 101, 100]";
        },
        {
            name: "ORDER_PDA_SEED";
            type: "bytes";
            value: "[111, 114, 100, 101, 114, 95, 112, 100, 97, 95, 115, 101, 101, 100]";
        },
        {
            name: "WEI6";
            type: "u64";
            value: "1_000_000";
        },
        {
            name: "ACCEPTED_TOKEN_PDA_SEED";
            type: "bytes";
            value: "[65, 67, 67, 69, 80, 84, 69, 68, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]";
        },
        {
            name: "VAULT_ACCEPTED_TOKEN_PDA_SEED";
            type: "bytes";
            value: "[86, 65, 85, 76, 84, 95, 65, 67, 67, 69, 80, 84, 69, 68, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]";
        },
        {
            name: "EX_TOKEN_PDA_SEED";
            type: "bytes";
            value: "[69, 88, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]";
        },
        {
            name: "VAULT_TOKEN_PDA_SEED";
            type: "bytes";
            value: "[86, 65, 85, 76, 84, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]";
        }
    ];
    instructions: [
        {
            name: "initializeConfig";
            accounts: [
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: "updateConfig";
            accounts: [
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: true;
                }
            ];
            args: [
                {
                    name: "feeRefund";
                    type: {
                        option: "u64";
                    };
                },
                {
                    name: "feeSettle";
                    type: {
                        option: "u64";
                    };
                },
                {
                    name: "pledgeRate";
                    type: {
                        option: "u64";
                    };
                },
                {
                    name: "feeWallet";
                    type: {
                        option: "publicKey";
                    };
                }
            ];
        },
        {
            name: "setRole";
            accounts: [
                {
                    name: "configAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "roleAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "user";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "role";
                    type: {
                        defined: "Role";
                    };
                }
            ];
        },
        {
            name: "createOtcToken";
            accounts: [
                {
                    name: "otcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "roleAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "operator";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "tokenId";
                    type: "u64";
                },
                {
                    name: "settleDuration";
                    type: "u64";
                }
            ];
        },
        {
            name: "settleOtcToken";
            accounts: [
                {
                    name: "otcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "mint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "roleAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "operator";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "tokenId";
                    type: "u64";
                },
                {
                    name: "settleRate";
                    type: "u64";
                }
            ];
        },
        {
            name: "setExToken";
            accounts: [
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "mint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "isAccepted";
                    type: "bool";
                }
            ];
        },
        {
            name: "setAcceptedToken";
            accounts: [
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "mint";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "isAccepted";
                    type: "bool";
                }
            ];
        },
        {
            name: "createOffer";
            accounts: [
                {
                    name: "otcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "offerAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "userTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exToken";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "user";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "offerType";
                    type: {
                        defined: "OfferType";
                    };
                },
                {
                    name: "tokenId";
                    type: "u64";
                },
                {
                    name: "amount";
                    type: "u64";
                },
                {
                    name: "value";
                    type: "u64";
                },
                {
                    name: "fullMatch";
                    type: "bool";
                }
            ];
        },
        {
            name: "fillOffer";
            accounts: [
                {
                    name: "orderAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "offerAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "otcTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "userTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exToken";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "user";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "offerId";
                    type: "u64";
                },
                {
                    name: "amount";
                    type: "u64";
                }
            ];
        },
        {
            name: "cancelOffer";
            accounts: [
                {
                    name: "offerAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "userTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exToken";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "user";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "offerId";
                    type: "u64";
                }
            ];
        },
        {
            name: "settleFilled";
            accounts: [
                {
                    name: "orderAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "offerAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "otcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vaultTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "configAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "exTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "sellerExTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "buyerOtcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "sellerOtcTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "otcToken";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "exToken";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "user";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "feeWallet";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "orderId";
                    type: "u64";
                }
            ];
        }
    ];
    accounts: [
        {
            name: "configAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "authority";
                        type: "publicKey";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "pledgeRate";
                        type: "u64";
                    },
                    {
                        name: "feeRefund";
                        type: "u64";
                    },
                    {
                        name: "feeSettle";
                        type: "u64";
                    },
                    {
                        name: "feeWallet";
                        type: "publicKey";
                    },
                    {
                        name: "lastOfferId";
                        type: "u64";
                    },
                    {
                        name: "lastOrderId";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "exTokenAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "token";
                        type: "publicKey";
                    },
                    {
                        name: "vaultToken";
                        type: "publicKey";
                    },
                    {
                        name: "isAccepted";
                        type: "bool";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "vaultBump";
                        type: "u8";
                    },
                    {
                        name: "configAccount";
                        type: "publicKey";
                    }
                ];
            };
        },
        {
            name: "offerAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "tokenId";
                        type: "u64";
                    },
                    {
                        name: "exToken";
                        type: "publicKey";
                    },
                    {
                        name: "offerType";
                        type: {
                            defined: "OfferType";
                        };
                    },
                    {
                        name: "amount";
                        type: "u64";
                    },
                    {
                        name: "value";
                        type: "u64";
                    },
                    {
                        name: "collateral";
                        type: "u64";
                    },
                    {
                        name: "filledAmount";
                        type: "u64";
                    },
                    {
                        name: "status";
                        type: {
                            defined: "OfferStatus";
                        };
                    },
                    {
                        name: "offerBy";
                        type: "publicKey";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "configAccount";
                        type: "publicKey";
                    },
                    {
                        name: "fullMatch";
                        type: "bool";
                    }
                ];
            };
        },
        {
            name: "orderAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "offerId";
                        type: "u64";
                    },
                    {
                        name: "amount";
                        type: "u64";
                    },
                    {
                        name: "status";
                        type: {
                            defined: "OrderStatus";
                        };
                    },
                    {
                        name: "seller";
                        type: "publicKey";
                    },
                    {
                        name: "buyer";
                        type: "publicKey";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "configAccount";
                        type: "publicKey";
                    }
                ];
            };
        },
        {
            name: "otcTokenAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "id";
                        type: "u64";
                    },
                    {
                        name: "token";
                        type: "publicKey";
                    },
                    {
                        name: "settleDuration";
                        type: "u64";
                    },
                    {
                        name: "settleTime";
                        type: "u64";
                    },
                    {
                        name: "settleRate";
                        type: "u64";
                    },
                    {
                        name: "status";
                        type: {
                            defined: "OtcTokenStatus";
                        };
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "configAccount";
                        type: "publicKey";
                    }
                ];
            };
        },
        {
            name: "roleAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "configAccount";
                        type: "publicKey";
                    },
                    {
                        name: "user";
                        type: "publicKey";
                    },
                    {
                        name: "role";
                        type: {
                            defined: "Role";
                        };
                    },
                    {
                        name: "bump";
                        type: "u8";
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: "OfferType";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Buy";
                    },
                    {
                        name: "Sell";
                    }
                ];
            };
        },
        {
            name: "OfferStatus";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Open";
                    },
                    {
                        name: "Filled";
                    },
                    {
                        name: "Canceled";
                    }
                ];
            };
        },
        {
            name: "OrderStatus";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Open";
                    },
                    {
                        name: "SettleFilled";
                    },
                    {
                        name: "SettleCanceled";
                    },
                    {
                        name: "Canceled";
                    }
                ];
            };
        },
        {
            name: "OtcTokenStatus";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Active";
                    },
                    {
                        name: "Inactive";
                    },
                    {
                        name: "Settle";
                    }
                ];
            };
        },
        {
            name: "Role";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "Operator";
                    },
                    {
                        name: "Admin";
                    }
                ];
            };
        }
    ];
    events: [
        {
            name: "InitializedEvent";
            fields: [
                {
                    name: "authority";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "feeWallet";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "feeRefund";
                    type: "u64";
                    index: false;
                },
                {
                    name: "feeSettle";
                    type: "u64";
                    index: false;
                },
                {
                    name: "pledgeRate";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "SetRoleEvent";
            fields: [
                {
                    name: "configAccount";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "user";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "role";
                    type: {
                        defined: "Role";
                    };
                    index: false;
                }
            ];
        },
        {
            name: "NewTokenEvent";
            fields: [
                {
                    name: "tokenId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "settleDuration";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "SettledTokenEvent";
            fields: [
                {
                    name: "tokenId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "token";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "settleRate";
                    type: "u64";
                    index: false;
                },
                {
                    name: "settleTime";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "SetExTokenEvent";
            fields: [
                {
                    name: "exToken";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "config";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "isAccepted";
                    type: "bool";
                    index: false;
                }
            ];
        },
        {
            name: "NewOfferEvent";
            fields: [
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "offerType";
                    type: {
                        defined: "OfferType";
                    };
                    index: false;
                },
                {
                    name: "tokenId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "exToken";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "amount";
                    type: "u64";
                    index: false;
                },
                {
                    name: "value";
                    type: "u64";
                    index: false;
                },
                {
                    name: "collateral";
                    type: "u64";
                    index: false;
                },
                {
                    name: "fullMatch";
                    type: "bool";
                    index: false;
                },
                {
                    name: "offerBy";
                    type: "publicKey";
                    index: false;
                }
            ];
        },
        {
            name: "NewOrderEvent";
            fields: [
                {
                    name: "orderId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "amount";
                    type: "u64";
                    index: false;
                },
                {
                    name: "buyer";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "seller";
                    type: "publicKey";
                    index: false;
                }
            ];
        },
        {
            name: "ClosedOfferEvent";
            fields: [
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "refund";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "CanceledOfferEvent";
            fields: [
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "refund";
                    type: "u64";
                    index: false;
                },
                {
                    name: "refundFee";
                    type: "u64";
                    index: false;
                },
                {
                    name: "from";
                    type: "publicKey";
                    index: false;
                }
            ];
        },
        {
            name: "SettleFilledEvent";
            fields: [
                {
                    name: "orderId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "value";
                    type: "u64";
                    index: false;
                },
                {
                    name: "fee";
                    type: "u64";
                    index: false;
                },
                {
                    name: "from";
                    type: "publicKey";
                    index: false;
                }
            ];
        },
        {
            name: "SettleCanceledEvent";
            fields: [
                {
                    name: "orderId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "value";
                    type: "u64";
                    index: false;
                },
                {
                    name: "fee";
                    type: "u64";
                    index: false;
                },
                {
                    name: "from";
                    type: "publicKey";
                    index: false;
                }
            ];
        },
        {
            name: "SettledOfferEvent";
            fields: [
                {
                    name: "offer";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "config";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "totalLiquidValue";
                    type: "u64";
                    index: false;
                },
                {
                    name: "feeValue";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "CancelUnfilledOfferEvent";
            fields: [
                {
                    name: "offer";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "config";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "feeCancel";
                    type: "u64";
                    index: false;
                },
                {
                    name: "refundValue";
                    type: "u64";
                    index: false;
                }
            ];
        },
        {
            name: "CancelFilledOfferEvent";
            fields: [
                {
                    name: "offer";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "offerId";
                    type: "u64";
                    index: false;
                },
                {
                    name: "config";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "feeCancel";
                    type: "u64";
                    index: false;
                },
                {
                    name: "refundValue";
                    type: "u64";
                    index: false;
                }
            ];
        }
    ];
    errors: [
        {
            code: 6000;
            name: "Initialized";
            msg: "Initialized";
        },
        {
            code: 6001;
            name: "Unauthorized";
            msg: "Unauthorized";
        },
        {
            code: 6002;
            name: "InvalidConfigAccount";
            msg: "Invalid Config Account";
        },
        {
            code: 6003;
            name: "InsufficientFunds";
            msg: "Insufficient Funds";
        },
        {
            code: 6004;
            name: "FeeRefundTooHigh";
            msg: "Fee Refund <= 10%";
        },
        {
            code: 6005;
            name: "FeeSettleTooHigh";
            msg: "Settle Fee <= 10%";
        },
        {
            code: 6006;
            name: "MintIsNotOwnedByTokenProgram";
            msg: "Mint is not owned by token program";
        },
        {
            code: 6007;
            name: "EXTokenNotAccepted";
            msg: "Exchange Token Not Accepted";
        },
        {
            code: 6008;
            name: "PriceInvalid";
            msg: "Price Invalid";
        },
        {
            code: 6009;
            name: "OfferStatusInvalid";
            msg: "Offer Status Invalid";
        },
        {
            code: 6010;
            name: "InvalidAmount";
            msg: "Invalid Amount";
        },
        {
            code: 6011;
            name: "EXTokenMismatch";
            msg: "Invalid Offer Token";
        },
        {
            code: 6012;
            name: "ConfigMismatch";
            msg: "Config Mismatch";
        },
        {
            code: 6013;
            name: "FeeWalletMismatch";
            msg: "Fee Wallet Mismatch";
        },
        {
            code: 6014;
            name: "InvalidRole";
            msg: "Invalid role";
        },
        {
            code: 6015;
            name: "InvalidToken";
            msg: "Invalid Token";
        },
        {
            code: 6016;
            name: "InvalidOfferToken";
            msg: "Invalid Offer Token";
        },
        {
            code: 6017;
            name: "InvalidOfferStatus";
            msg: "Invalid Offer Status";
        },
        {
            code: 6018;
            name: "InvalidTokenStatus";
            msg: "Invalid Token Status";
        },
        {
            code: 6019;
            name: "FullMatchRequired";
            msg: "FullMatch Required";
        },
        {
            code: 6020;
            name: "InsufficientAllocations";
            msg: "Insufficient Allocations";
        },
        {
            code: 6021;
            name: "OfferOwnerOnly";
            msg: "Offer Owner Only";
        },
        {
            code: 6022;
            name: "SellerOnly";
            msg: "Seller Only";
        },
        {
            code: 6023;
            name: "TokenNotSet";
            msg: "Token Not Set";
        },
        {
            code: 6024;
            name: "InvalidOrderStatus";
            msg: "Invalid Order Status";
        }
    ];
};

export const IDL: Otc = {
    version: "0.1.0",
    name: "otc",
    constants: [
        {
            name: "CONFIG_PDA_SEED",
            type: "bytes",
            value: "[99, 111, 110, 102, 105, 103, 95, 112, 100, 97, 95, 115, 101, 101, 100]",
        },
        {
            name: "ROLE_PDA_SEED",
            type: "bytes",
            value: "[114, 111, 108, 101, 95, 112, 100, 97, 95, 115, 101, 101, 100]",
        },
        {
            name: "OTC_TOKEN_PDA_SEED",
            type: "bytes",
            value: "[111, 116, 99, 95, 116, 111, 107, 101, 110, 95, 112, 100, 97, 95, 115, 101, 101, 100]",
        },
        {
            name: "OFFER_PDA_SEED",
            type: "bytes",
            value: "[111, 102, 102, 101, 114, 95, 112, 100, 97, 95, 115, 101, 101, 100]",
        },
        {
            name: "ORDER_PDA_SEED",
            type: "bytes",
            value: "[111, 114, 100, 101, 114, 95, 112, 100, 97, 95, 115, 101, 101, 100]",
        },
        {
            name: "WEI6",
            type: "u64",
            value: "1_000_000",
        },
        {
            name: "ACCEPTED_TOKEN_PDA_SEED",
            type: "bytes",
            value: "[65, 67, 67, 69, 80, 84, 69, 68, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]",
        },
        {
            name: "VAULT_ACCEPTED_TOKEN_PDA_SEED",
            type: "bytes",
            value: "[86, 65, 85, 76, 84, 95, 65, 67, 67, 69, 80, 84, 69, 68, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]",
        },
        {
            name: "EX_TOKEN_PDA_SEED",
            type: "bytes",
            value: "[69, 88, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]",
        },
        {
            name: "VAULT_TOKEN_PDA_SEED",
            type: "bytes",
            value: "[86, 65, 85, 76, 84, 95, 84, 79, 75, 69, 78, 95, 80, 68, 65, 95, 83, 69, 69, 68]",
        },
    ],
    instructions: [
        {
            name: "initializeConfig",
            accounts: [
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: "updateConfig",
            accounts: [
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: true,
                },
            ],
            args: [
                {
                    name: "feeRefund",
                    type: {
                        option: "u64",
                    },
                },
                {
                    name: "feeSettle",
                    type: {
                        option: "u64",
                    },
                },
                {
                    name: "pledgeRate",
                    type: {
                        option: "u64",
                    },
                },
                {
                    name: "feeWallet",
                    type: {
                        option: "publicKey",
                    },
                },
            ],
        },
        {
            name: "setRole",
            accounts: [
                {
                    name: "configAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "roleAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "user",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "role",
                    type: {
                        defined: "Role",
                    },
                },
            ],
        },
        {
            name: "createOtcToken",
            accounts: [
                {
                    name: "otcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "roleAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "operator",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "tokenId",
                    type: "u64",
                },
                {
                    name: "settleDuration",
                    type: "u64",
                },
            ],
        },
        {
            name: "settleOtcToken",
            accounts: [
                {
                    name: "otcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "mint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "roleAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "operator",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "tokenId",
                    type: "u64",
                },
                {
                    name: "settleRate",
                    type: "u64",
                },
            ],
        },
        {
            name: "setExToken",
            accounts: [
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "mint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "isAccepted",
                    type: "bool",
                },
            ],
        },
        {
            name: "setAcceptedToken",
            accounts: [
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "mint",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "isAccepted",
                    type: "bool",
                },
            ],
        },
        {
            name: "createOffer",
            accounts: [
                {
                    name: "otcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "offerAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "userTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exToken",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "offerType",
                    type: {
                        defined: "OfferType",
                    },
                },
                {
                    name: "tokenId",
                    type: "u64",
                },
                {
                    name: "amount",
                    type: "u64",
                },
                {
                    name: "value",
                    type: "u64",
                },
                {
                    name: "fullMatch",
                    type: "bool",
                },
            ],
        },
        {
            name: "fillOffer",
            accounts: [
                {
                    name: "orderAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "offerAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "otcTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "userTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exToken",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "offerId",
                    type: "u64",
                },
                {
                    name: "amount",
                    type: "u64",
                },
            ],
        },
        {
            name: "cancelOffer",
            accounts: [
                {
                    name: "offerAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "userTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exToken",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "offerId",
                    type: "u64",
                },
            ],
        },
        {
            name: "settleFilled",
            accounts: [
                {
                    name: "orderAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "offerAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "otcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vaultTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "configAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "exTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "sellerExTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "buyerOtcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "sellerOtcTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "otcToken",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "exToken",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "feeWallet",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "orderId",
                    type: "u64",
                },
            ],
        },
    ],
    accounts: [
        {
            name: "configAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "pledgeRate",
                        type: "u64",
                    },
                    {
                        name: "feeRefund",
                        type: "u64",
                    },
                    {
                        name: "feeSettle",
                        type: "u64",
                    },
                    {
                        name: "feeWallet",
                        type: "publicKey",
                    },
                    {
                        name: "lastOfferId",
                        type: "u64",
                    },
                    {
                        name: "lastOrderId",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "exTokenAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "token",
                        type: "publicKey",
                    },
                    {
                        name: "vaultToken",
                        type: "publicKey",
                    },
                    {
                        name: "isAccepted",
                        type: "bool",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "vaultBump",
                        type: "u8",
                    },
                    {
                        name: "configAccount",
                        type: "publicKey",
                    },
                ],
            },
        },
        {
            name: "offerAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "tokenId",
                        type: "u64",
                    },
                    {
                        name: "exToken",
                        type: "publicKey",
                    },
                    {
                        name: "offerType",
                        type: {
                            defined: "OfferType",
                        },
                    },
                    {
                        name: "amount",
                        type: "u64",
                    },
                    {
                        name: "value",
                        type: "u64",
                    },
                    {
                        name: "collateral",
                        type: "u64",
                    },
                    {
                        name: "filledAmount",
                        type: "u64",
                    },
                    {
                        name: "status",
                        type: {
                            defined: "OfferStatus",
                        },
                    },
                    {
                        name: "offerBy",
                        type: "publicKey",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "configAccount",
                        type: "publicKey",
                    },
                    {
                        name: "fullMatch",
                        type: "bool",
                    },
                ],
            },
        },
        {
            name: "orderAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "offerId",
                        type: "u64",
                    },
                    {
                        name: "amount",
                        type: "u64",
                    },
                    {
                        name: "status",
                        type: {
                            defined: "OrderStatus",
                        },
                    },
                    {
                        name: "seller",
                        type: "publicKey",
                    },
                    {
                        name: "buyer",
                        type: "publicKey",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "configAccount",
                        type: "publicKey",
                    },
                ],
            },
        },
        {
            name: "otcTokenAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "id",
                        type: "u64",
                    },
                    {
                        name: "token",
                        type: "publicKey",
                    },
                    {
                        name: "settleDuration",
                        type: "u64",
                    },
                    {
                        name: "settleTime",
                        type: "u64",
                    },
                    {
                        name: "settleRate",
                        type: "u64",
                    },
                    {
                        name: "status",
                        type: {
                            defined: "OtcTokenStatus",
                        },
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "configAccount",
                        type: "publicKey",
                    },
                ],
            },
        },
        {
            name: "roleAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "configAccount",
                        type: "publicKey",
                    },
                    {
                        name: "user",
                        type: "publicKey",
                    },
                    {
                        name: "role",
                        type: {
                            defined: "Role",
                        },
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: "OfferType",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Buy",
                    },
                    {
                        name: "Sell",
                    },
                ],
            },
        },
        {
            name: "OfferStatus",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Open",
                    },
                    {
                        name: "Filled",
                    },
                    {
                        name: "Canceled",
                    },
                ],
            },
        },
        {
            name: "OrderStatus",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Open",
                    },
                    {
                        name: "SettleFilled",
                    },
                    {
                        name: "SettleCanceled",
                    },
                    {
                        name: "Canceled",
                    },
                ],
            },
        },
        {
            name: "OtcTokenStatus",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Active",
                    },
                    {
                        name: "Inactive",
                    },
                    {
                        name: "Settle",
                    },
                ],
            },
        },
        {
            name: "Role",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Operator",
                    },
                    {
                        name: "Admin",
                    },
                ],
            },
        },
    ],
    events: [
        {
            name: "InitializedEvent",
            fields: [
                {
                    name: "authority",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "feeWallet",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "feeRefund",
                    type: "u64",
                    index: false,
                },
                {
                    name: "feeSettle",
                    type: "u64",
                    index: false,
                },
                {
                    name: "pledgeRate",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "SetRoleEvent",
            fields: [
                {
                    name: "configAccount",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "user",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "role",
                    type: {
                        defined: "Role",
                    },
                    index: false,
                },
            ],
        },
        {
            name: "NewTokenEvent",
            fields: [
                {
                    name: "tokenId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "settleDuration",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "SettledTokenEvent",
            fields: [
                {
                    name: "tokenId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "token",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "settleRate",
                    type: "u64",
                    index: false,
                },
                {
                    name: "settleTime",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "SetExTokenEvent",
            fields: [
                {
                    name: "exToken",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "config",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "isAccepted",
                    type: "bool",
                    index: false,
                },
            ],
        },
        {
            name: "NewOfferEvent",
            fields: [
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "offerType",
                    type: {
                        defined: "OfferType",
                    },
                    index: false,
                },
                {
                    name: "tokenId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "exToken",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "amount",
                    type: "u64",
                    index: false,
                },
                {
                    name: "value",
                    type: "u64",
                    index: false,
                },
                {
                    name: "collateral",
                    type: "u64",
                    index: false,
                },
                {
                    name: "fullMatch",
                    type: "bool",
                    index: false,
                },
                {
                    name: "offerBy",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
        {
            name: "NewOrderEvent",
            fields: [
                {
                    name: "orderId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "amount",
                    type: "u64",
                    index: false,
                },
                {
                    name: "buyer",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "seller",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
        {
            name: "ClosedOfferEvent",
            fields: [
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "refund",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "CanceledOfferEvent",
            fields: [
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "refund",
                    type: "u64",
                    index: false,
                },
                {
                    name: "refundFee",
                    type: "u64",
                    index: false,
                },
                {
                    name: "from",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
        {
            name: "SettleFilledEvent",
            fields: [
                {
                    name: "orderId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "value",
                    type: "u64",
                    index: false,
                },
                {
                    name: "fee",
                    type: "u64",
                    index: false,
                },
                {
                    name: "from",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
        {
            name: "SettleCanceledEvent",
            fields: [
                {
                    name: "orderId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "value",
                    type: "u64",
                    index: false,
                },
                {
                    name: "fee",
                    type: "u64",
                    index: false,
                },
                {
                    name: "from",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
        {
            name: "SettledOfferEvent",
            fields: [
                {
                    name: "offer",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "config",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "totalLiquidValue",
                    type: "u64",
                    index: false,
                },
                {
                    name: "feeValue",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "CancelUnfilledOfferEvent",
            fields: [
                {
                    name: "offer",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "config",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "feeCancel",
                    type: "u64",
                    index: false,
                },
                {
                    name: "refundValue",
                    type: "u64",
                    index: false,
                },
            ],
        },
        {
            name: "CancelFilledOfferEvent",
            fields: [
                {
                    name: "offer",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "offerId",
                    type: "u64",
                    index: false,
                },
                {
                    name: "config",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "feeCancel",
                    type: "u64",
                    index: false,
                },
                {
                    name: "refundValue",
                    type: "u64",
                    index: false,
                },
            ],
        },
    ],
    errors: [
        {
            code: 6000,
            name: "Initialized",
            msg: "Initialized",
        },
        {
            code: 6001,
            name: "Unauthorized",
            msg: "Unauthorized",
        },
        {
            code: 6002,
            name: "InvalidConfigAccount",
            msg: "Invalid Config Account",
        },
        {
            code: 6003,
            name: "InsufficientFunds",
            msg: "Insufficient Funds",
        },
        {
            code: 6004,
            name: "FeeRefundTooHigh",
            msg: "Fee Refund <= 10%",
        },
        {
            code: 6005,
            name: "FeeSettleTooHigh",
            msg: "Settle Fee <= 10%",
        },
        {
            code: 6006,
            name: "MintIsNotOwnedByTokenProgram",
            msg: "Mint is not owned by token program",
        },
        {
            code: 6007,
            name: "EXTokenNotAccepted",
            msg: "Exchange Token Not Accepted",
        },
        {
            code: 6008,
            name: "PriceInvalid",
            msg: "Price Invalid",
        },
        {
            code: 6009,
            name: "OfferStatusInvalid",
            msg: "Offer Status Invalid",
        },
        {
            code: 6010,
            name: "InvalidAmount",
            msg: "Invalid Amount",
        },
        {
            code: 6011,
            name: "EXTokenMismatch",
            msg: "Invalid Offer Token",
        },
        {
            code: 6012,
            name: "ConfigMismatch",
            msg: "Config Mismatch",
        },
        {
            code: 6013,
            name: "FeeWalletMismatch",
            msg: "Fee Wallet Mismatch",
        },
        {
            code: 6014,
            name: "InvalidRole",
            msg: "Invalid role",
        },
        {
            code: 6015,
            name: "InvalidToken",
            msg: "Invalid Token",
        },
        {
            code: 6016,
            name: "InvalidOfferToken",
            msg: "Invalid Offer Token",
        },
        {
            code: 6017,
            name: "InvalidOfferStatus",
            msg: "Invalid Offer Status",
        },
        {
            code: 6018,
            name: "InvalidTokenStatus",
            msg: "Invalid Token Status",
        },
        {
            code: 6019,
            name: "FullMatchRequired",
            msg: "FullMatch Required",
        },
        {
            code: 6020,
            name: "InsufficientAllocations",
            msg: "Insufficient Allocations",
        },
        {
            code: 6021,
            name: "OfferOwnerOnly",
            msg: "Offer Owner Only",
        },
        {
            code: 6022,
            name: "SellerOnly",
            msg: "Seller Only",
        },
        {
            code: 6023,
            name: "TokenNotSet",
            msg: "Token Not Set",
        },
        {
            code: 6024,
            name: "InvalidOrderStatus",
            msg: "Invalid Order Status",
        },
    ],
};
