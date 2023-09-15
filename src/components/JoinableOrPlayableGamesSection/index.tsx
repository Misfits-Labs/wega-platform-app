import Section from '../../common/Section';
import GameBar from '../../common/GameBar';
import { GameBarHeader } from '../../common/GameBar/GameBarHeader';

interface JoinableOrPlayableGamesSectionProps extends React.Attributes {
 gameIds: number[];
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function JoinableOrPlayableGamesSection({ gameIds , ...rest }: 
  JoinableOrPlayableGamesSectionProps
) {
  
  return (
    <Section hdr="Available Matches" direction="col" className="gap-2" { ...rest } >
      <GameBarHeader />
      {
        gameIds.map(
        (dg, i) => ( <GameBar gameId={dg} key={`joinable-playable-game-bar${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" /> ))
      }
    </Section>
  )
}

export default JoinableOrPlayableGamesSection