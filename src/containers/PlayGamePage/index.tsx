import Section from "../../common/Section"
import { Helmet } from "react-helmet-async"
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { useSelector } from 'react-redux';
import { BADGE_TEXTS } from "../../common/GameBar"
import { useParams } from "react-router-dom"
import { ComponentLoader } from "../../common/loaders"
import { PlayGameSection } from "../../components/PlayGameSection"
import { FloatingOrbs } from "../../common/FloatingOrbs"
import MainContainer from '../../components/MainContainer';
import { selectGameById } from '../../containers/App/api';

import "twin.macro"

const PlayGamePage = () => {
 const { id: gameId } = useParams();
 const game = useSelector(state => selectGameById(state, Number(gameId as string)));

 return game ? (<div tw="min-w-[100vw] min-h-[100vh] relative">
  <Helmet>
   <title>Play - {BADGE_TEXTS[game.gameType.toUpperCase()]}</title>
  </Helmet>
  <FloatingOrbs />
  <MainContainer tw="min-h-[100vh]">
   <Section
    direction="col"
    hdr={
     <SectionHeaderContainer tw="flex-col items-center">
      <SectionHeaderTitle>{BADGE_TEXTS[game.gameType.toUpperCase()]}</SectionHeaderTitle>
      <SectionHeaderSubtitle tw="dark:text-shinishi">
       The player with the highest number after each round, wins.
      </SectionHeaderSubtitle>
     </SectionHeaderContainer>
    }
   >
    <PlayGameSection
     game={game}
    />
   </Section>
  </MainContainer>
  </div>
 ) : (
  <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
 )
}
export default PlayGamePage
