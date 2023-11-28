import { useEffect } from 'react';
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
import { useWegaStore, useFirebaseData, useNavigateTo } from "../../hooks";
import "twin.macro"

const PlayGamePage = () => {
  const { user, wallet } = useWegaStore();
  const params = useParams();
  const navigateToHomePage = useNavigateTo();
  const { game, isGamePlayable, players, gameInfo, gameAttributes, playerFlipChoices } = useFirebaseData(params.id as string);
  useEffect(() => {
    // check if the user is a part of the game
    if(wallet && game && !game.players.map(p => p.walletAddress?.toLowerCase()).includes(wallet?.address)) navigateToHomePage(`/`, 1, { replace: true });
  }, [wallet?.address]);
  return game && user && players && players.length > 0 && gameInfo && wallet ? (
    <>
      <Helmet>
      <title>Play - {BADGE_TEXTS[game.gameType.toUpperCase()]}</title>
      </Helmet>
      <FloatingOrbs  />
      <MainContainer tw="justify-start h-[max-content]">
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
