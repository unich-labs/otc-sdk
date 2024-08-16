[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / OtcSolana

# Class: OtcSolana

## Implements

- [`IOtc`](../interfaces/IOtc.md)\<`PublicKey`, `BN`, `Transaction`\>

## Constructors

### new OtcSolana()

> **new OtcSolana**(`connection`, `program`): [`OtcSolana`](OtcSolana.md)

#### Parameters

• **connection**: `Connection`

• **program**: `PublicKey`

#### Returns

[`OtcSolana`](OtcSolana.md)

#### Defined in

otc/otc.solana.ts:37

## Properties

### configAccountData

> **configAccountData**: `DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>

#### Type declaration

##### fields

> **fields**: [`object`, `object`, `object`, `object`, `object`, `object`]

##### kind

> **kind**: `"struct"`

#### Defined in

otc/otc.solana.ts:35

***

### configPda

> **configPda**: `PublicKey`

#### Defined in

otc/otc.solana.ts:33

***

### connection

> **connection**: `Connection`

#### Defined in

otc/otc.solana.ts:29

***

### program

> **program**: `Program`\<`Otc`\>

#### Defined in

otc/otc.solana.ts:30

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

otc/otc.solana.ts:886

***

### bootstrap()

> **bootstrap**(`authority`): `Promise`\<`void`\>

#### Parameters

• **authority**: `PublicKey`

#### Returns

`Promise`\<`void`\>

#### Defined in

otc/otc.solana.ts:45

***

### cancelOrder()

> **cancelOrder**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.orderId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:414

***

### createOrder()

> **createOrder**(`data`): `Promise`\<`Transaction`\>

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

#### Defined in

otc/otc.solana.ts:339

***

### fetchConfigAccount()

> **fetchConfigAccount**(`configPda`, `commitment`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **configPda**: `PublicKey`

• **commitment?**: `Commitment`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:50

***

### fetchLastCashoutId()

> **fetchLastCashoutId**(`marketId`): `Promise`\<`BN`\>

#### Parameters

• **marketId**: `BN`

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:114

***

### fetchLastOrderId()

> **fetchLastOrderId**(`marketId`): `Promise`\<`BN`\>

#### Parameters

• **marketId**: `BN`

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:106

***

### fetchLastTradeId()

> **fetchLastTradeId**(`marketId`): `Promise`\<`BN`\>

#### Parameters

• **marketId**: `BN`

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:110

***

### fetchMarketAccount()

> **fetchMarketAccount**(`marketId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **marketId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:80

***

### fetchOrderAccount()

> **fetchOrderAccount**(`marketId`, `orderId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **marketId**: `BN`

• **orderId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:88

***

### fetchRoleAccount()

> **fetchRoleAccount**(`user`, `configPda`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **user**: `PublicKey`

• **configPda?**: `PublicKey`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:61

***

### fetchTradeAccount()

> **fetchTradeAccount**(`marketId`, `tradeId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **marketId**: `BN`

• **tradeId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:97

***

### fillOrder()

> **fillOrder**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.amount**: `BN`

• **data.marketId**: `BN`

• **data.orderId**: `BN`

• **data.tradeId?**: `any`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:479

***

### initialize()

> **initialize**(`authority`, `feeWallet`): `Promise`\<`Transaction`\>

#### Parameters

• **authority**: `PublicKey`

• **feeWallet**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:118

***

### matchOrder()

> **matchOrder**(`data`): `Promise`\<`Transaction`\>

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

otc/otc.solana.ts:561

***

### newMarket()

> **newMarket**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.exToken**: `PublicKey`

• **data.marketId**: `BN`

• **data.minTrade**: `BN`

• **data.operator**: `PublicKey`

• **data.pledgeRate**: `BN`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:173

***

### parseError()

> **parseError**(`err`): `any`

#### Parameters

• **err**: `any`

#### Returns

`any`

#### Defined in

otc/otc.solana.ts:842

***

### prepareTransaction()

> **prepareTransaction**(`tx`): `void`

#### Parameters

• **tx**: `Transaction`

#### Returns

`void`

#### Defined in

otc/otc.solana.ts:832

***

### removeEventListener()

> **removeEventListener**(`eventId`): `void`

#### Parameters

• **eventId**: `number`

#### Returns

`void`

#### Defined in

otc/otc.solana.ts:939

***

### setRole()

> **setRole**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.authority**: `PublicKey`

• **data.role**: `DecodeEnum`\<`object`, `EmptyDefined`\>

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:133

***

### settleCanceled()

> **settleCanceled**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.tradeId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:729

***

### settleFilled()

> **settleFilled**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.marketId**: `BN`

• **data.tradeId**: `BN`

• **data.user**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:618

***

### settleMarket()

> **settleMarket**(`data`): `Promise`\<`Transaction`\>

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

#### Defined in

otc/otc.solana.ts:274

***

### updateConfigAccount()

> **updateConfigAccount**(`data`): `Promise`\<`Transaction`\>

#### Parameters

• **data**

• **data.feeRefund?**: `any`

• **data.feeSettle?**: `any`

• **data.feeWallet?**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:155

***

### updateMarket()

> **updateMarket**(`data`): `Promise`\<`Transaction`\>

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

otc/otc.solana.ts:233
