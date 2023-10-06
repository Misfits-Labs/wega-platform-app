import { useEffect } from 'react';
import Section from "../../common/Section"
import { Helmet } from "react-helmet-async"
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom"
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { HexishString } from '../../models';
import { BADGE_TEXTS } from "../../common/GameBar"
import { ComponentLoader } from "../../common/loaders"
import PlayGameSection from "../../components/PlayGameSection"
import { FloatingOrbs } from "../../common/FloatingOrbs"
import MainContainer from '../../components/MainContainer';
import { selectGameById } from '../../containers/App/api';
import { useWegaStore, useFirebaseData, useBlockchainApiHooks } from "../../hooks";
import "twin.macro"

const PlayGamePage = () => {
 const { state: { gameId, gameUuid } } = useLocation();
 
 const { user, wallet } = useWegaStore();
 const { useGetGameResultsQuery, useGetWinnersQuery } = useBlockchainApiHooks;
 const game = useSelector(state => selectGameById(state, gameId));
 const { isGamePlayable, players, gameInfo, gameAttributes, playerFlipChoices } = useFirebaseData(gameUuid);
 const { getGameResults, data: gameResults } = useGetGameResultsQuery();
 const { getWinners, data: winners } = useGetWinnersQuery();
 
 useEffect(() => {
  if(game) {
   getGameResults(
    game.gameType,
    game.wager.wagerHash as HexishString,
    players.map(player => player.walletAddress as HexishString)
   );
   getWinners(game.gameType, game.wager.wagerHash as HexishString);
  }
 }, [ game?.wager.wagerHash,  players.length ]);
 
 return game && user && players && 
 players.length > 0 && 
 gameResults && 
 gameInfo && 
 wallet && 
 winners ? (<div tw="min-w-[100vw] min-h-[100vh] relative">
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
     user={user}
     players={players}
     gameResults={gameResults}
     gameInfo={gameInfo}
     wallet={wallet}
     isGamePlayable={isGamePlayable}
     winners={winners}
     gameAttributes={gameAttributes}
     playerFlipChoices={playerFlipChoices}
    />
   </Section>
  </MainContainer>
  </div>
 ) : (
   <ComponentLoader tw="min-w-[100vw] min-h-[100vh]" />
 )
}
export default PlayGamePage
