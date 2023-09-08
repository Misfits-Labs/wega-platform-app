import { WinnerDeclarationContainer } from './types';
import { ExtraLargeText, NormalText } from '../CreateGameCard/types';
import { CrownIcon, StarLoaderIcon, RestartIcon } from '../../assets/icons';
import { WagerTypeBadgeWrapper, BadgeText} from "../GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../GameBar";
import Button from '../Button';
import 'twin.macro';
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes, AllPossibleWegaTypes} from '../../models';
import { BigNumberish, utils } from 'ethers';
import { Link } from 'react-router-dom';

export interface GameWinnerDeclarationModalProps {
  gameType: AllPossibleWegaTypes,
  wagerCurrency: AllPossibleCurrencyTypes,
  wagerType: AllPossibleWagerTypes,
  wagerAmount: BigNumberish,
  hide: any,
}
export const GameWinnerDeclarationModal = ({ 
  hide, 
  wagerCurrency, 
  wagerType, wagerAmount, gameType }: GameWinnerDeclarationModalProps) => {
  
  return (
   <WinnerDeclarationContainer tw="items-center gap-y-[26px] min-w-[546px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><NormalText tw="text-right">Close</NormalText></button>
    </div>
    <CrownIcon />
    <ExtraLargeText>You won!</ExtraLargeText>
    <WagerTypeBadgeWrapper>
      <BadgeText>{utils.formatEther(wagerAmount)}</BadgeText>
      <BadgeIcon>{renderWagerBadge(wagerType, wagerCurrency)}</BadgeIcon>
      <BadgeText>{wagerCurrency}</BadgeText>
    </WagerTypeBadgeWrapper>
    <div tw="flex gap-x-[25px] items-center">
      <Link to="/wins" tw="min-w-[197px]">
        <Button buttonType="primary" tw="flex items-center justify-center w-full">
          Claim Win
          <StarLoaderIcon color="#151515" tw="h-[16px] w-[16px] ms-[5px]"/>
        </Button>
      </Link>
      <Link to={`/${gameType.toLocaleLowerCase()}/create`} tw="min-w-[197px]">
        <Button buttonType="secondary" tw="flex items-center w-full justify-center">
          Start a new game
          <RestartIcon  tw="h-[16px] w-[16px] ms-[5px]"/>
        </Button>
      </Link>
    </div>
   </WinnerDeclarationContainer>
  )
}
