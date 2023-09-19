import PlayDiceGameSection from './PlayDiceGameSection'; 
import PlayCoinFlipGameSection from './PlayCoinFlipGameSection'; 
import { 
  Wega, 
  User, 
  WegaTypes, 
  WegaTypesEnum, 
  HexishString, 
  GameInfoType, 
  Wallet,
  Player,
  WegaAttributes,
  PlayerFlipChoices,
} from "../../models";
import 'twin.macro';

export interface PlayGameSectionProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
  game: Wega;
  user: User;
  players: Player[];
  gameResults: any;
  gameInfo: GameInfoType;
  wallet: Wallet;
  isGamePlayable: boolean;
  winners: HexishString[];
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
  gameResults,
  gameInfo,
  wallet,
  isGamePlayable,
  winners,
  gameAttributes,
  playerFlipChoices,
  ...rest 
}) => {
  const renderGame = () => {
    let Comp;
    if(!game) {
      return null;
    } else {
      Comp = GAME_COMPONENTS[game.gameType.toUpperCase()];
      if(children) {
        return <Comp {...{
          game,
          user,
          players,
          gameResults,
          gameInfo,
          wallet,
          isGamePlayable,
          winners,
          gameAttributes,
          playerFlipChoices,
          ...rest 
        }}>{children}</Comp>
      } else {
        return <Comp {...{
          game,
          user,
          players,
          gameResults,
          gameInfo,
          wallet,
          isGamePlayable,
          winners,
          gameAttributes,
          playerFlipChoices,
          ...rest
        }} /> 
      }
    }
  }
  return renderGame();  
}
export default PlayGameSection;
