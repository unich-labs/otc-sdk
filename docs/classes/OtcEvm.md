[**@unich-lab/otc-sdk**](../README.md) • **Docs**

***

[@unich-lab/otc-sdk](../globals.md) / OtcEvm

# Class: OtcEvm

## Implements

- `IOtc`\<[`EvmAddress`](../type-aliases/EvmAddress.md), `bigint`, `ContractTransaction`\>

## Constructors

### new OtcEvm()

> **new OtcEvm**(`chainId`, `providers`?): [`OtcEvm`](OtcEvm.md)

#### Parameters

• **chainId**: [`CHAIN_ID`](../enumerations/CHAIN_ID.md)

• **providers?**: `Provider`[]

#### Returns

[`OtcEvm`](OtcEvm.md)

#### Defined in

otc/otc.evm.ts:30

## Properties

### \_contract

> `protected` **\_contract**: `Contract`

#### Defined in

otc/otc.evm.ts:27

***

### \_contractAddress

> `protected` **\_contractAddress**: \`0x$\{string\}\`

#### Defined in

otc/otc.evm.ts:26

***

### \_network

> `protected` **\_network**: [`EvmNetwork`](EvmNetwork.md)

#### Defined in

otc/otc.evm.ts:28

## Accessors

### contract

> `get` **contract**(): `Contract`

> `set` **contract**(`contractAddress`): `void`

#### Parameters

• **contractAddress**: \`0x$\{string\}\`

#### Returns

`Contract`

#### Defined in

otc/otc.evm.ts:41

## Methods

### address()

> **address**(): `string`

Get OTC contract address

#### Returns

`string`

OTC contract address

#### Defined in

otc/otc.evm.ts:55

***

### cashoutOrders()

> **cashoutOrders**(`tradeIds`, `amount`, `value`): `Promise`\<`ContractTransaction`\>

Cashout trades with ids

#### Parameters

• **tradeIds**: `bigint`[]

ids of trades

• **amount**: `bigint`

cashout amount

• **value**: `bigint`

cashout value

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:264

***

### config()

> **config**(): `Promise`\<`IOtcConfig`\<`bigint`, \`0x$\{string\}\`\>\>

Get OTC contract config

#### Returns

`Promise`\<`IOtcConfig`\<`bigint`, \`0x$\{string\}\`\>\>

OTC contract config

#### Defined in

otc/otc.evm.ts:63

***

### createOffer()

> **createOffer**(`offerType`, `pledgeRate`, `tokenId`, `amount`, `price`, `exToken`, `slippage`, `isBid`): `Promise`\<`ContractTransaction`\>

Create a new order

#### Parameters

• **offerType**: [`EOrderType`](../enumerations/EOrderType.md)

order type

• **pledgeRate**: `bigint`

pledge rate of OTC token

• **tokenId**: `string`

id of otc token

• **amount**: `bigint`

order amount

• **price**: `number`

order price

• **exToken**: \`0x$\{string\}\`

exchange token contract address

• **slippage**: `bigint`

slippage of order

• **isBid**: `boolean`

is bid order

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:183

***

### createOtcToken()

> **createOtcToken**(`tokenId`, `settleDuration`): `Promise`\<`ContractTransaction`\>

Add a new OTC token

#### Parameters

• **tokenId**: `string`

id of OTC token

• **settleDuration**: `number`

settle duration of otc token

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:142

***

### fillOffer()

> **fillOffer**(`orderId`, `amount`): `Promise`\<`ContractTransaction`\>

Fill open order

#### Parameters

• **orderId**: `bigint`

id of order

• **amount**: `bigint`

fill amount

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:237

***

### getFillOrderValue()

> **getFillOrderValue**(`orderId`, `amount`): `Promise`\<`bigint`\>

#### Parameters

• **orderId**: `bigint`

• **amount**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:125

***

### getLastOrderId()

> **getLastOrderId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:117

***

### getLastTradeId()

> **getLastTradeId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:121

***

### getOfferCollateral()

> **getOfferCollateral**(`value`): `Promise`\<`bigint`\>

#### Parameters

• **value**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:73

***

### getOrder()

> **getOrder**(`orderId`): `Promise`\<`IOrder`\<`bigint`, \`0x$\{string\}\`\>\>

Get order info

#### Parameters

• **orderId**: `bigint`

id of order

#### Returns

`Promise`\<`IOrder`\<`bigint`, \`0x$\{string\}\`\>\>

IOrder

#### Defined in

otc/otc.evm.ts:83

***

### getToken()

> **getToken**(`tokenId`): `Promise`\<`any`\>

Get OTC token info

#### Parameters

• **tokenId**: `string`

id of token

#### Returns

`Promise`\<`any`\>

OTC token info

#### Defined in

otc/otc.evm.ts:113

***

### getTrade()

> **getTrade**(`tradeId`): `Promise`\<`any`\>

Get trade info

#### Parameters

• **tradeId**: `bigint`

id of trade

#### Returns

`Promise`\<`any`\>

Trade info

#### Defined in

otc/otc.evm.ts:104

***

### parseLogs()

> **parseLogs**(`logs`): `Promise`\<(`undefined` \| `Result`)[]\>

Parse logs of OTC contract

#### Parameters

• **logs**: `Log`[]

transaction logs

#### Returns

`Promise`\<(`undefined` \| `Result`)[]\>

Event info

#### Defined in

otc/otc.evm.ts:281

***

### settleOtcToken()

> **settleOtcToken**(`tokenId`, `tokenAddress`, `settleRate`): `Promise`\<`ContractTransaction`\>

Settle OTC token

#### Parameters

• **tokenId**: `string`

id of OTC token

• **tokenAddress**: \`0x$\{string\}\`

contract address of OTC token

• **settleRate**: `bigint`

settle rate of OTC token

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:159
