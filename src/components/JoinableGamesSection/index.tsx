import Section from '../../common/Section';
import GameBar from '../../common/GameBar';
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
import { Wega } from '../../models';
// import {  constants } from 'ethers'

interface JoinableGamesSectionProps extends React.Attributes {
 games: Wega[]
}
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function JoinableGamesSection({ games , ...rest }: JoinableGamesSectionProps){
  
  return (<Section hdr="Available Matches" direction="col" className="gap-2" { ...rest } >
    <JoinableGamesHeaderBar>
      <span>Date created</span>
      <span>Game</span>
      <span>Wager</span>
      <span>Escrow</span>
    </JoinableGamesHeaderBar>
    {
      games.map((dg) => (<GameBar loadedFromApi={dg} gameId={dg.id} key={`joinable-game-bar${dg.id}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]"/>))
    }
    </Section>
  )
}

export default JoinableGamesSection