/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toBigInt, formatEther, parseEther } from 'ethers';
import { 
 prepareWriteContract, 
 writeContract, 
 getNetwork,
 readContract, 
 waitForTransaction
 } from '@wagmi/core';
import { tokenConfig, escrowConfig, erc20ABI, gameControllerConfig, randomizerControllerConfig } from "../../utils";
import { HexishString, AllPossibleWegaTypes } from '../../models';


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
    address: tokenConfig.address[this.chain?.id as keyof typeof tokenConfig.address] as HexishString,
    abi: erc20ABI,
  };
  private escrowConfig = {
    address: escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexishString,
    abi: escrowConfig.abi
  }
  private gameControllerConfig = {
    address: gameControllerConfig.address[this.chain?.id as keyof typeof gameControllerConfig.address] as HexishString,
    abi: gameControllerConfig.abi,
  }
  private randomizerControllerConfig = {
    address: randomizerControllerConfig.address[this.chain?.id as keyof typeof gameControllerConfig.address] as HexishString,
    abi: randomizerControllerConfig.abi,
  }
 
 constructor(){}
 
 async createWagerAndDeposit({ tokenAddress, gameType, wager }: {
  tokenAddress: HexishString
  wager: number,
  gameType: AllPossibleWegaTypes,
 }){
  const wagerAsBigint = parseEther(String(wager));
  const config = await prepareWriteContract({
    ...this.gameControllerConfig,
    functionName: 'createGame',
    args: [gameType, tokenAddress, wagerAsBigint, [toBigInt(10)]] // placeholder random num for now
  })
  return await this.handleWriteRequest(config);
 }
 async allowance(tokenAddress: HexishString, owner: HexishString){
  const allowance = await readContract({
    address: tokenAddress, 
    abi: this.tokenConfig.abi,
    functionName: 'allowance',
    args: [ owner, escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexishString ]
  })
  return Number(formatEther(allowance));
 }

 async approveERC20(tokenAddress: HexishString, wager: number){
  const wagerAsBigint = parseEther(String(wager));
  const config = await prepareWriteContract({
    address: tokenAddress,
    abi: this.tokenConfig.abi,
    functionName: 'approve',
    args: [ escrowConfig.address[this.chain?.id as keyof typeof escrowConfig.address] as HexishString, wagerAsBigint]
  })
  return await this.handleWriteRequest(config);
 }

 async getRequests(wagerId: string | HexishString){
  const requests = await readContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'getWagerRequest',
   args: [ 
    wagerId as HexishString,
   ]
  })
  return requests;
 }

 async depositOf(escrowHash: HexishString, account: HexishString){
  const deposit = await readContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'depositOf',
   args: [ 
    escrowHash,
    account,
   ]
  })
  return Number(formatEther(deposit));
 }

 async deposit(escrowHash: HexishString, playerChoices?: number[]){
  const depositConfig = await prepareWriteContract({
   address: this.gameControllerConfig.address,
   abi: this.gameControllerConfig.abi,
   functionName: 'depositOrPlay',
   args: playerChoices ? [escrowHash, playerChoices.map(choice => toBigInt(choice)), [toBigInt(10)]] : [escrowHash, [toBigInt(10)]],
  })
  return await this.handleWriteRequest(depositConfig);
 }

 async claim(escrowHash: HexishString){
  const claimConfig = await prepareWriteContract({
   address: this.escrowConfig.address,
   abi: this.escrowConfig.abi,
   functionName: 'withdraw',
   args: [ 
    escrowHash,
   ]
  })
  return await this.handleWriteRequest(claimConfig);
 }

 async hash({ tokenAddress, playerAddress , accountsCount, wager }: 
  { tokenAddress: HexishString, 
    playerAddress: HexishString, 
    accountsCount: number, 
    wager: number 
  }) {
  const wagerAsBigInt = parseEther(String(wager));
  const numPlayers = toBigInt(accountsCount);  
  const nonce = await readContract({
    address: this.escrowConfig.address,
    abi: this.escrowConfig.abi,
    functionName: 'nonces',
    args: [this.randomizerControllerConfig.address]
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
 async getGameResults(gameType: AllPossibleWegaTypes, escrowHash: HexishString, player: HexishString) {
  const results = await readContract({
    address: this.gameControllerConfig.address,
    abi: this.gameControllerConfig.abi,
    functionName: 'gameResults',
    args: [
      gameType.toUpperCase(),
      escrowHash,
      player,
    ]
  });
  return results.map(v => Number(v.toString()));
 }
 async getWinners(gameType: AllPossibleWegaTypes, escrowHash: HexishString) {
  const winners = await readContract({
    address: this.gameControllerConfig.address,
    abi: this.gameControllerConfig.abi,
    functionName: 'winners',
    args: [
      gameType.toUpperCase(),
      escrowHash
    ]
  });
  return winners as HexishString[];
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
 async waitForMined(hash: HexishString) {
  return await waitForTransaction({ hash })
 }
 getRequest(){}
}
