import { Link } from 'react-router-dom';
import { WinnerDeclarationContainer } from './types';
import {  NormalText, LargeText } from '../../components/CreateGameCard/types';
import { StarLoaderIcon, RestartIcon, SadEmojiIcon } from '../../assets/icons';
import Button from '../Button';
import { AllPossibleWegaTypes} from '../../models';
import { CoinflipWinnerLogo, CoinflipLoserLogo } from './GameResolutionImages'

import 'twin.macro';

export interface CoinflipLoserModalProps {
  gameType: AllPossibleWegaTypes;
  winnerFlipChoice: any;
  loserFlipChoice: any;
  hide: any;
}

const CoinflipLoserModal = ({ gameType, winnerFlipChoice, loserFlipChoice, hide}: CoinflipLoserModalProps) => {
  return ( <WinnerDeclarationContainer tw="items-center min-w-[546px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><NormalText tw="text-right text-blanc">Close</NormalText></button>
    </div>
    <div tw="flex flex-col items-center gap-y-[26px]">
      <div tw="flex flex-col w-full items-center gap-y-[24px]">
        <div tw="flex flex-col items-center gap-y-[16px]">
          <SadEmojiIcon />
          <CoinflipLoserLogo side={loserFlipChoice}  />
        </div>
        <div tw="flex flex-col items-center gap-y-[8px]">
          <div tw="flex flex-row">
            <NormalText tw="font-[17px] text-shinishi font-[300] leading-[22px] tracking-[-0.408px] font-primary mr-[8px]">Winner rolled: </NormalText>
            <CoinflipWinnerLogo side={winnerFlipChoice} tw="w-[20px] h-[20px]" />
          </div>
          <LargeText>You Lost, Try again!</LargeText>
        </div>
      </div>
      <div tw="flex gap-x-[25px] items-center">
        <Link to="/" tw="min-w-[197px]">
          <Button buttonType="primary" tw="flex items-center justify-center w-full">
            Join new game
            <RestartIcon  color="#151515" tw="h-[16px] w-[16px] ms-[5px]"/>
          </Button>
        </Link>
        <Link to={`/create/${gameType.toLocaleLowerCase()}`} tw="min-w-[197px]" state={{ gameType }}>
          <Button buttonType="secondary" tw="flex items-center w-full justify-center">
            Start a new game
            <StarLoaderIcon tw="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
          </Button>
        </Link>
      </div>
    </div>
   </WinnerDeclarationContainer>
  )
}
export default CoinflipLoserModal;