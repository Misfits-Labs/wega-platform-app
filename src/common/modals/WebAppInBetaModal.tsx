import { WinnerDeclarationContainer } from './types';
import { Link } from 'react-router-dom'
import { ExtraLargeText, NormalText, SmallText } from '../../components/CreateGameCard/types';
import { RestartIcon } from '../../assets/icons';
import Button from '../Button';
import 'twin.macro';

export interface DiceWinnerModalProps {
  hide: any,
}
const WebAppInBetaModal = ({ hide }: DiceWinnerModalProps) => {
  return (
   <WinnerDeclarationContainer tw="items-center max-w-[550px] p-[24px] gap-y-[32px]">
    <ExtraLargeText>Wega web-app is still in Beta</ExtraLargeText>
    <NormalText tw="text-[21px] text-center text-[#787878] font-[400] font-primary leading-[22px]">We are excited for you to be able to play! The Wega platform front- and back-end are still being tested. The Wega team does not bare any responsibility for any loss of funds. Play at your own risk</NormalText>
    <div tw="flex flex-col items-center gap-y-[8px]">
      <div tw="flex gap-x-[25px] items-center">
      <Link to="https://wega.fun" tw="min-w-[197px]" target="_blank" rel="noreferrer">
        <Button buttonType="secondary" tw="flex items-center w-full justify-center">
         Return to wega.fun
          <RestartIcon  tw="h-[16px] w-[16px] ms-[5px]"/>
        </Button>
      </Link>
      <Button buttonType="primary" tw="flex items-center justify-center min-w-[197px]" onClick={hide}>
       Proceed
      </Button>
      </div>
      <SmallText tw="font-[16px] text-shinishi leading-[15px] font-primary">By proceeding you are aware of the risks of using Wega platform.</SmallText>
    </div>
   </WinnerDeclarationContainer>
  )
}
export default WebAppInBetaModal