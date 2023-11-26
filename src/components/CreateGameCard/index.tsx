import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes, 
  AllPossibleWegaTypes,
  WegaTypesEnum,
  WegaTypes,
} from "../../models";
import { CreateDiceGameCard } from './CreateDiceGameCard';
import { CreateCoinFlipGameCard } from './CreateCoinFlipGameCard';

export interface CreateGameCardInterface extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  gameType: AllPossibleWegaTypes;
}

const CREATE_GAME_CARD_COMPONENTS: any = {
  [WegaTypes[WegaTypesEnum.DICE]]: CreateDiceGameCard,
  [WegaTypes[WegaTypesEnum.COINFLIP]]: CreateCoinFlipGameCard,
} 

const CreateGameCard = ({ 
  wagerType, 
  currencyType,
  gameType,
  children,
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
          gameType,
          ...rest 
        } }>{children}</Comp> 
      } else {
        return <Comp { ...{ 
            wagerType, 
            currencyType,
            gameType,
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