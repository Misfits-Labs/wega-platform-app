import { useEffect } from 'react';
import { formatEther } from 'ethers';
import { 
 GameTypeBadgeWrapper, 
 DateColumn, 
 BarWrapper, 
 BadgeText,
 WagerTypeBadgeWrapper
} from '../GameBar/types';
import { 
 AllPossibleWegaTypes, 
 WegaTypesEnum, 
 WegaTypes, 
 WagerTypes, 
 WagerTypesEnum,
 CurrencyTypes,
 CurrencyTypesEnum,
 AllPossibleCurrencyTypes,
 AllPossibleWagerTypes,
 HexishString,
} from '../../models';
import { dateFromTs, parseBarCount } from '../../utils';
import { Count } from './types'
import{ BarDiceIcon, BarCoinIcon, USDCIcon, USDTIcon} from '../../assets/icons';
import { selectGameById } from '../../containers/App/api';
import { useSelector } from 'react-redux' 
import { useWegaStore, useBlockchainApiHooks } from '../../hooks'
import { ButtonForClaiming } from '../ButtonForClaiming';
import 'twin.macro';

export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

interface ClaimBarProps {
  gameId: number;
  count: number;
}

function ClaimBar({ 
  gameId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css, 
  count,
  ...rest
}: { gameId: number, count: number  } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>> & ClaimBarProps) {
  const game = useSelector(state => selectGameById(state, gameId));
  const { user, wallet } = useWegaStore();
  const { useGetWinnersQuery } = useBlockchainApiHooks;
  const { getWinners, data: winners } = useGetWinnersQuery();
  
  useEffect(() => {
   if(game && !winners && game.wager && game.gameType && game.wager.wagerHash ) getWinners(game.gameType, game.wager.wagerHash as HexishString);
  }, [winners, game?.wager, game?.gameType, game?.wager?.wagerHash])

  return game && wallet?.address && user?.uuid && winners && (winners.includes(wallet.address) || winners.includes(wallet.address)) ? (
   <BarWrapper tw="flex justify-between gap-[25px]" {...rest}>
    <Count>{parseBarCount(count)}</Count>
    {/* date */}
    <DateColumn>{dateFromTs(new Date(game.createdAt as string).getTime() * 1000)}</DateColumn>
    
    <GameTypeBadgeWrapper>
     {renderGameTypeBadge(game.gameType)}
     <BadgeText>{BADGE_TEXTS[game.gameType]}</BadgeText>
    </GameTypeBadgeWrapper>
    
    <WagerTypeBadgeWrapper>
      <BadgeText>{formatEther(game.wager.wagerAmount)}</BadgeText>
      <BadgeIcon>{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</BadgeIcon>
      <BadgeText>{game.wager.wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>
    {/* escrow link button */}
    
    {/* render for a joinable game */}
      <ButtonForClaiming  game={game} />
   </BarWrapper>
  ) : <></>
}

export default ClaimBar;

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
