import Section from '../../common/Section';
import GameBar  from '../../common/GameBar'
import {GameBarHeader}  from '../../common/GameBar/GameBarHeader'

interface PlayableGamesSectionProps extends React.Attributes {
 gameIds: number[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function PlayableGamesSection({ gameIds , ...rest }: PlayableGamesSectionProps){
  return (<Section hdr="Playable games" direction="col" className="gap-2" { ...rest } >
    <GameBarHeader />
    {
      gameIds.map(
      (dg, i) => (<GameBar gameId={dg} key={`playable-game-bar${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />))
    }
    </Section>
  )
}
export default PlayableGamesSection;