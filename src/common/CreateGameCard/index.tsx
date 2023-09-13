import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes, 
  HexishString,
  AllPossibleWegaTypes,
  WegaTypesEnum,
  WegaTypes
} from "../../models";
import { CreateDiceGameCard } from './CreateDiceGameCard';

export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  tokenAddress: HexishString;
  playerAddress: HexishString;
  gameType: AllPossibleWegaTypes;
  playerUuid: string;
}

const CREATE_GAME_CARD_COMPONENTS: any = {
  [WegaTypes[WegaTypesEnum.DICE]]: CreateDiceGameCard
} 

const CreateGameCard = ({ 
  wagerType, 
  currencyType,
  tokenAddress,
  playerAddress,
  playerUuid,
  gameType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css, 
  ...rest 
}: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement>) => {
  const renderCard = () => {
    let Comp;
    if(!gameType) {
      return null;
    } else {
      Comp = CREATE_GAME_CARD_COMPONENTS[gameType.toUpperCase()];
      return <Comp { ...{ 
        wagerType, 
        currencyType,
        tokenAddress,
        playerAddress,
        playerUuid,
        gameType,
        ...rest 
    } }/> 
    }
  }
  return renderCard();
}
export default CreateGameCard;

