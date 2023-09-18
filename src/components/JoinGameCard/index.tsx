import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes, 
  HexishString,
  AllPossibleWegaTypes,
  WegaTypesEnum,
  WegaTypes,
  WegaAttributes
} from "../../models";
import JoinDiceGameCard from './JoinDiceGamecard';
import JoinCoinFlipGameCard from './JoinCoinFlipGameCard';

export interface JoinGameCardProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  tokenAddress: HexishString;
  playerAddress: HexishString;
  gameType: AllPossibleWegaTypes;
  playerUuid: string;
  wagerAmount: number;
  gameUuid: string;
  escrowId: HexishString;
  gameId: number;
  gameAttributes?: WegaAttributes;
}

const JOIN_GAME_CARD_COMPONENTS: any = {
  [WegaTypes[WegaTypesEnum.DICE]]: JoinDiceGameCard,
  [WegaTypes[WegaTypesEnum.COINFLIP]]: JoinCoinFlipGameCard,
}

const JoinGameCard = ({ 
  wagerType, 
  currencyType,
  tokenAddress,
  playerAddress,
  gameUuid,
  playerUuid,
  gameType,
  wagerAmount,
  escrowId,
  gameId, 
  children,
  ...rest 
}: JoinGameCardProps ) => {
  const renderCard = () => {
    let Comp;
    if(!gameType) {
      return null;
    } else {
      Comp = JOIN_GAME_CARD_COMPONENTS[gameType.toUpperCase()];
      if(children) {
        return <Comp { ...{ 
          wagerType, 
          currencyType,
          tokenAddress,
          playerAddress,
          playerUuid,
          gameType,
          gameUuid,
          wagerAmount,
          escrowId,
          gameId,
          ...rest,
        } }>{children}</Comp> 
      } else {
        return <Comp { ...{ 
            wagerType, 
            currencyType,
            tokenAddress,
            playerAddress,
            playerUuid,
            gameType,
            wagerAmount,
            escrowId,
            gameUuid,
            gameId, 
            ...rest 
            } 
          }
        /> 
      }
    }
  }
  return renderCard();
}
export default JoinGameCard;
