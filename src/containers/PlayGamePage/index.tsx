import Section from "../../common/Section"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { BADGE_TEXTS } from "../../common/GameBar"
import { ComponentLoader } from "../../common/loaders"
import PlayGameSection from "../../components/PlayGameSection"
import { FloatingOrbs } from "../../common/FloatingOrbs"
import MainContainer from '../../components/MainContainer';
import { useWegaStore, useFirebaseData } from "../../hooks";
import "twin.macro"

const PlayGamePage = () => {
  const { user, wallet } = useWegaStore();
  const params = useParams();
  const { game, isGamePlayable, players, gameInfo, gameAttributes, playerFlipChoices } = useFirebaseData(params.id as string);
  return game && user && players && players.length > 0 && gameInfo && wallet ? (
    <>
      <Helmet>
      <title>Play - {BADGE_TEXTS[game.gameType.toUpperCase()]}</title>
      </Helmet>
      <FloatingOrbs />
      <MainContainer tw="min-h-[85vh] justify-start">
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
        user={user}
        players={players}
        gameInfo={gameInfo}
        wallet={wallet}
        isGamePlayable={isGamePlayable}
        gameAttributes={gameAttributes}
        playerFlipChoices={playerFlipChoices}
      />
      </Section>
      </MainContainer>
      </>
    ) : (
    <ComponentLoader tw="min-w-[100vw] min-h-[100vh]" />
  )
}
export default PlayGamePage
