import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes, 
  HexishString,
  AllPossibleWegaTypes,
  WegaTypesEnum,
  WegaTypes,
  Network
} from "../../models";
import { CreateDiceGameCard } from './CreateDiceGameCard';
import { CreateCoinFlipGameCard } from './CreateCoinFlipGameCard';

export interface CreateGameCardInterface extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  tokenAddress: HexishString;
  playerAddress: HexishString;
  gameType: AllPossibleWegaTypes;
  playerUuid: string;
  network: Network;
}

const CREATE_GAME_CARD_COMPONENTS: any = {
  [WegaTypes[WegaTypesEnum.DICE]]: CreateDiceGameCard,
  [WegaTypes[WegaTypesEnum.COINFLIP]]: CreateCoinFlipGameCard,
} 

const CreateGameCard = ({ 
  wagerType, 
  currencyType,
  tokenAddress,
  playerAddress,
  playerUuid,
  gameType,
  children,
  network,
  ...rest 
}: CreateGameCardInterface) => {
  const renderCard = () => {
    let Comp;
    if(!gameType) {
      return null;
    } else {
      Comp = CREATE_GAME_CARD_COMPONENTS[gameType.toUpperCase()];
      if(children) {
        return <Comp { ...{ 
          wagerType, 
          currencyType,
          tokenAddress,
          playerAddress,
          playerUuid,
          gameType,
          network,
          ...rest 
        } }>{children}</Comp> 
      } else {
        return <Comp { ...{ 
            wagerType, 
            currencyType,
            tokenAddress,
            playerAddress,
            playerUuid,
            gameType,
            network,
            ...rest 
            } 
          }
        /> 
      }
    }
  }
  return renderCard();
}
export default CreateGameCard;

