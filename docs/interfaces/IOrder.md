[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / IOrder

# Interface: IOrder\<BN, Address\>

Order interface

## Type Parameters

• **BN**

• **Address**

## Properties

### amount

> **amount**: `BN`

order amount

#### Defined in

otc/otc.interface.ts:105

***

### filledAmount

> **filledAmount**: `BN`

filled amount of order

#### Defined in

otc/otc.interface.ts:115

***

### isBid

> **isBid**: `boolean`

is bid order

#### Defined in

otc/otc.interface.ts:100

***

### marketId

> **marketId**: `string`

id of market

#### Defined in

otc/otc.interface.ts:90

***

### orderBy

> **orderBy**: `Address`

order owner address

#### Defined in

otc/otc.interface.ts:125

***

### orderType

> **orderType**: [`EOrderType`](../enumerations/EOrderType.md)

order type (buy or sell)

#### Defined in

otc/otc.interface.ts:95

***

### sqrtPriceX96

> **sqrtPriceX96**: `BN`

sqrtX96 price of order

#### Defined in

otc/otc.interface.ts:110

***

### status

> **status**: [`EOrderStatus`](../enumerations/EOrderStatus.md)

order status

#### Defined in

otc/otc.interface.ts:120
