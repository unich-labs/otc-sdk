[**@unich-lab/otc-sdk**](../README.md) • **Docs**

***

[@unich-lab/otc-sdk](../globals.md) / OtcSolana

# Class: OtcSolana

## Implements

- `IOtc`\<`PublicKey`, `BN`, `Transaction`\>

## Constructors

### new OtcSolana()

> **new OtcSolana**(`connection`, `programId`): [`OtcSolana`](OtcSolana.md)

#### Parameters

• **connection**: `Connection`

• **programId**: `string`

#### Returns

[`OtcSolana`](OtcSolana.md)

#### Defined in

otc/otc.solana.ts:56

## Properties

### configAccountData

> **configAccountData**: `DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>

#### Type declaration

##### fields

> **fields**: [`object`, `object`, `object`, `object`, `object`, `object`, `object`, `object`]

##### kind

> **kind**: `"struct"`

#### Defined in

otc/otc.solana.ts:54

***

### configAccountPubKey

> **configAccountPubKey**: `PublicKey`

#### Defined in

otc/otc.solana.ts:52

***

### connection

> **connection**: `Connection`

#### Defined in

otc/otc.solana.ts:48

***

### program

> **program**: `Program`\<`Otc`\>

#### Defined in

otc/otc.solana.ts:49

## Methods

### addOtcToken()

> **addOtcToken**(`operator`, `tokenId`, `pledgeRate`): `Promise`\<`Transaction`\>

#### Parameters

• **operator**: `PublicKey`

• **tokenId**: `BN`

• **pledgeRate**: `BN`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:235

***

### bootstrap()

> **bootstrap**(`authority`): `Promise`\<`void`\>

#### Parameters

• **authority**: `PublicKey`

#### Returns

`Promise`\<`void`\>

#### Defined in

otc/otc.solana.ts:64

***

### createConfigAccount()

> **createConfigAccount**(`signer`, `feeWallet`): `Promise`\<`Transaction`\>

#### Parameters

• **signer**: `PublicKey`

• **feeWallet**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:161

***

### createOrder()

> **createOrder**(`orderId`, `user`, `orderType`, `exToken`, `tokenId`, `amount`, `value`, `slippage`, `isBid`): `Promise`\<`Transaction`\>

#### Parameters

• **orderId**: `BN`

• **user**: `PublicKey`

• **orderType**: `DecodeEnum`\<`object`, `EmptyDefined`\>

• **exToken**: `PublicKey`

• **tokenId**: `BN`

• **amount**: `BN`

• **value**: `BN`

• **slippage**: `BN`

• **isBid**: `boolean`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:348

***

### fetchConfigAccount()

> **fetchConfigAccount**(`configAccountPubKey`, `commitment`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **configAccountPubKey**: `PublicKey`

• **commitment?**: `Commitment`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:72

***

### fetchExTokenAccount()

> **fetchExTokenAccount**(`token`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **token**: `PublicKey`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:111

***

### fetchLastCashoutId()

> **fetchLastCashoutId**(): `Promise`\<`BN`\>

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:155

***

### fetchLastOrderId()

> **fetchLastOrderId**(): `Promise`\<`BN`\>

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:143

***

### fetchLastTradeId()

> **fetchLastTradeId**(): `Promise`\<`BN`\>

#### Returns

`Promise`\<`BN`\>

#### Defined in

otc/otc.solana.ts:149

***

### fetchOrderAccount()

> **fetchOrderAccount**(`orderId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **orderId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:123

***

### fetchOtcTokenAccount()

> **fetchOtcTokenAccount**(`tokenId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **tokenId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:99

***

### fetchRoleAccount()

> **fetchRoleAccount**(`user`, `configAccountPubKey`?): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **user**: `PublicKey`

• **configAccountPubKey?**: `PublicKey`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:83

***

### fetchTradeAccount()

> **fetchTradeAccount**(`tradeId`): `Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Parameters

• **tradeId**: `BN`

#### Returns

`Promise`\<`DecodeStruct`\<`object`, `DecodedHelper`\<[`object`, `object`, `object`, `object`, `object`], `EmptyDefined`\>\>\>

#### Defined in

otc/otc.solana.ts:133

***

### fillOrder()

> **fillOrder**(`user`, `exToken`, `orderId`, `tradeId`, `amount`): `Promise`\<`Transaction`\>

#### Parameters

• **user**: `PublicKey`

• **exToken**: `PublicKey`

• **orderId**: `BN`

• **tradeId**: `BN`

• **amount**: `BN`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:475

***

### init()

> **init**(`authority`, `feeWallet`): `Promise`\<`Transaction`\>

#### Parameters

• **authority**: `PublicKey`

• **feeWallet**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:201

***

### matchOrder()

> **matchOrder**(`user`, `tradeBuyId`, `tradeSellId`, `tradeId`): `Promise`\<`Transaction`\>

#### Parameters

• **user**: `PublicKey`

• **tradeBuyId**: `BN`

• **tradeSellId**: `BN`

• **tradeId**: `BN`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:436

***

### parseError()

> **parseError**(`err`): `any`

#### Parameters

• **err**: `any`

#### Returns

`any`

#### Defined in

otc/otc.solana.ts:691

***

### setExToken()

> **setExToken**(`operator`, `token`, `feeExTokenAccount`, `tokenProgram`, `is_accepted`): `Promise`\<`Transaction`\>

#### Parameters

• **operator**: `PublicKey`

• **token**: `PublicKey`

• **feeExTokenAccount**: `PublicKey`

• **tokenProgram**: `PublicKey`

• **is\_accepted**: `boolean`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:306

***

### setRole()

> **setRole**(`signer`, `user`, `role`): `Promise`\<`Transaction`\>

#### Parameters

• **signer**: `PublicKey`

• **user**: `PublicKey`

• **role**: `DecodeEnum`\<`object`, `EmptyDefined`\>

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:179

***

### settleFilled()

> **settleFilled**(`signer`, `orderId`, `tradeId`): `Promise`\<`Transaction`\>

#### Parameters

• **signer**: `PublicKey`

• **orderId**: `BN`

• **tradeId**: `BN`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:536

***

### settleOtcToken()

> **settleOtcToken**(`operator`, `tokenId`, `otcToken`, `settleRate`, `settleDuration`, `feeOtcTokenAccount`, `tokenProgram`): `Promise`\<`Transaction`\>

#### Parameters

• **operator**: `PublicKey`

• **tokenId**: `BN`

• **otcToken**: `PublicKey`

• **settleRate**: `BN`

• **settleDuration**: `BN`

• **feeOtcTokenAccount**: `PublicKey`

• **tokenProgram**: `PublicKey`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

otc/otc.solana.ts:262

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

otc/otc.solana.ts:217
