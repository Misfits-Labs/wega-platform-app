import { WinnerDeclarationContainer } from './types';
import { ExtraLargeText, NormalText } from '../../components/CreateGameCard/types';
import { CrownIcon, DownloadIcon, RestartIcon } from '../../assets/icons';
import { WagerTypeBadgeWrapper, BadgeText} from "../GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../GameBar";
import Button from '../Button';
import 'twin.macro';
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes, AllPossibleWegaTypes} from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';

import { BigNumberish, formatUnits } from 'ethers';
import { Link } from 'react-router-dom';
import { CoinflipWinnerLogo, CoinflipLoserLogo } from './GameResolutionImages'

export interface CoinflipWinnerModalProps {
  gameType: AllPossibleWegaTypes;
  wagerCurrency: AllPossibleCurrencyTypes;
  wagerType: AllPossibleWagerTypes;
  wagerAmount: BigNumberish;
  networkId: number;
  winnerFlipChoice: number;
  loserFlipChoice: number;
  hide: any;
}
const CoinflipWinnerModal = ({ 
  hide, 
  wagerCurrency, 
  wagerType, 
  wagerAmount, 
  gameType,
  winnerFlipChoice,
  networkId,
  loserFlipChoice }: CoinflipWinnerModalProps) => {
  const tokenDecimals: number = SupportedWagerTokenAddresses[wagerCurrency][networkId].decimals as number;

  return (
   <WinnerDeclarationContainer tw="items-center min-w-[546px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><NormalText tw="text-right text-blanc">Close</NormalText></button>
    </div>
    <div tw="flex flex-col items-center gap-y-[26px]">
      <div tw="flex flex-col items-center gap-y-[24px]">
        <div tw="flex flex-col items-center">
          <CrownIcon />
          <CoinflipWinnerLogo side={winnerFlipChoice} />
        </div>
        <div tw="flex flex-col items-center gap-y-[8px]">
          <div tw="flex flex-row">
            <NormalText tw="font-[17px] text-shinishi font-[300] leading-[22px] tracking-[-0.408px] font-primary mr-[8px]">Loser: </NormalText>
            <CoinflipLoserLogo side={loserFlipChoice} tw="w-[20px] h-[20px]"/>
          </div>
          <ExtraLargeText>You won!</ExtraLargeText>
        </div>
      </div>

      <WagerTypeBadgeWrapper>
        <BadgeText>{Number(parseFloat(formatUnits(BigInt(wagerAmount), tokenDecimals)).toFixed(0))}</BadgeText>
        <BadgeIcon>{renderWagerBadge(wagerType, wagerCurrency)}</BadgeIcon>
        <BadgeText>{wagerCurrency}</BadgeText>
      </WagerTypeBadgeWrapper>

      <div tw="flex gap-x-[25px] items-center">
        <Link to="/wins" tw="min-w-[197px]">
          <Button buttonType="primary" tw="flex items-center justify-center w-full">
            Claim Win
            <DownloadIcon color="#151515" tw="h-[16px] w-[16px] ms-[5px]"/>
          </Button>
        </Link>
        <Link to={`/${gameType.toLocaleLowerCase()}/create`} tw="min-w-[197px]" state={{ gameType }}>
          <Button buttonType="secondary" tw="flex items-center w-full justify-center">
            Start a new game
            <RestartIcon  tw="h-[16px] w-[16px] ms-[5px]"/>
          </Button>
        </Link>
      </div>
    </div>
   </WinnerDeclarationContainer>
  )
}
export default CoinflipWinnerModal;