import { 
 GameTypeBadgeWrapper, 
 DateColumn, 
 BarWrapper, 
 BadgeText,
 WagerTypeBadgeWrapper
} from './types';
import { 
 AllPossibleWegaTypes, 
 WegaTypesEnum, 
 WegaTypes, 
 WagerTypes, 
 WagerTypesEnum,
 CurrencyTypes,
 CurrencyTypesEnum,
 AllPossibleCurrencyTypes,
 AllPossibleWagerTypes 
} from '../../../models';
import { dateFromTs } from '../../../utils';
import{ BarDiceIcon, BarCoinIcon, USDCIcon, StarLoaderIcon, USDTIcon} from '../../../assets/icons';
import Button from '../Button';
import { selectGameById } from '../../../state/features/games/gamesSlice';
import { useSelector } from 'react-redux' 
import { utils } from 'ethers';

export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

function JoinableGameBar({ gameId , ...rest}: { gameId: number } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>>) {
  
  const game = useSelector(state => selectGameById(state, gameId))
  
  return game && (
   <BarWrapper {...rest}>
    {/* date */}
    <DateColumn>{dateFromTs(new Date(game.createdAt as string).getTime() * 1000)}</DateColumn>
    
    <GameTypeBadgeWrapper>
     {renderGameTypeBadge(game.gameType)}
     <BadgeText>{BADGE_TEXTS[game.gameType]}</BadgeText>
    </GameTypeBadgeWrapper>
    
    <WagerTypeBadgeWrapper>
     <BadgeText>{utils.formatEther(game.wager.wagerAmount)}</BadgeText>
     <BadgeIcon><>{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</></BadgeIcon>
     <BadgeText>{game.wager.wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>

    {/* escrow link button */}
    
    {/* play button should get activated on action */} 
    
     <Button buttonType="secondary"  className="flex items-center">
      <>
       Play
       <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </>
     </Button>
   </BarWrapper>
  )
}

export default JoinableGameBar;

const BADGE_GAME_TYPE_COMPONENTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: BarDiceIcon, 
 [WegaTypes[WegaTypesEnum.COINFLIP]]: BarCoinIcon, 
}

const BADGE_WAGER_TYPE_COMPONENTS: any = {
 [WagerTypes[WagerTypesEnum.NFT]]: undefined, 
 [WagerTypes[WagerTypesEnum.TOKEN]]: USDCIcon, // Tdo - refactor
}

const BADGE_CURRENCY_TYPE_COMPONENTS: any = {
 [CurrencyTypes[CurrencyTypesEnum.USDT]]: USDTIcon, 
 [CurrencyTypes[CurrencyTypesEnum.USDC]]: USDCIcon, // Tdo - refactor
}

export const BadgeIcon = (props: { children: React.ReactElement }) => <div className="w-[24px] h-[24px]">{props.children}</div> 

const renderGameTypeBadge = (gameType: AllPossibleWegaTypes) => {
 const BadgeComponent = BADGE_GAME_TYPE_COMPONENTS[gameType];
 return <BadgeComponent /> ?? null;
}

export const renderWagerBadge = (wagerType: AllPossibleWagerTypes, currencyType?: AllPossibleCurrencyTypes) => {
  const BadgeWagerTypeComponent = BADGE_WAGER_TYPE_COMPONENTS[wagerType]; 
  const BadgeCurrencyTypeComponent = currencyType && BADGE_CURRENCY_TYPE_COMPONENTS[currencyType];
  
  switch(wagerType){
    case WagerTypes[WagerTypesEnum.TOKEN]:
      return !BadgeCurrencyTypeComponent ? null : <BadgeCurrencyTypeComponent /> 
    default: 
      return !BadgeWagerTypeComponent ? null : <BadgeWagerTypeComponent /> 
  }
}


// const renderComponent = () => {
//  const ModalComponent = MODAL_COMPONENTS[modalType!]
//  if (!modalType || !ModalComponent) {
//    return null
//  }
//  return <ModalComponent {...modalProps} />
// }
