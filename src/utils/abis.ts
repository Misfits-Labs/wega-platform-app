// Generated by @wagmi/cli@1.3.0 on 8/28/2023 at 11:51:05 AM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
 {
  stateMutability: "nonpayable",
  type: "constructor",
  inputs: [
   { name: "name_", internalType: "string", type: "string" },
   { name: "symbol_", internalType: "string", type: "string" }
  ]
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "owner", internalType: "address", type: "address", indexed: true },
   { name: "spender", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Approval"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "from", internalType: "address", type: "address", indexed: true },
   { name: "to", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Transfer"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "owner", internalType: "address", type: "address" },
   { name: "spender", internalType: "address", type: "address" }
  ],
  name: "allowance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "approve",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "decimals",
  outputs: [{ name: "", internalType: "uint8", type: "uint8" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "subtractedValue", internalType: "uint256", type: "uint256" }
  ],
  name: "decreaseAllowance",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "addedValue", internalType: "uint256", type: "uint256" }
  ],
  name: "increaseAllowance",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "name",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "symbol",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "totalSupply",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transfer",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "from", internalType: "address", type: "address" },
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transferFrom",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC2771Context
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc2771ContextABI = [
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "forwarder", internalType: "address", type: "address" }],
  name: "isTrustedForwarder",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "owner", internalType: "address", type: "address", indexed: true },
   { name: "spender", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Approval"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "from", internalType: "address", type: "address", indexed: true },
   { name: "to", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Transfer"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "owner", internalType: "address", type: "address" },
   { name: "spender", internalType: "address", type: "address" }
  ],
  name: "allowance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "approve",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "totalSupply",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transfer",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "from", internalType: "address", type: "address" },
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transferFrom",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20EscrowEvents
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20EscrowEventsABI = [
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32", indexed: true },
   { name: "wager", internalType: "uint256", type: "uint256", indexed: true },
   { name: "player", internalType: "address", type: "address", indexed: true }
  ],
  name: "WagerDeposit"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32", indexed: true },
   { name: "token", internalType: "address", type: "address", indexed: true },
   { name: "creator", internalType: "address", type: "address", indexed: true },
   { name: "wager", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "WagerRequestCreation"
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataABI = [
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "owner", internalType: "address", type: "address", indexed: true },
   { name: "spender", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Approval"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "from", internalType: "address", type: "address", indexed: true },
   { name: "to", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Transfer"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "owner", internalType: "address", type: "address" },
   { name: "spender", internalType: "address", type: "address" }
  ],
  name: "allowance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "approve",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "decimals",
  outputs: [{ name: "", internalType: "uint8", type: "uint8" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "name",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "symbol",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "totalSupply",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transfer",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "from", internalType: "address", type: "address" },
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transferFrom",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWegaERC20Escrow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWegaErc20EscrowABI = [
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "token", internalType: "address", type: "address" },
   { name: "creator", internalType: "address", type: "address" },
   { name: "accountsCount", internalType: "uint256", type: "uint256" },
   { name: "wager", internalType: "uint256", type: "uint256" }
  ],
  name: "createWagerAndDeposit",
  outputs: []
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "currentNonce",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32" },
   { name: "account", internalType: "address", type: "address" }
  ],
  name: "depositOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "escrowId", internalType: "bytes32", type: "bytes32" }],
  name: "getWagerRequest",
  outputs: [
   {
    name: "",
    internalType: "struct IWegaERC20Escrow.ERC20WagerRequest",
    type: "tuple",
    components: [
     { name: "state", internalType: "enum IEscrow.TransactionState", type: "uint8" },
     { name: "escrowId", internalType: "bytes32", type: "bytes32" },
     { name: "wager", internalType: "uint256", type: "uint256" },
     { name: "token", internalType: "address", type: "address" },
     { name: "nonce", internalType: "uint256", type: "uint256" },
     { name: "totalWager", internalType: "uint256", type: "uint256" }
    ]
   }
  ]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "getWagerRequests",
  outputs: [
   {
    name: "",
    internalType: "struct IWegaERC20Escrow.ERC20WagerRequest[]",
    type: "tuple[]",
    components: [
     { name: "state", internalType: "enum IEscrow.TransactionState", type: "uint8" },
     { name: "escrowId", internalType: "bytes32", type: "bytes32" },
     { name: "wager", internalType: "uint256", type: "uint256" },
     { name: "token", internalType: "address", type: "address" },
     { name: "nonce", internalType: "uint256", type: "uint256" },
     { name: "totalWager", internalType: "uint256", type: "uint256" }
    ]
   }
  ]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "token", internalType: "address", type: "address" },
   { name: "creator", internalType: "address", type: "address" },
   { name: "accountsCount", internalType: "uint256", type: "uint256" },
   { name: "wager", internalType: "uint256", type: "uint256" },
   { name: "nonce", internalType: "uint256", type: "uint256" }
  ],
  name: "hash",
  outputs: [{ name: "escrowId_", internalType: "bytes32", type: "bytes32" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "escrowId", internalType: "bytes32", type: "bytes32" }],
  name: "wagerBalance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "previousOwner", internalType: "address", type: "address", indexed: true },
   { name: "newOwner", internalType: "address", type: "address", indexed: true }
  ],
  name: "OwnershipTransferred"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "owner",
  outputs: [{ name: "", internalType: "address", type: "address" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [],
  name: "renounceOwnership",
  outputs: []
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
  name: "transferOwnership",
  outputs: []
 }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WegaERC20Dummy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1214B72be391163457090B99622A749106b72Bce)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20DummyABI = [
 {
  stateMutability: "nonpayable",
  type: "constructor",
  inputs: [{ name: "receivers", internalType: "address[]", type: "address[]" }]
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "owner", internalType: "address", type: "address", indexed: true },
   { name: "spender", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Approval"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "previousOwner", internalType: "address", type: "address", indexed: true },
   { name: "newOwner", internalType: "address", type: "address", indexed: true }
  ],
  name: "OwnershipTransferred"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "from", internalType: "address", type: "address", indexed: true },
   { name: "to", internalType: "address", type: "address", indexed: true },
   { name: "value", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "Transfer"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "owner", internalType: "address", type: "address" },
   { name: "spender", internalType: "address", type: "address" }
  ],
  name: "allowance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "approve",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "decimals",
  outputs: [{ name: "", internalType: "uint8", type: "uint8" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "subtractedValue", internalType: "uint256", type: "uint256" }
  ],
  name: "decreaseAllowance",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "spender", internalType: "address", type: "address" },
   { name: "addedValue", internalType: "uint256", type: "uint256" }
  ],
  name: "increaseAllowance",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "mint",
  outputs: []
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "name",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "owner",
  outputs: [{ name: "", internalType: "address", type: "address" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [],
  name: "renounceOwnership",
  outputs: []
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "symbol",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "totalSupply",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transfer",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "from", internalType: "address", type: "address" },
   { name: "to", internalType: "address", type: "address" },
   { name: "amount", internalType: "uint256", type: "uint256" }
  ],
  name: "transferFrom",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
  name: "transferOwnership",
  outputs: []
 }
] as const

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1214B72be391163457090B99622A749106b72Bce)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20DummyAddress = {
 1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
 80001: "0x1214B72be391163457090B99622A749106b72Bce",
 344106930: "0x0000000000000000000000000000000000000000"
} as const

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1214B72be391163457090B99622A749106b72Bce)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20DummyConfig = {
 address: wegaErc20DummyAddress,
 abi: wegaErc20DummyABI
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WegaERC20Escrow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x148ECFB8f04538fA8CEc9a13DdB9926cCB39e5Cc)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20EscrowABI = [
 {
  stateMutability: "nonpayable",
  type: "constructor",
  inputs: [
   { name: "name", internalType: "string", type: "string" },
   { name: "version", internalType: "string", type: "string" }
  ]
 },
 { type: "error", inputs: [], name: "WegaEscrow_CanOnlyDepositOnce" },
 { type: "error", inputs: [], name: "WegaEscrow_InvalidRequestData" },
 { type: "error", inputs: [], name: "WegaEscrow_InvalidRequestState" },
 { type: "error", inputs: [], name: "WegaEscrow_InvalidWagerAmount" },
 { type: "error", inputs: [], name: "WegaEscrow_MaximumWagerAmountReached" },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32", indexed: true },
   { name: "wager", internalType: "uint256", type: "uint256", indexed: true },
   { name: "player", internalType: "address", type: "address", indexed: true }
  ],
  name: "WagerDeposit"
 },
 {
  type: "event",
  anonymous: false,
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32", indexed: true },
   { name: "token", internalType: "address", type: "address", indexed: true },
   { name: "creator", internalType: "address", type: "address", indexed: true },
   { name: "wager", internalType: "uint256", type: "uint256", indexed: false }
  ],
  name: "WagerRequestCreation"
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "NAME",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "TYPE",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "VERSION",
  outputs: [{ name: "", internalType: "string", type: "string" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "token", internalType: "address", type: "address" },
   { name: "account", internalType: "address", type: "address" },
   { name: "accountsCount", internalType: "uint256", type: "uint256" },
   { name: "wager", internalType: "uint256", type: "uint256" }
  ],
  name: "createWagerAndDeposit",
  outputs: []
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "account", internalType: "address", type: "address" }],
  name: "currentNonce",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "nonpayable",
  type: "function",
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32" },
   { name: "wager", internalType: "uint256", type: "uint256" }
  ],
  name: "deposit",
  outputs: []
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [
   { name: "escrowId", internalType: "bytes32", type: "bytes32" },
   { name: "account", internalType: "address", type: "address" }
  ],
  name: "depositOf",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "escrowId", internalType: "bytes32", type: "bytes32" }],
  name: "getWagerRequest",
  outputs: [
   {
    name: "",
    internalType: "struct IWegaERC20Escrow.ERC20WagerRequest",
    type: "tuple",
    components: [
     { name: "state", internalType: "enum IEscrow.TransactionState", type: "uint8" },
     { name: "escrowId", internalType: "bytes32", type: "bytes32" },
     { name: "wager", internalType: "uint256", type: "uint256" },
     { name: "token", internalType: "address", type: "address" },
     { name: "nonce", internalType: "uint256", type: "uint256" },
     { name: "totalWager", internalType: "uint256", type: "uint256" }
    ]
   }
  ]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [],
  name: "getWagerRequests",
  outputs: [
   {
    name: "",
    internalType: "struct IWegaERC20Escrow.ERC20WagerRequest[]",
    type: "tuple[]",
    components: [
     { name: "state", internalType: "enum IEscrow.TransactionState", type: "uint8" },
     { name: "escrowId", internalType: "bytes32", type: "bytes32" },
     { name: "wager", internalType: "uint256", type: "uint256" },
     { name: "token", internalType: "address", type: "address" },
     { name: "nonce", internalType: "uint256", type: "uint256" },
     { name: "totalWager", internalType: "uint256", type: "uint256" }
    ]
   }
  ]
 },
 {
  stateMutability: "pure",
  type: "function",
  inputs: [
   { name: "token", internalType: "address", type: "address" },
   { name: "creator", internalType: "address", type: "address" },
   { name: "accountsCount", internalType: "uint256", type: "uint256" },
   { name: "wager", internalType: "uint256", type: "uint256" },
   { name: "nonce", internalType: "uint256", type: "uint256" }
  ],
  name: "hash",
  outputs: [{ name: "escrowId_", internalType: "bytes32", type: "bytes32" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "forwarder", internalType: "address", type: "address" }],
  name: "isTrustedForwarder",
  outputs: [{ name: "", internalType: "bool", type: "bool" }]
 },
 {
  stateMutability: "view",
  type: "function",
  inputs: [{ name: "escrowId", internalType: "bytes32", type: "bytes32" }],
  name: "wagerBalance",
  outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
 }
] as const

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x148ECFB8f04538fA8CEc9a13DdB9926cCB39e5Cc)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20EscrowAddress = {
 1337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
 80001: "0x148ECFB8f04538fA8CEc9a13DdB9926cCB39e5Cc",
 344106930: "0x0000000000000000000000000000000000000000"
} as const

/**
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x148ECFB8f04538fA8CEc9a13DdB9926cCB39e5Cc)
 * - [__View Contract on Skale Calypso Nft Hub Testnet Skale Explorer__](https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/address/0x0000000000000000000000000000000000000000)
 */
export const wegaErc20EscrowConfig = {
 address: wegaErc20EscrowAddress,
 abi: wegaErc20EscrowABI
} as const
