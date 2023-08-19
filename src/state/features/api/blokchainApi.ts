/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BigNumber, utils } from 'ethers';
import { 
 prepareWriteContract, 
 writeContract, 
 getNetwork,
 readContract
 } from '@wagmi/core';
import { tokenConfig, escrowConfig, erc20ABI } from "../../../utils";



interface IBlockchainAPI {
  createWagerAndDeposit: any,
  approveERC20: any,
  getRequests: any,
  getRequest: any,
  isEscrowApproved: any,
  hash: any,
}

class BlockchainAPI implements IBlockchainAPI {
 private chain = (getNetwork()).chain;
 private tokenConfig = {
  address: tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as `0x${string}`,
  abi: erc20ABI,
 };
 private escrowConfig = {
  address: escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`,
  abi: escrowConfig.abi,
 }

 constructor(){}
 async createWagerAndDeposit({ token, creator, accountsCount, wager }: {
  token?: `0x${string}`
  creator: `0x${string}`
  accountsCount: bigint | BigNumber,
  wager: bigint | BigNumber,
 }){
   const config = await prepareWriteContract({
    ...this.escrowConfig,
    functionName: 'createWagerAndDeposit',
    args: [
     token ?? tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as `0x${string}`, 
     creator, 
     accountsCount as bigint, 
     wager as bigint,
    ]
   })
   return await writeContract(config);
 }
 async isEscrowApproved(owner: `0x${string}`, wagerAmount: number){
  const allowance = await readContract({
   ...this.tokenConfig,
   functionName: 'allowance',
   args: [ owner, escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`,  ]
  })
  return Number(utils.formatEther(allowance)) >= wagerAmount;
 }

 async approveERC20(tokenAddress: `0x${string}`, wager: bigint){
  const config = await prepareWriteContract({
    address: tokenAddress,
    abi: this.tokenConfig.abi,
    functionName: 'approve',
    args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`, wager]
  })
  return await writeContract(config);
 }

 async getRequests(wagerId: string | `0x${string}`){
  const requests = await readContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'getWagerRequest',
   args: [ 
    wagerId as `0x${string}`,
   ]
  })
  return requests;
 }

 getRequest(){}
 hash(){}
}

const blockchainApi = new BlockchainAPI();

export { blockchainApi }
