[**@unich-lab/otc-sdk**](../README.md) • **Docs**

***

[@unich-lab/otc-sdk](../globals.md) / SolanaNetwork

# Class: SolanaNetwork

## Extends

- `Network`\<`Connection`, `undefined`\>

## Constructors

### new SolanaNetwork()

> **new SolanaNetwork**(`providers`): [`SolanaNetwork`](SolanaNetwork.md)

#### Parameters

• **providers**: `Connection`[]

#### Returns

[`SolanaNetwork`](SolanaNetwork.md)

#### Overrides

`Network<Connection, undefined>.constructor`

#### Defined in

networks/network.solana.ts:5

## Properties

### \_providers

> `protected` **\_providers**: `Connection`[]

#### Inherited from

`Network._providers`

#### Defined in

networks/network.abstract.ts:4

***

### \_signer

> `protected` **\_signer**: `undefined`

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
