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
 AllPossibleWagerTypes,
 HexishString
} from '../../models';
import { useSelector } from 'react-redux'; 
import { dateFromTs } from '../../utils';
import { BarDiceIcon, BarCoinIcon, USDCIcon, USDTIcon, ArrowTrSquareIcon } from '../../assets/icons';
import { selectGameById } from '../../components/WegaGames/apiSlice';
import { GameBarLoadingSkeleton } from '../GameBar/GameBarLoadingSkeleton';
import { formatUnits } from 'ethers';
import { ButtonForJoinableGame } from '../ButtonForJoinableGame';
import { ButtonForWaitingGame } from '../ButtonForWaitingGame';
import { useWegaStore } from '../../hooks'
import { constructBlockExplorerHash } from './utils';
import { 
  NormalText, 
} from "../../components/CreateGameCard/types";
import { Link } from 'react-router-dom';
import { SupportedWagerTokenAddresses } from '../../models/constants';
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
  const { user, network } = useWegaStore();
  const tokenDecimals: number = SupportedWagerTokenAddresses[game?.wager.wagerCurrency as AllPossibleCurrencyTypes][game?.networkId as number].decimals as number;

  return game && user?.uuid && network && tokenDecimals ? (
   <BarWrapper tw="w-full grid grid-cols-5 " {...rest}>
    {/* date */}
    <DateColumn tw="max-w-[max-content]">{dateFromTs(new Date(game.createdAt as string).getTime() * 1000)}</DateColumn>
    
    <GameTypeBadgeWrapper tw="w-[fit-content]" >
     {renderGameTypeBadge(game.gameType)}
     <BadgeText >{BADGE_TEXTS[game.gameType]}</BadgeText>
    </GameTypeBadgeWrapper>
    
    <WagerTypeBadgeWrapper >
     <BadgeText>{Number(parseFloat(formatUnits(BigInt(game.wager.wagerAmount), tokenDecimals)).toFixed(0))}</BadgeText>
     <BadgeIcon>{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</BadgeIcon>
     <BadgeText>{game.wager.wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>
    
    {/* escrow link button */}
    {/* render for a joinable game */}

    {/* tx hash */}
    <div tw="flex items-center justify-between gap-x-[8px] col-span-2">
      <div tw="flex gap-x-[8px] ">
        <NormalText>view on explorer</NormalText>
        <Link to={constructBlockExplorerHash(network.id as number, game.transactionHash as HexishString)} target="_blank" rel="noreferrer"><ArrowTrSquareIcon /></Link>
      </div>
      {/* playable game button */}
      {
        game.creatorUuid !== user.uuid && <div tw="flex justify-end">
          <ButtonForJoinableGame gameType={game.gameType} gameId={game.id} gameUuid={game.uuid} />
        </div>
      }
      {  
        game.creatorUuid === user.uuid && <div tw="flex justify-end">
          <ButtonForWaitingGame gameType={game.gameType} gameId={game.id} gameUuid={game.uuid} />  
        </div>
      }
    </div>
   </BarWrapper>
  ) : <GameBarLoadingSkeleton />
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