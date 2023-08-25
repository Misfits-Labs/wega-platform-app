/* eslint-disable @typescript-eslint/ban-ts-comment */
import { utils, BigNumber } from 'ethers';
import { 
 prepareWriteContract, 
 writeContract, 
 getNetwork,
 readContract, 
 waitForTransaction
 } from '@wagmi/core';
import { tokenConfig, escrowConfig, erc20ABI } from "../../utils";
import { HexIshString } from '../../models';


interface IBlockchainAPI {
  createWagerAndDeposit: any,
  hash: any,
  depositOf: any,
  approveERC20: any,
  getRequests: any,
  getRequest: any,
  allowance: any,
}

// TODO 
  // add appropriate logging lib
  // add correct fn typing on class interface

export class BlockchainAPI implements IBlockchainAPI {
 private chain = (getNetwork()).chain;
 private tokenConfig = {
  address: tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as HexIshString,
  abi: erc20ABI,
 };
 private escrowConfig = {
  address: escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexIshString,
  abi: escrowConfig.abi,
 }
 
 constructor(){}
 
 async createWagerAndDeposit({ tokenAddress, playerAddress, accountsCount, wager }: {
  tokenAddress: HexIshString
  playerAddress: HexIshString
  accountsCount: number,
  wager: number,
 }){
  const playerNum = BigNumber.from(accountsCount).toBigInt()
  const wagerAsBigint = utils.parseEther(String(wager)).toBigInt()

  const config = await prepareWriteContract({
    ...this.escrowConfig,
    functionName: 'createWagerAndDeposit',
    args: [ tokenAddress, playerAddress, playerNum, wagerAsBigint ]
  })
  return await this.handleWriteRequest(config);
 }
 async allowance(tokenAddress: HexIshString, owner: HexIshString){
  const allowance = await readContract({
    address: tokenAddress, 
    abi: this.tokenConfig.abi,
    functionName: 'allowance',
    args: [ owner, escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexIshString ]
  })
  return Number(utils.formatEther(allowance));
 }

 async approveERC20(tokenAddress: HexIshString, wager: number){
  const wagerAsBigint = utils.parseEther(String(wager)).toBigInt();
  const config = await prepareWriteContract({
    address: tokenAddress,
    abi: this.tokenConfig.abi,
    functionName: 'approve',
    args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexIshString, wagerAsBigint]
  })
  return await this.handleWriteRequest(config);
 }

 async getRequests(wagerId: string | HexIshString){
  const requests = await readContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'getWagerRequest',
   args: [ 
    wagerId as HexIshString,
   ]
  })
  return requests;
 }

 async depositOf(escrowHash: HexIshString, account: HexIshString){
  const deposit = await readContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'depositOf',
   args: [ 
    escrowHash,
    account,
   ]
  })
  return Number(utils.formatEther(deposit));
 }

 async deposit(escrowHash: HexIshString, wagerAmount: number){
  const wagerAmountAsBigInt = utils.parseEther(String(wagerAmount)).toBigInt();
  const depositConfig = await prepareWriteContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'deposit',
   args: [ 
    escrowHash,
    wagerAmountAsBigInt,
   ]
  })
  return await this.handleWriteRequest(depositConfig);
 }

 async hash({ tokenAddress, playerAddress , accountsCount, wager }: 
  { tokenAddress: HexIshString, 
    playerAddress: HexIshString, 
    accountsCount: number, 
    wager: number 
  }) {
  const wagerAsBigInt = utils.parseEther(String(wager)).toBigInt();
  const numPlayers = BigNumber.from(accountsCount).toBigInt();  
  const nonce = await readContract({
    address: this.escrowConfig.address,
    abi: this.escrowConfig.abi,
    functionName: 'currentNonce',
    args: [
      playerAddress,
    ]
  });
  const hash = await readContract({
    address: this.escrowConfig.address,
    abi: this.escrowConfig.abi,
    functionName: 'hash',
    args: [ 
      tokenAddress,
      playerAddress,
      numPlayers,
      wagerAsBigInt,
      nonce,
    ]
   });
   return { hash, nonce: Number(nonce.toString()) };
 }
 
 handleError(error: any, customMessage: string){
  if (error.message){
    if(error.message.split("\n\n") && error.message.split("\n\n").length > 0) {
      return error.message.split("\n\n")[0];
    }
    return error.message
  } else {
    return customMessage;
  }
 }
 
 private async handleWriteRequest(config: any) {
  const { hash } = await writeContract(config);
  return hash;
 } 

 async waitForMined(hash: HexIshString) {
  return await waitForTransaction({ hash })
 }

 getRequest(){}
}


