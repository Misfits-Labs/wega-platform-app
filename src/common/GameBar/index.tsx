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
} from '../../models';
import { dateFromTs } from '../../utils';
import{ BarDiceIcon, BarCoinIcon, USDCIcon, USDTIcon} from '../../assets/icons';
import { selectGameById } from '../../containers/App/api';
import { useSelector } from 'react-redux' 
import { utils } from 'ethers';
import { ButtonForJoinableGame } from '../ButtonForJoinableGame'
import { ButtonForWaitingGame } from '../ButtonForWaitingGame'

export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

interface GameBarProps {
 gameBarType: 'playable' | 'joinable';
}

function GameBar({ gameId , gameBarType, ...rest}: { gameId: number } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>> & GameBarProps) {
  const game = useSelector(state => selectGameById(state, gameId));

  
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
    
    {/* render for a joinable game */} 
    {  
      gameBarType == 'joinable' && <ButtonForJoinableGame gameType={game.gameType} gameId={game.id} />  
    }

    {/* playable game button */}
    {  
      gameBarType == 'playable' && <ButtonForWaitingGame gameType={game.gameType} gameId={game.id} />  
    }

   </BarWrapper>
  )
}
{/* <Button buttonType="primary" content='Play' className="w-[75%]" onClick={()=> openConnectModal() } /> :
<Link to="/coinflip/create" className="w-[75%]"><Button buttonType="primary" content='Play' className="w-[100%]" /></Link> */}
export default GameBar;

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

export const BadgeIcon = (props: { children: React.ReactElement | React.ReactNode }) => <div className="w-[24px] h-[24px]">{props.children}</div> 

export const renderGameTypeBadge = (gameType: AllPossibleWegaTypes) => {
 const BadgeComponent = BADGE_GAME_TYPE_COMPONENTS[gameType];
 return <BadgeComponent /> ?? null;
}

export const renderWagerBadge = (wagerType: AllPossibleWagerTypes, currencyType: AllPossibleCurrencyTypes) => {
  const BadgeWagerTypeComponent = BADGE_WAGER_TYPE_COMPONENTS[wagerType];
  const BadgeCurrencyTypeComponent = currencyType && BADGE_CURRENCY_TYPE_COMPONENTS[currencyType];
  
  switch(wagerType){
    case WagerTypes[WagerTypesEnum.TOKEN]:
      return !BadgeCurrencyTypeComponent ? null : <BadgeCurrencyTypeComponent /> 
    default: 
      return !BadgeWagerTypeComponent ? null : <BadgeWagerTypeComponent /> 
  }
}
