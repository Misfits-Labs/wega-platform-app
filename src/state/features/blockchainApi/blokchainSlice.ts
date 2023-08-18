// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { createAsyncThunk } from "@reduxjs/toolkit"
// import { BigNumber } from 'ethers';
// import { prepareWriteContract, writeContract, waitForTransaction, getNetwork } from '@wagmi/core';
// import { dummyTokenABI, tokenConfig, escrowABI, escrowConfig } from "../../../utils";

// export const fetchArticle = createAsyncThunk(
//   'articles/fetchArticle',
//   async (id: number) => {
//     const data = await fakeAPI.articles.show(id)
//     // Normalize the data so reducers can responded to a predictable payload.
//     // Note: at the time of writing, normalizr does not automatically infer the result,
//     // so we explicitly declare the shape of the returned normalized data as a generic arg.
//     const normalized = normalize<
//       any,
//       {
//         articles: { [key: string]: Article }
//         users: { [key: string]: Author }
//         comments: { [key: string]: Comment }
//       }
//     >(data, articleEntity)
//     return normalized.entities
//   }
// )

// export const slice = createSlice({
//   name: 'articles',
//   initialState: articlesAdapter.getInitialState(),
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchArticle.fulfilled, (state, action) => {
//       // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
//       articlesAdapter.upsertMany(state, action.payload.articles)
//     })
//   },
// })

// interface IBlockchainAPI {
//   createWagerAndDeposit: any,
//   approveERC20: any,
//   getRequests: any,
//   getRequest: any,
//   isEscrowApproved: any,
//   hash: any,
// }

// class BlockchainAPI implements IBlockchainAPI {
//  private chain = (getNetwork()).chain;
//  private tokenConfig = {
//   address: tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as `0x${string}`,
//   abi: dummyTokenABI,
//  };
//  private escrowConfig = {
//   address: escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`,
//   abi: escrowABI,
//  }

//  constructor(){}
//  async createWagerAndDeposit({ token, creator, accountsCount, wager, nonce}: {
//   token?: `0x${string}`
//   creator: `0x${string}`
//   accountsCount: bigint | BigNumber,
//   wager: bigint | BigNumber,
//  }){
//    const config = await prepareWriteContract({
//     ...this.escrowConfig,
//     functionName: 'createWagerAndDeposit',
//     args: [
//      token ?? tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as `0x${string}`, 
//      creator, 
//      accountsCount as bigint, 
//      wager as bigint,
//     ]
//    })
//    return await writeContract(config);
//  }
//  async isEscrowApproved(owner: `0x${string}`){
//   const config = await prepareWriteContract({
//    ...this.tokenConfig,
//    // @ts-ignore
//    functionName: 'allowance',
//    args: [ owner, escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`,  ]
//   })
//   return await writeContract(config);
//  }

//  async approveERC20(wager: bigint | BigNumber | number){
//   const config = await prepareWriteContract({
//    ...this.tokenConfig,
//    functionName: 'approve',
//    args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`, wager as bigint]
//   })
//   return await writeContract(config);
//  }
//  async getRequests(){
//   const config = await prepareWriteContract({
//    ...this.escrowConfig,
//    functionName: 'getRequests',
//    args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`, wager as bigint]
//   })
//   return await writeContract(config);
//  }
//  getRequest(){}
//  hash(){}
// }