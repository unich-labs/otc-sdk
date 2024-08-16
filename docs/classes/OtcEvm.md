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

***

### provider

> `get` **provider**(): `Provider`

#### Returns

`Provider`

#### Defined in

otc/otc.evm.ts:43

## Methods

### address()

> **address**(): `string`

Get OTC contract address

#### Returns

`string`

OTC contract address

#### Defined in

otc/otc.evm.ts:57

***

### approve()

> **approve**(`marketId`, `amount`): `Promise`\<`ContractTransaction`\>

Approve ERC20 for OTC

#### Parameters

• **marketId**: `string`

id of market

• **amount**: `bigint`

approved amount

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:278

***

### buyCashOut()

> **buyCashOut**(`cashOutId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **cashOutId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:446

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

otc/otc.evm.ts:405

***

### cashOutTrades()

> **cashOutTrades**(`data`): `Promise`\<`ContractTransaction`\>

Cash out trades with ids

#### Parameters

• **data**

• **data.amount**: `bigint`

• **data.price**: `number`

• **data.tradeId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:434

***

### changeOrder()

> **changeOrder**(`data`): `Promise`\<`ContractTransaction`\>

Change amount and price of open order by order owner

#### Parameters

• **data**

• **data.amount**: `bigint`

• **data.orderId**: `bigint`

• **data.price**: `number`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:359

***

### config()

> **config**(): `Promise`\<[`IOtcConfig`](../interfaces/IOtcConfig.md)\<`bigint`, \`0x$\{string\}\`\>\>

Get OTC contract config

#### Returns

`Promise`\<[`IOtcConfig`](../interfaces/IOtcConfig.md)\<`bigint`, \`0x$\{string\}\`\>\>

OTC contract config

#### Defined in

otc/otc.evm.ts:65

***

### createOrder()

> **createOrder**(`data`): `Promise`\<`ContractTransaction`\>

Create a new order

#### Parameters

• **data**

• **data.amount**: `bigint`

• **data.isBid**: `boolean`

• **data.marketId**: `string`

• **data.offerType**: [`EOrderType`](../enumerations/EOrderType.md)

• **data.price**: `number`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:300

***

### fillOffer()

> **fillOffer**(`data`): `Promise`\<`ContractTransaction`\>

Fill open order

#### Parameters

• **data**

• **data.amount**: `bigint`

• **data.orderId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:377

***

### forceCancelOrder()

> **forceCancelOrder**(`orderId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:262

***

### getFillOrderCollateral()

> **getFillOrderCollateral**(`orderId`, `amount`): `Promise`\<`bigint`\>

#### Parameters

• **orderId**: `bigint`

• **amount**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:162

***

### getLastOrderId()

> **getLastOrderId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:135

***

### getLastTradeId()

> **getLastTradeId**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:139

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

otc/otc.evm.ts:79

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

otc/otc.evm.ts:100

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

otc/otc.evm.ts:177

***

### getSqrtX96()

> **getSqrtX96**(`price`): `BigInt`

#### Parameters

• **price**: `number`

#### Returns

`BigInt`

#### Defined in

otc/otc.evm.ts:143

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

otc/otc.evm.ts:119

***

### getValueFromPrice()

> **getValueFromPrice**(`amount`, `price`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **price**: `number`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:147

***

### getValueFromSqrtPriceX96()

> **getValueFromSqrtPriceX96**(`amount`, `sqrtPriceX96`): `Promise`\<`bigint`\>

#### Parameters

• **amount**: `bigint`

• **sqrtPriceX96**: `bigint`

#### Returns

`Promise`\<`bigint`\>

#### Defined in

otc/otc.evm.ts:155

***

### marketForceCancelSettlePhase()

> **marketForceCancelSettlePhase**(`marketId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:232

***

### marketToggleActivation()

> **marketToggleActivation**(`marketId`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:226

***

### matchBidOrder()

> **matchBidOrder**(`data`): `Promise`\<`ContractTransaction`\>

Accept bid order by order owner

#### Parameters

• **data**

• **data.bidOrderId**: `bigint`

• **data.orderId**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:342

***

### newMarket()

> **newMarket**(`data`): `Promise`\<`ContractTransaction`\>

Add new market by operator

#### Parameters

• **data**

• **data.exToken**: \`0x$\{string\}\`

• **data.marketId**: `string`

• **data.minTrade**: `bigint`

• **data.pledgeRate**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

Promise<ContractTransaction>

#### Defined in

otc/otc.evm.ts:196

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

otc/otc.evm.ts:456

***

### settle2Steps()

> **settle2Steps**(`orderId`, `hash`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **orderId**: `bigint`

• **hash**: `string`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:266

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

otc/otc.evm.ts:423

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

otc/otc.evm.ts:414

***

### settleMarket()

> **settleMarket**(`data`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **data**

• **data.marketId**: `string`

• **data.settleDuration**: `bigint`

• **data.settleRate**: `bigint`

• **data.settleTime**: `bigint`

• **data.tokenAddress**: \`0x$\{string\}\`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:210

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

otc/otc.evm.ts:250

***

### updateSettleDuration()

> **updateSettleDuration**(`marketId`, `settleDuration`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **marketId**: `string`

• **settleDuration**: `bigint`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

otc/otc.evm.ts:240
