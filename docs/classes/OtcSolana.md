[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / OtcSolana

# Class: OtcSolana

## Implements

- [`IOtc`](../interfaces/IOtc.md)\<`PublicKey`, `BN`, `Transaction`\>

## Constructors

### new OtcSolana()

> **new OtcSolana**(`connection`, `chainId`): [`OtcSolana`](OtcSolana.md)

#### Parameters

• **connection**: `Connection`

• **chainId**: [`CHAIN_ID`](../enumerations/CHAIN_ID.md) = `CHAIN_ID.SOLANA_DEVNET`

#### Returns

[`OtcSolana`](OtcSolana.md)

#### Defined in

otc/otc.solana.ts:48

## Properties

### configAccountData

> **configAccountData**: `DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>

#### Type declaration

##### fields

> **fields**: [`object`, `object`, `object`, `object`, `object`, `object`]

##### kind

> **kind**: `"struct"`

#### Defined in

otc/otc.solana.ts:46

***

### configPda

> **configPda**: `PublicKey`

#### Defined in

otc/otc.solana.ts:44

***

### connection

> **connection**: `Connection`

#### Defined in

otc/otc.solana.ts:39

***

### program

> **program**: `Program`\<`Otc`\>

#### Defined in

otc/otc.solana.ts:40

## Methods

### addEventListener()

> **addEventListener**\<`T`\>(`eventType`, `callback`): `number`

#### Type Parameters

• **T** *extends* `never`

#### Parameters

• **eventType**: `T`

• **callback**

#### Returns

`number`

#### Defined in

otc/otc.solana.ts:1108

***

### bootstrap()

> **bootstrap**(`authority`?): `Promise`\<`void`\>

bootstrap sdk

#### Parameters

• **authority?**: `PublicKey`

address of authority

#### Returns

`Promise`\<`void`\>

#### Defined in

otc/otc.solana.ts:67

***

### cancelOrder()

> **cancelOrder**(`data`): `Promise`\<`Transaction`\>

cancel order

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.orderId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:580

***

### createOrder()

> **createOrder**(`data`): `Promise`\<`Transaction`\>

create a new order

#### Parameters

• **data**

• **data.amount**: `BN`

• **data.isBid**: `boolean`

• **data.marketId**: `BN`

• **data.orderId?**: `any`

• **data.orderType**: `DecodeEnum`\<`object`, `EmptyDefined`\>

• **data.slippage**: `BN`

• **data.user**: `PublicKey`

• **data.value**: `BN`

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:469

***

### fetchConfigAccount()

> **fetchConfigAccount**(`configPda`, `commitment`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

fetch config account data

#### Parameters

• **configPda**: `PublicKey`

config account PDA

• **commitment?**: `Commitment`

connection commitment

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

configAccount

#### Defined in

otc/otc.solana.ts:82

***

### fetchLastCashoutId()

> **fetchLastCashoutId**(`marketId`): `Promise`\<`BN`\>

fetch last cashout id

#### Parameters

• **marketId**: `BN`

#### Returns

`Promise`\<`BN`\>

lastCashoutId

#### Defined in

otc/otc.solana.ts:184

***

### fetchLastOrderId()

> **fetchLastOrderId**(`marketId`): `Promise`\<`BN`\>

fetch last order id

#### Parameters

• **marketId**: `BN`

id of market

#### Returns

`Promise`\<`BN`\>

lastOrderId

#### Defined in

otc/otc.solana.ts:166

***

### fetchLastTradeId()

> **fetchLastTradeId**(`marketId`): `Promise`\<`BN`\>

fetch last trade id

#### Parameters

• **marketId**: `BN`

id of market

#### Returns

`Promise`\<`BN`\>

lastTradeId

#### Defined in

otc/otc.solana.ts:175

***

### fetchMarketAccount()

> **fetchMarketAccount**(`marketId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

fetch market account data

#### Parameters

• **marketId**: `BN`

id of market

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

marketAccount

#### Defined in

otc/otc.solana.ts:123

***

### fetchOrderAccount()

> **fetchOrderAccount**(`marketId`, `orderId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

fetch order account data

#### Parameters

• **marketId**: `BN`

id of market

• **orderId**: `BN`

id of order

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

orderAccount

#### Defined in

otc/otc.solana.ts:137

***

### fetchRoleAccount()

> **fetchRoleAccount**(`user`, `configPda`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

fetch role account data

#### Parameters

• **user**: `PublicKey`

user address

• **configPda?**: `PublicKey`

config account PDA

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

roleAccount

#### Defined in

otc/otc.solana.ts:99

***

### fetchTradeAccount()

> **fetchTradeAccount**(`marketId`, `tradeId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

fetch trade account data

#### Parameters

• **marketId**: `BN`

id of market

• **tradeId**: `BN`

id of trade

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

trade account

#### Defined in

otc/otc.solana.ts:152

***

### fillOrder()

> **fillOrder**(`data`): `Promise`\<`Transaction`\>

fill open order

#### Parameters

• **data**

• **data.amount**: `BN`

• **data.marketId**: `BN`

• **data.orderId**: `BN`

• **data.tradeId?**: `any`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:653

***

### initialize()

> **initialize**(`authority`, `feeWallet`): `Promise`\<`Transaction`\>

initialize program with authority

#### Parameters

• **authority**: `PublicKey`

authority address

• **feeWallet**: `PublicKey`

fee wallet address

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:194

***

### matchOrder()

> **matchOrder**(`data`): `Promise`\<`Transaction`\>

match two open order

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.orderBuyId**: `BN`

• **data.orderSellId**: `BN`

• **data.tradeId?**: `any`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:744

***

### newMarket()

> **newMarket**(`data`): `Promise`\<`Transaction`\>

create new market by operator only

#### Parameters

• **data**

• **data.exToken**: `PublicKey`

• **data.marketId**: `BN`

• **data.minTrade**: `BN`

• **data.operator**: `PublicKey`

• **data.pledgeRate**: `BN`

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:272

***

### parseError()

> **parseError**(`err`): `any`

#### Parameters

• **err**: `any`

#### Returns

`any`

#### Defined in

otc/otc.solana.ts:1064

***

### removeEventListener()

> **removeEventListener**(`eventId`): `void`

#### Parameters

• **eventId**: `number`

#### Returns

`void`

#### Defined in

otc/otc.solana.ts:1128

***

### setRole()

> **setRole**(`data`): `Promise`\<`Transaction`\>

set role for user account by operator only

#### Parameters

• **data**

• **data.authority**: `PublicKey`

• **data.role**: `DecodeEnum`\<`object`, `EmptyDefined`\>

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:216

***

### settleCanceled()

> **settleCanceled**(`data`): `Promise`\<`Transaction`\>

settle canceled trade

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.tradeId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:926

***

### settleFilled()

> **settleFilled**(`data`): `Promise`\<`Transaction`\>

settle filled trade

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.tradeId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:808

***

### settleMarket()

> **settleMarket**(`data`): `Promise`\<`Transaction`\>

settle market by operator only

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.operator**: `PublicKey`

• **data.settleDuration**: `BN`

• **data.settleRate**: `BN`

• **data.settleTime**: `BN`

• **data.token**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

Promise<Transaction>

#### Defined in

otc/otc.solana.ts:391

***

### updateConfigAccount()

> **updateConfigAccount**(`data`): `Promise`\<`Transaction`\>

update program config by operator only

#### Parameters

• **data**

• **data.feeRefund?**: `any`

• **data.feeSettle?**: `any`

• **data.feeWallet?**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:245

***

### updateMarket()

> **updateMarket**(`data`): `Promise`\<`Transaction`\>

update market data by operator only

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.operator**: `PublicKey`

• **data.updateData**

• **data.updateData.pledgeRate?**: `any`

• **data.updateData.settleDuration?**: `any`

• **data.updateData.settleRate?**: `any`

• **data.updateData.settleTime?**: `any`

• **data.updateData.status?**: `DecodeEnum`\<`object`, `EmptyDefined`\>

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:340
