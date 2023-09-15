import { 
 GameTypeBadgeWrapper, 
 DateColumn, 
 BarWrapper, 
 BadgeText,
 WagerTypeBadgeWrapper,
 BadgeIconContainer
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
import { ButtonForJoinableGame } from '../ButtonForJoinableGame';
import { ButtonForWaitingGame } from '../ButtonForWaitingGame';
import { useWegaStore } from '../../hooks'
import 'twin.macro';

export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

interface GameBarProps {
  gameId: number;
}

function GameBar({ 
  gameId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css, 
  ...rest
}: { gameId: number } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>> & GameBarProps) {
  const game = useSelector(state => selectGameById(state, gameId));
  const { user } = useWegaStore()

  return game && user?.uuid && (
   <BarWrapper tw="grid grid-cols-4" {...rest}>
    {/* date */}
    <DateColumn tw="max-w-[max-content]">{dateFromTs(new Date(game.createdAt as string).getTime() * 1000)}</DateColumn>
    
    <GameTypeBadgeWrapper tw="w-[fit-content]">
     {renderGameTypeBadge(game.gameType)}
     <BadgeText>{BADGE_TEXTS[game.gameType]}</BadgeText>
    </GameTypeBadgeWrapper>
    
    <WagerTypeBadgeWrapper>
     <BadgeText>{utils.formatEther(game.wager.wagerAmount)}</BadgeText>
     <BadgeIcon>{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</BadgeIcon>
     <BadgeText>{game.wager.wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>
    {/* escrow link button */}
    
    {/* render for a joinable game */}
    {
      game.creatorUuid !== user.uuid && <div tw="flex justify-end">
        <ButtonForJoinableGame gameType={game.gameType} gameId={game.id} gameUuid={game.uuid} />
      </div>
    }

    {/* playable game button */}
    {  
      game.creatorUuid === user.uuid && <div tw="flex justify-end">
        <ButtonForWaitingGame gameType={game.gameType} gameId={game.id} gameUuid={game.uuid} />  
      </div>
    }
   </BarWrapper>
  )
}

export default GameBar;

const BADGE_GAME_TYPE_COMPONENTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: BarDiceIcon, 
 [WegaTypes[WegaTypesEnum.COINFLIP]]: BarCoinIcon, 
}

const BADGE_WAGER_TYPE_COMPONENTS: any = {
 [WagerTypes[WagerTypesEnum.NFT]]: undefined, 
 [WagerTypes[WagerTypesEnum.TOKEN]]: USDCIcon, // Tdo - refactor
}

export const BADGE_CURRENCY_TYPE_COMPONENTS: any = {
 [CurrencyTypes[CurrencyTypesEnum.USDT]]: USDTIcon, 
 [CurrencyTypes[CurrencyTypesEnum.USDC]]: USDCIcon,
}

export const BadgeIcon = (
  props: { children: React.ReactElement | React.ReactNode, size?: string; }
) => <BadgeIconContainer size={props.size} >{props.children}</BadgeIconContainer> 

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