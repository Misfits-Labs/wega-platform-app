/* eslint-disable @typescript-eslint/ban-ts-comment */
import { utils } from 'ethers';
import { prepareWriteContract } from '@wagmi/core';
import { gameControllerConfig } from "../../utils";
import { HexishString, AllPossibleWegaTypes } from '../../models';
import { BlockchainAPIBase } from '../../libs/wagmi'

export class CreateGameBlockchainApi extends BlockchainAPIBase {
  private gameControllerConfig = {
    address: gameControllerConfig.address[this.chain?.id as keyof typeof gameControllerConfig.address] as HexishString,
    abi: gameControllerConfig.abi,
  }
  public functions = {
    createWagerAndDeposit: async ({ tokenAddress, gameType, wager }: {
      tokenAddress: HexishString
      wager: number,
      gameType: AllPossibleWegaTypes,
    }) => {
      const wagerAsBigint = utils.parseEther(String(wager)).toBigInt()
      const config = await prepareWriteContract({
        ...this.gameControllerConfig,
        functionName: 'createGame',
        args: [gameType, tokenAddress, wagerAsBigint]
      })
      return await this.handleWriteRequest(config);
    }  
  }
  constructor(baseUrl: string | undefined = undefined) {
    super(baseUrl);
  }
}
