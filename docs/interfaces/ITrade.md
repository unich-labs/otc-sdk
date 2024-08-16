[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / ITrade

# Interface: ITrade\<BN, Address\>

Trade order interface

## Type Parameters

• **BN**

• **Address**

## Properties

### amount

> **amount**: `BN`

amount of trade order

#### Defined in

otc/otc.interface.ts:140

***

### buyer

> **buyer**: `Address`

buyer address

#### Defined in

otc/otc.interface.ts:179

***

### buyerCashOuted

> **buyerCashOuted**: `BN`

amount that buyer cash out

#### Defined in

otc/otc.interface.ts:164

***

### buyerSqrtPriceX96

> **buyerSqrtPriceX96**: `BN`

sqrtX96 price of buyer

#### Defined in

otc/otc.interface.ts:145

***

### marketId

> **marketId**: `BN`

id of market

#### Defined in

otc/otc.interface.ts:135

***

### seller

> **seller**: `Address`

seller address

#### Defined in

otc/otc.interface.ts:174

***

### sellerCashOuted

> **sellerCashOuted**: `BN`

amount that seller cash out

#### Defined in

otc/otc.interface.ts:169

***

### sellerSqrtPriceX96

> **sellerSqrtPriceX96**: `BN`

sqrtX96 price of seller

#### Defined in

otc/otc.interface.ts:150

***

### settled

> **settled**: `number`

settled status
default 1
buyer settled: 2
seller settled: 3
both buyer and seller settle: 6

#### Defined in

otc/otc.interface.ts:159

***

### status

> **status**: [`ETradeStatus`](../enumerations/ETradeStatus.md)

trade order status

#### Defined in

otc/otc.interface.ts:184
