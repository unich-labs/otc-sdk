[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / OtcEvm

# Class: OtcEvm

## Implements

- [`IOtc`](../interfaces/IOtc.md)\<[`EvmAddress`](../type-aliases/EvmAddress.md), `bigint`, `ContractTransaction`\>

## Constructors

### new OtcEvm()

> **new OtcEvm**(`chainId`, `providers`?): [`OtcEvm`](OtcEvm.md)

#### Parameters

• **chainId**: [`CHAIN_ID`](../enumerations/CHAIN_ID.md)

• **providers?**: `Provider`[]

#### Returns

[`OtcEvm`](OtcEvm.md)

#### Defined in

otc/otc.evm.ts:28

## Properties

### \_contract

> `protected` **\_contract**: `Contract`

#### Defined in

otc/otc.evm.ts:25

***

### \_contractAddress

> `protected` **\_contractAddress**: \`0x$\{string\}\`

#### Defined in

otc/otc.evm.ts:24

***

### \_network

> `protected` **\_network**: [`EvmNetwork`](EvmNetwork.md)

#### Defined in

otc/otc.evm.ts:26

## Accessors

### contract

> `get` **contract**(): `Contract`

> `set` **contract**(`contractAddress`): `void`

#### Parameters

• **contractAddress**: \`0x$\{string\}\`

#### Returns

`Contract`

#### Defined in

otc/otc.evm.ts:39

## Methods

### address()

> **address**(): `string`

Get OTC contract address

#### Returns

`string`

OTC contract address

#### Defined in

otc/otc.evm.ts:53

***

### buyCashOut()

> **buyCashOut**(`cashOutId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **cashOutId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:410

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

otc/otc.evm.ts:368

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

otc/otc.evm.ts:398

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

otc/otc.evm.ts:325

***

### config()

> **config**(): `Promise`\<[`IOtcConfig`](../interfaces/IOtcConfig.md)\<`bigint`, \`0x$\{string\}\`\>\>

Get OTC contract config

#### Returns

`Promise`\<[`IOtcConfig`](../interfaces/IOtcConfig.md)\<`bigint`, \`0x$\{string\}\`\>\>

OTC contract config

#### Defined in

otc/otc.evm.ts:61

***

### createOrder()

> **createOrder**(`offerType`, `marketId`, `amount`, `price`, `isBid`): `Promise`\<`ContractTransaction`\>

Create a new order

#### Parameters

• **offerType**: [`EOrderType`](../enumerations/EOrderType.md)

order type

• **marketId**: `string`

• **amount**: `bigint`

order amount

• **price**: `number`

order price

• **isBid**: `boolean`

is bid order

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:273

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

otc/otc.evm.ts:343

***

### forceCancelOrder()

> **forceCancelOrder**(`orderId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:252

***

### getFillOrderCollateral()

> **getFillOrderCollateral**(`orderId`, `amount`): `Promise`\<`bigint`\>

#### Parameters

• **orderId**: `bigint`

• **amount**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:156

***

### getLastOrderId()

> **getLastOrderId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:129

***

### getLastTradeId()

> **getLastTradeId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:133

***

### getMarket()

> **getMarket**(`marketId`): `Promise`\<[`IMarket`](../interfaces/IMarket.md)\<`bigint`, \`0x$\{string\}\`\>\>

Get OTC token info

#### Parameters

• **marketId**: `string`

id of token

#### Returns

`Promise`\<[`IMarket`](../interfaces/IMarket.md)\<`bigint`, \`0x$\{string\}\`\>\>

Promise<IMarket<bigint, EvmAddress>>

#### Defined in

otc/otc.evm.ts:75

***

### getOrder()

> **getOrder**(`orderId`): `Promise`\<[`IOrder`](../interfaces/IOrder.md)\<`bigint`, \`0x$\{string\}\`\>\>

Get order info

#### Parameters

• **orderId**: `bigint`

id of order

#### Returns

`Promise`\<[`IOrder`](../interfaces/IOrder.md)\<`bigint`, \`0x$\{string\}\`\>\>

IOrder

#### Defined in

otc/otc.evm.ts:94

***

### getOrderCollateral()

> **getOrderCollateral**(`marketId`, `amount`, `price`): `Promise`\<`bigint`\>

#### Parameters

• **marketId**: `string`

• **amount**: `bigint`

• **price**: `number`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:167

***

### getSqrtX96()

> **getSqrtX96**(`price`): `BigInt`

#### Parameters

• **price**: `number`

#### Returns

`BigInt`

#### Defined in

otc/otc.evm.ts:137

***

### getTrade()

> **getTrade**(`tradeId`): `Promise`\<[`ITrade`](../interfaces/ITrade.md)\<`bigint`, \`0x$\{string\}\`\>\>

Get trade info

#### Parameters

• **tradeId**: `bigint`

id of trade

#### Returns

`Promise`\<[`ITrade`](../interfaces/ITrade.md)\<`bigint`, \`0x$\{string\}\`\>\>

Promise<ITrade<bigint, EvmAddress>>

#### Defined in

otc/otc.evm.ts:113

***

### getValueFromPrice()

> **getValueFromPrice**(`amount`, `price`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **price**: `number`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:141

***

### getValueFromSqrtPriceX96()

> **getValueFromSqrtPriceX96**(`amount`, `sqrtPriceX96`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **sqrtPriceX96**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:149

***

### marketForceCancelSettlePhase()

> **marketForceCancelSettlePhase**(`marketId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:222

***

### marketToSettlePhase()

> **marketToSettlePhase**(`marketId`, `tokenAddress`, `settleRate`, `settleDuration`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

• **tokenAddress**: \`0x$\{string\}\`

• **settleRate**: `bigint`

• **settleDuration**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:202

***

### marketToggleActivation()

> **marketToggleActivation**(`marketId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:216

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

otc/otc.evm.ts:308

***

### newMarket()

> **newMarket**(`marketId`, `exToken`, `pledgeRate`, `minTrade`): `Promise`\<`ContractTransaction`\>

Add new market by operator

#### Parameters

• **marketId**: `string`

• **exToken**: \`0x$\{string\}\`

• **pledgeRate**: `bigint`

pledge rate of OTC token

• **minTrade**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:188

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

otc/otc.evm.ts:420

***

### settle2Steps()

> **settle2Steps**(`orderId`, `hash`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

• **hash**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:256

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

otc/otc.evm.ts:387

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

otc/otc.evm.ts:377

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

otc/otc.evm.ts:240

***

### updateSettleDuration()

> **updateSettleDuration**(`marketId`, `settleDuration`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

• **settleDuration**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:230
