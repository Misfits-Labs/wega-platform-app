import { Link } from 'react-router-dom';
import { WinnerDeclarationContainer } from './types';
import { ExtraLargeText, NormalText, LargeText } from '../CreateGameCard/types';
import { StarLoaderIcon, RestartIcon } from '../../assets/icons';
import Button from '../Button';
import { AllPossibleWegaTypes} from '../../models';
import 'twin.macro';

export interface GameLoserDeclarationModal {
  gameType: AllPossibleWegaTypes,
  hide: any,
}

export const GameLoserDeclarationModal = ({ 
  gameType,
  hide
}: GameLoserDeclarationModal ) => {
  return ( <WinnerDeclarationContainer tw="items-center gap-y-[26px] min-w-[546px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><NormalText tw="text-right">Close</NormalText></button>
    </div>
    <div tw="flex flex-col w-full items-center gap-y-[48px]">
      <ExtraLargeText>{"You Lost :("}</ExtraLargeText>
      <LargeText tw="dark:text-oranjo">Orange Tip</LargeText>
      <LargeText>Play again to increase your chances</LargeText>
    </div>
    {/* <WagerTypeBadgeWrapper>
      <BadgeText>{utils.formatEther(wagerAmount)}</BadgeText>
      <BadgeIcon>{renderWagerBadge(wagerType, wagerCurrency)}</BadgeIcon>
      <BadgeText>{wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper> */}
    <div tw="flex gap-x-[25px] items-center">
      <Link to="/" tw="min-w-[197px]">
        <Button buttonType="primary" tw="flex items-center justify-center w-full">
          Join new game
          <RestartIcon  color="#151515" tw="h-[16px] w-[16px] ms-[5px]"/>
        </Button>
      </Link>
      <Link to={`/${gameType.toLocaleLowerCase()}/create`} tw="min-w-[197px]">
        <Button buttonType="secondary" tw="flex items-center w-full justify-center">
          Start a new game
          <StarLoaderIcon tw="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
        </Button>
      </Link>
    </div>
   </WinnerDeclarationContainer>
  )
}
