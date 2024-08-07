[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / OtcEvm

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

### addOtcToken()

> **addOtcToken**(`tokenId`, `pledgeRate`): `Promise`\<`ContractTransaction`\>

Add new OTC token by operator

#### Parameters

• **tokenId**: `string`

id of OTC token

• **pledgeRate**: `bigint`

pledge rate of OTC token

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:169

***

### address()

> **address**(): `string`

Get OTC contract address

#### Returns

`string`

OTC contract address

#### Defined in

otc/otc.evm.ts:55

***

### buyCashOut()

> **buyCashOut**(`cashOutId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **cashOutId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:411

***

### cancelOrder()

> **cancelOrder**(`orderId`): `Promise`\<`ContractTransaction`\>

Cancel open order by order owner

#### Parameters

• **orderId**: `bigint`

id of order

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:369

***

### cashOutTrades()

> **cashOutTrades**(`tradeIds`, `amount`, `price`): `Promise`\<`ContractTransaction`\>

Cash out trades with ids

#### Parameters

• **tradeIds**: `bigint`[]

list id of trade that is cash out

• **amount**: `bigint`

cash out amount

• **price**: `number`

cash out price

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:399

***

### changeOrder()

> **changeOrder**(`orderId`, `amount`, `price`): `Promise`\<`ContractTransaction`\>

Change amount and price of open order by order owner

#### Parameters

• **orderId**: `bigint`

id of order

• **amount**: `bigint`

updated amount

• **price**: `number`

updated price

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:326

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

### createOrder()

> **createOrder**(`offerType`, `tokenId`, `amount`, `price`, `exToken`, `slippage`, `isBid`): `Promise`\<`ContractTransaction`\>

Create a new order

#### Parameters

• **offerType**: [`EOrderType`](../enumerations/EOrderType.md)

order type

• **tokenId**: `string`

id of otc token

• **amount**: `bigint`

order amount

• **price**: `number`

order price

• **exToken**: \`0x$\{string\}\`

exchange token contract address, if exToken == 0x0000000000000000000000000000000000000000 => createOrderETH, else createOrder

• **slippage**: `bigint`

slippage of order

• **isBid**: `boolean`

is bid order

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:256

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

otc/otc.evm.ts:344

***

### forceCancelOrder()

> **forceCancelOrder**(`orderId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:235

***

### getFillOrderCollateral()

> **getFillOrderCollateral**(`orderId`, `amount`): `Promise`\<`bigint`\>

#### Parameters

• **orderId**: `bigint`

• **amount**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:138

***

### getLastOrderId()

> **getLastOrderId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:111

***

### getLastTradeId()

> **getLastTradeId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:115

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

otc/otc.evm.ts:77

***

### getOrderCollateral()

> **getOrderCollateral**(`tokenId`, `amount`, `price`): `Promise`\<`bigint`\>

#### Parameters

• **tokenId**: `string`

• **amount**: `bigint`

• **price**: `number`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:148

***

### getSqrtX96()

> **getSqrtX96**(`price`): `BigInt`

#### Parameters

• **price**: `number`

#### Returns

`BigInt`

#### Defined in

otc/otc.evm.ts:119

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

otc/otc.evm.ts:107

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

otc/otc.evm.ts:98

***

### getValueFromPrice()

> **getValueFromPrice**(`amount`, `price`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **price**: `number`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:123

***

### getValueFromSqrtPriceX96()

> **getValueFromSqrtPriceX96**(`amount`, `sqrtPriceX96`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **sqrtPriceX96**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:131

***

### matchBidOrder()

> **matchBidOrder**(`bidOrderId`, `orderId`): `Promise`\<`ContractTransaction`\>

Accept bid order by order owner

#### Parameters

• **bidOrderId**: `bigint`

id of bid order

• **orderId**: `bigint`

id of matched order

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:309

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

otc/otc.evm.ts:421

***

### setAcceptedTokens()

> **setAcceptedTokens**(`tokenAddresses`, `isAccepted`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **tokenAddresses**: \`0x$\{string\}\`[]

• **isAccepted**: `boolean`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:225

***

### settle2Steps()

> **settle2Steps**(`orderId`, `hash`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

• **hash**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:239

***

### settleCancelled()

> **settleCancelled**(`tradeId`): `Promise`\<`ContractTransaction`\>

Cancel unfulfilled settled trade order by buyer or seller of trade order to refund assets

#### Parameters

• **tradeId**: `bigint`

id of trade order that is canceled

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:388

***

### settleFilled()

> **settleFilled**(`tradeId`): `Promise`\<`ContractTransaction`\>

Settle trade order by buyer or seller of trade order

#### Parameters

• **tradeId**: `bigint`

id of trade order that is settled

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:378

***

### tokenForceCancelSettlePhase()

> **tokenForceCancelSettlePhase**(`tokenId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **tokenId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:197

***

### tokenToSettlePhase()

> **tokenToSettlePhase**(`tokenId`, `tokenAddress`, `settleRate`, `settleDuration`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **tokenId**: `string`

• **tokenAddress**: \`0x$\{string\}\`

• **settleRate**: `bigint`

• **settleDuration**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:179

***

### tokenToggleActivation()

> **tokenToggleActivation**(`tokenId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **tokenId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:193

***

### updateConfig()

> **updateConfig**(`feeWallet`, `feeSettle`, `feeRefund`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **feeWallet**: \`0x$\{string\}\`

• **feeSettle**: `bigint`

• **feeRefund**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:213

***

### updateSettleDuration()

> **updateSettleDuration**(`tokenId`, `settleDuration`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **tokenId**: `string`

• **settleDuration**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:203
