import { useContractEvent } from 'wagmi';
import { escrowConfig } from '../utils';
import { AllPossibleWegaTypes, Wager, Player} from '../models';
import { useCreateGameMutation } from '../state/features/games/gamesSlice';



export function useCreateGameOnEscrowEvent(
  gameType: AllPossibleWegaTypes,
  uuid: string,
  address: `0x${string}`,
  chainId: number,
  ) {
  const [createGame] = useCreateGameMutation();
  useContractEvent({
    address: escrowConfig.address[chainId as keyof typeof escrowConfig.address],
    abi: escrowConfig.abi,
    eventName: 'WagerRequestCreation',
    async listener(log: any) {
      const wg = log.filter((lg: any) => lg.args.creator.toLowerCase() === address?.toLowerCase())[0]
      const { escrowId, wager: amount, token } = wg.args;
      // get wager from log
      const wager: Wager = {
        wagerHash: escrowId,
        wagerType: "TOKEN",
        tokenAddress: token,
        wagerAmount: amount.toString(),
        wagerCurrency: "USDT",
      }
      await createGame({ gameType, players: [ { uuid  } ] as Player[], wager });
  },
 })
}

