import Section from '../../common/Section';
import GameBar  from '../../common/GameBar'
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
// import {  constants } from 'ethers'

interface PlayableGamesSectionProps extends React.Attributes {
 gameIds: any[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function PlayableGamesSection({ gameIds , ...rest }: PlayableGamesSectionProps){
  return (<Section hdr="My Games" direction="col" className="gap-2" { ...rest } >
    <JoinableGamesHeaderBar>
      <span>Date created</span>
      <span>Game</span>
      <span>Wager</span>
      <span>Escrow</span>
    </JoinableGamesHeaderBar>
    {
      gameIds.map(
      (dg, i) => (<GameBar gameBarType="playable" gameId={dg} key={`playable-game-bar${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />))
    }
    {/* <div className="flex flex-column justify-center items-center">
    </div> */}
    </Section>
  )
}
export default PlayableGamesSection;

// Playable matches that are playable meaning
 // their are 2 players in the match
 // one of players is you