import Section from '../../common/Section';
import GameBar from '../../common/GameBar';
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
// import {  constants } from 'ethers'

interface JoinableGamesSectionProps extends React.Attributes {
 gameIds: any[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function JoinableGamesSection({ gameIds , ...rest }: JoinableGamesSectionProps){
  

  return (<Section hdr="Available Matches" direction="col" className="gap-2" { ...rest } >
    <JoinableGamesHeaderBar>
      <span>Date created</span>
      <span>Game</span>
      <span>Wager</span>
      <span>Escrow</span>
    </JoinableGamesHeaderBar>
    {
      gameIds.map(
      (dg, i) => (<GameBar gameId={dg} key={`joinable-game-bar${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />))
    }
    {/* <div className="flex flex-column justify-center items-center">
    </div> */}
    </Section>
  )
}

export default JoinableGamesSection