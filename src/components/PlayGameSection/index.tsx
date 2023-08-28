/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// @ts-nocheck
// import { useSelector } from 'react-redux';
import { AllPossibleWegaTypes } from "../../models"
// import { selectGameById } from '../../containers/App/api';
// import { SectionContainer } from '../../common/Section/types';
import { HelpCircleIcon, ClockIcon } from '../../assets/icons';
import { NormalText } from '../../common/CreateGameCard/types';
import { FloatingOrbs } from '../../common/FloatingOrbs';
import 'twin.macro';

interface PlayGameSectionProps {
 gameType?: AllPossibleWegaTypes;
 gameId: number;
}
export const PlayGameSection: React.FC<PlayGameSectionProps>= ({
 gameId,
}: PlayGameSectionProps) => {
 // const game = useSelector(state => selectGameById(state, gameId));
 
 return (<>
   <div tw="flex flex-col relative h-full w-full">
   <FloatingOrbs />
    {/* orbs */}
    {/* timer icon row */}
    <div tw="flex flex-row justify-center gap-x-[10px] items-center">
      <ClockIcon tw="w-[24px] h-[24px]" />
      <NormalText tw="text-shinishi">2:30</NormalText>
      <HelpCircleIcon tw="cursor-pointer" />
    </div>
    {/* plage game ui */}
    <div >
     {/* searching for opponent box */}
     {
      /* dice render
       * state - idle - rolling
       * trigger
       * winning number
      */
      }
     {/* player card */}
   </div>
   {/* roll box */}
  </div>
 </> )
 
}
