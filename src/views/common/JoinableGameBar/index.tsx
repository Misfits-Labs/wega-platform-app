import { 
 GameTypeBadgeWrapper, 
 DateColumn, 
 BarWrapper, 
 BadgeText,
 WagerTypeBadgeWrapper
} from './types';
import { 
 AllPossibleWegaTypes, 
 Wega, 
 WegaTypesEnum, 
 WegaTypes, 
 WagerTypes, 
 WagerTypesEnum, 
 AllPossibleWagerTypes } from '../../../models';
import { dateFromTs, parseIntFromBigNumber} from '../../../utils';
import{ BarDiceIcon, BarCoinIcon, USDCIcon, StarLoaderIcon } from '../../../assets/icons';
import Button from '../Button';


export const BADGE_TEXTS: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 'Dice',
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 'Coin flip'
}

function JoinableGameBar({ game , ...rest}: { game: Wega } & React.Attributes & Partial<React.AllHTMLAttributes<HTMLDivElement>>) {
  return (
   <BarWrapper {...rest}>
    {/* date */}
    <DateColumn>{dateFromTs(game.date)}</DateColumn>
    
    <GameTypeBadgeWrapper>
     {renderGameTypeBadge(game.type)}
     <BadgeText>{BADGE_TEXTS[game.type]}</BadgeText>
    </GameTypeBadgeWrapper>
    
    <WagerTypeBadgeWrapper>
     <BadgeText>{parseIntFromBigNumber(game.wager.player1TokenAmount)}</BadgeText>
     <BadgeIcon>{renderWagerBadge(game.wager.type)}</BadgeIcon>
     <BadgeText>{game.wager.currency}</BadgeText>
    </WagerTypeBadgeWrapper>

    {/* escrow link button */}
    
    {/* play button should get activated on action */} 
    <div>
     <Button buttonType="secondary"  className="flex items-center">
      <>
       Play
       <StarLoaderIcon className="dark:fill-blanc h-[fit-content] w-[fit-content] ms-[5px]" />
      </>
     </Button>
    </div>
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

export const BadgeIcon = (props: { children: React.ReactElement }) => <div className="w-[24px] h-[24px]">{props.children}</div> 

const renderGameTypeBadge = (gameType: AllPossibleWegaTypes) => {
 const BadgeComponent = BADGE_GAME_TYPE_COMPONENTS[gameType];
 return <BadgeComponent /> ?? null;
}

const renderWagerBadge = (wagerType: AllPossibleWagerTypes) => {
 const BadgeComponent = BADGE_WAGER_TYPE_COMPONENTS[wagerType];
 return <BadgeComponent /> ?? null;
}


// const renderComponent = () => {
//  const ModalComponent = MODAL_COMPONENTS[modalType!]
//  if (!modalType || !ModalComponent) {
//    return null
//  }
//  return <ModalComponent {...modalProps} />
// }
