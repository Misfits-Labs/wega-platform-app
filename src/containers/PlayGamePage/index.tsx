import Section from "../../common/Section"
import { Helmet } from "react-helmet-async"
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { BADGE_TEXTS } from "../../common/GameBar"
import { useParams } from "react-router-dom"
import { ComponentLoader } from "../../common/loaders"
import { PlayGameSection } from "../../components/PlayGameSection"
import { FloatingOrbs } from "../../common/FloatingOrbs"
import { AllPossibleWegaTypes } from "../../models";
import MainContainer from '../../components/MainContainer'
import "twin.macro"

const PlayGamePage = () => {
 const { gameType, id: gameId } = useParams()

 return gameType && gameId ? (<div tw="min-w-[100vw] min-h-[100vh] relative">
  <Helmet>
   <title>Play - {BADGE_TEXTS[gameType?.toUpperCase()]}</title>
  </Helmet>
  <FloatingOrbs />
  <MainContainer>
   <Section
    direction="col"
    hdr={
     <SectionHeaderContainer tw="flex-col items-center">
      <SectionHeaderTitle>{BADGE_TEXTS[gameType?.toUpperCase()]}</SectionHeaderTitle>
      <SectionHeaderSubtitle tw="dark:text-shinishi">
       The player with the highest number after each round, wins.
      </SectionHeaderSubtitle>
     </SectionHeaderContainer>
    }
   >
    <PlayGameSection
     gameType={gameType.toUpperCase() as AllPossibleWegaTypes}
     gameId={parseInt(gameId)}
    />
   </Section>
  </MainContainer>
  </div>
 ) : (
  <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
 )
}
export default PlayGamePage
