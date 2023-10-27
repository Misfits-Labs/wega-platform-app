import { useEffect } from 'react';
import { useGetSet } from 'react-use';
import { useAppDispatch } from '../../hooks';
import PlayDiceGameSection from './PlayDiceGameSection'; 
import PlayCoinFlipGameSection from './PlayCoinFlipGameSection';
import { 
  useGetGameWinnersQuery,
  playGameBlockchainApiSlice
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
  const dispatch = useAppDispatch();
  const [gameResults, setGameResults] = useGetSet<number[][] | undefined>(undefined);
  // TODO
    // convert to hook
  const { gameType, wager: { wagerHash: escrowHash } } = game;
  const getGameResultsOfAllPlayers = async () => {
    const results = (await Promise.all(players.map(async (player) => dispatch(playGameBlockchainApiSlice.endpoints.getGameResults.initiate({ 
      gameType, 
      escrowHash: escrowHash as HexishString, 
      player: player.walletAddress as HexishString 
    }))))).map((result: any) => result.data);
    setGameResults(results as unknown as number[][]);
  }
  const { data: winners } = useGetGameWinnersQuery({
    gameType,
    escrowHash: escrowHash as HexishString,
  });
  useEffect(() => {
    getGameResultsOfAllPlayers();
  }, [players.length]);
  const renderGame = () => {
    let Comp;
    if(!game) {
      return null;
    } else {
      Comp = GAME_COMPONENTS[game.gameType.toUpperCase()];
      if(children) {
        return gameResults() && winners ? <Comp {...{
          game,
          user,
          players,
          gameResults: gameResults(),
          gameInfo,
          wallet,
          isGamePlayable,
          winners,
          gameAttributes,
          playerFlipChoices,
          ...rest 
        }}>{children}</Comp> : <ComponentLoader tw="w-[100%] h-[100%]" />       
      } else {
        return gameResults() && winners ? <Comp {...{
          game,
          user,
          players,
          gameResults: gameResults(),
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
