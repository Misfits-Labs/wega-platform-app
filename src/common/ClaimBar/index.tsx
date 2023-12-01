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
 Wega
} from '../../models';
import { dateFromTs, parseBarCount } from '../../utils';
import { Count } from './types'
import{ BarDiceIcon, BarCoinIcon, USDCIcon, USDTIcon, ArrowTrSquareIcon} from '../../assets/icons';
import { selectGameById } from '../../components/WegaGames/apiSlice';
import { useSelector } from 'react-redux' 
import { ButtonForClaiming } from '../ButtonForClaiming';
import { constructBlockExplorerHash } from '../GameBar/utils';
import { Link } from 'react-router-dom'
import { 
  NormalText, 
} from "../../components/CreateGameCard/types";
import 'twin.macro';

export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

interface ClaimBarProps {
  gameId: number;
  count: number;
  networkId: number;
  game: Wega;
}

function ClaimBar({ 
  gameId,
  networkId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css,
  game, 
  count,
  ...rest
}: { gameId: number, count: number  } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>> & ClaimBarProps) {
  const claimableGame = useSelector(state => selectGameById(state, gameId)) ?? game;
  return (
   <BarWrapper tw="grid grid-cols-10 w-full justify-between" {...rest}>
    <Count tw="w-[fit-content]">{parseBarCount(count)}</Count>
    {/* date */}
    <DateColumn>{dateFromTs(new Date(claimableGame.createdAt as string).getTime() * 1000)}</DateColumn>
    
    <WagerTypeBadgeWrapper tw="col-span-3 w-[fit-content]">
      <BadgeText>{formatEther(claimableGame.wager.wagerAmount)}</BadgeText>
      <BadgeIcon>{renderWagerBadge(claimableGame.wager.wagerType, claimableGame.wager.wagerCurrency)}</BadgeIcon>
      <BadgeText>{claimableGame.wager.wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>


    <div tw="col-span-2">
      <GameTypeBadgeWrapper tw="w-[fit-content]">
      {renderGameTypeBadge(claimableGame.gameType)}
      <BadgeText>{BADGE_TEXTS[claimableGame.gameType]}</BadgeText>
      </GameTypeBadgeWrapper>
    </div>
    

    {/* escrow link button */}
    <div tw="col-span-3">
      <div tw="flex items-center justify-end gap-x-[24px]">
        <div tw="flex gap-x-[8px] ">
          <NormalText>view on explorer</NormalText>
          <Link to={constructBlockExplorerHash(networkId, claimableGame.transactionHash as HexishString)} target="_blank" rel="noreferrer"><ArrowTrSquareIcon /></Link>
        </div>
        {/* render for a joinable game */}
        <ButtonForClaiming  game={game} />
      </div>
    </div>
   </BarWrapper>
  )
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
