[**otc-sdk**](../README.md) • **Docs**

***

[otc-sdk](../README.md) / EvmNetwork

# Class: EvmNetwork

## Extends

- `Network`\<`ethers.Provider`, `ethers.Signer`\>

## Constructors

### new EvmNetwork()

> **new EvmNetwork**(`providers`): [`EvmNetwork`](EvmNetwork.md)

#### Parameters

• **providers**: `Provider`[]

#### Returns

[`EvmNetwork`](EvmNetwork.md)

#### Overrides

`Network<ethers.Provider, ethers.Signer>.constructor`

#### Defined in

networks/network.evm.ts:5

## Properties

### \_providers

> `protected` **\_providers**: `Provider`[]

#### Inherited from

`Network._providers`

#### Defined in

networks/network.abstract.ts:4

***

### \_signer

> `protected` **\_signer**: `undefined` \| `Signer`

#### Inherited from

`Network._signer`

#### Defined in

networks/network.abstract.ts:5

## Accessors

### provider

> `get` **provider**(): `P`

#### Returns

`P`

#### Inherited from

`Network.provider`

#### Defined in

networks/network.abstract.ts:19

***

### signer

> `get` **signer**(): `undefined` \| `S`

> `set` **signer**(`signer`): `void`

#### Parameters

• **signer**: `undefined` \| `S`

#### Returns

`undefined` \| `S`

#### Inherited from

`Network.signer`

#### Defined in

networks/network.abstract.ts:11

***

### signerOrProvider

> `get` **signerOrProvider**(): `P` \| `S`

#### Returns

`P` \| `S`

#### Inherited from

`Network.signerOrProvider`

#### Defined in

networks/network.abstract.ts:23
