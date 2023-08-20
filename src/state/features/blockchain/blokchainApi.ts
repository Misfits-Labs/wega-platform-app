/* eslint-disable @typescript-eslint/ban-ts-comment */
import { utils } from 'ethers';
import { 
 prepareWriteContract, 
 writeContract, 
 getNetwork,
 readContract, 
 waitForTransaction
 } from '@wagmi/core';
import { toastSettings, tokenConfig, escrowConfig, erc20ABI } from "../../../utils";
import toast from 'react-hot-toast';


interface IBlockchainAPI {
  createWagerAndDeposit: any,
  approveERC20: any,
  getRequests: any,
  getRequest: any,
  isEscrowApproved: any,
  hash: any,
}

export class BlockchainAPI implements IBlockchainAPI {
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
  accountsCount: bigint,
  wager: bigint,
 }){
    try {
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
      const { hash } = await writeContract(config);
      toast.success(`Success fully created tx: ${hash}`, toastSettings('success', 'top-right') as any);
      this.handleTransactionMine(
        hash,
        'Creating game...',
        'Create game success!'
      )
      return;
    } catch(error: any) {
      this.handleError(error)
    }
 }
 async isEscrowApproved(tokenAddress: `0x${string}`, owner: `0x${string}`,  wagerAmount: number){
  const allowance = await readContract({
    address: tokenAddress, 
    abi: this.tokenConfig.abi,
    functionName: 'allowance',
    args: [ owner, escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`,  ]
  })
  return Number(utils.formatEther(allowance)) >= wagerAmount;
 }

 async approveERC20(tokenAddress: `0x${string}`, wager: bigint){
  try {
    const config = await prepareWriteContract({
      address: tokenAddress,
      abi: this.tokenConfig.abi,
      functionName: 'approve',
      args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as `0x${string}`, wager]
    })
    const {hash} = await writeContract(config);
    toast.success(`Success fully created tx: ${hash}`, toastSettings('success', 'top-right') as any);
    toast.promise(waitForTransaction({ hash }), { 
      success: 'Approval success' ,
      loading: 'Waiting for approval...',
      error: (e) => e.message,
    });
    return true;
  } catch (error: any) {
    this.handleError(error);
  }
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

 private handleError(error: any){
  let message = error.message;
  if (error.message && error.message.split("\n\n") && error.message.split("\n\n").length > 0) {
    message = error.message.split("\n\n")[0];
  }
  toast.error(message, toastSettings('error', 'bottom-center') as any);
 }

 private handleTransactionMine(hash: any, loading: string, success: string){
  toast.promise(waitForTransaction({ hash }), { 
    success: success ,
    loading: loading,
    error: (e) => e.message,
  });
 }

 hash(){}
 getRequest(){}
}


