import { useEffect } from 'react';
import PlayDiceGameSection from './PlayDiceGameSection'; 
import PlayCoinFlipGameSection from './PlayCoinFlipGameSection';
import { 
  useGetGameWinnersQuery,
  useGetGameResultsQuery,
 } from './blockchainApiSlice'
 
import { 
  Wega, 
  User, 
  WegaTypes, 
  WegaTypesEnum, 
  GameInfoType,
  HexishString, 
  Wallet,
  Player,
  WegaAttributes,
  PlayerFlipChoices,
} from "../../models";

import { ComponentLoader } from "../../common/loaders"
import 'twin.macro';

export interface PlayGameSectionProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
  game: Wega;
  user: User;
  players: Player[];
  gameInfo: GameInfoType;
  wallet: Wallet;
  isGamePlayable: boolean;
  gameAttributes?: WegaAttributes;
  playerFlipChoices?: PlayerFlipChoices; 
}

const GAME_COMPONENTS: any = {
  [WegaTypes[WegaTypesEnum.DICE]]: PlayDiceGameSection,
  [WegaTypes[WegaTypesEnum.COINFLIP]]: PlayCoinFlipGameSection
}

const PlayGameSection: React.FC<PlayGameSectionProps> = ({ 
  children, 
  game,
  user,
  players,
  gameInfo,
  wallet,
  isGamePlayable,
  gameAttributes,
  playerFlipChoices,
  ...rest 
}) => {
  
  // TODO
    // convert to hook
  const { gameType, wager: { wagerHash: escrowHash } } = game;
  const gameResultsQuery = useGetGameResultsQuery({
    gameType, 
    escrowHash: escrowHash as HexishString, 
    players: players.map(player => player?.walletAddress) as HexishString[]
  });
  const { data: winners, refetch: refetchGameWinners, isLoading: isWinnersQueryLoading } = useGetGameWinnersQuery({
    gameType,
    escrowHash: escrowHash as HexishString,
  },);
  useEffect(() => {
    console.log(players)
    gameResultsQuery.refetch();
    refetchGameWinners()
  }, [players.length]);
  
  const renderGame = () => {
    let Comp;
    if(!game) {
      return null;
    } else {
      Comp = GAME_COMPONENTS[game.gameType.toUpperCase()];
      if(children) {
        return !gameResultsQuery.isLoading && !isWinnersQueryLoading ? <Comp {...{
          game,
          user,
          players,
          gameResults: gameResultsQuery.data,
          gameInfo,
          wallet,
          isGamePlayable,
          winners,
          gameAttributes,
          playerFlipChoices,
          ...rest 
        }}>{children}</Comp> : <ComponentLoader tw="w-[100%] h-[100%]" />       
      } else {
        return !gameResultsQuery.isLoading && !isWinnersQueryLoading ? <Comp {...{
          game,
          user,
          players,
          gameResults: gameResultsQuery.data,
          gameInfo,
          wallet,
          isGamePlayable,
          winners,
          gameAttributes,
          playerFlipChoices,
          ...rest
        }} /> : <ComponentLoader tw="w-[100%] h-[100%]" />
      }
    }
  }
  return  renderGame() ;  
}
export default PlayGameSection;
