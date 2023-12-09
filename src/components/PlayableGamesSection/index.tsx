import Section from '../../common/Section';
import GameBar  from '../../common/GameBar'
import {GameBarHeader}  from '../../common/GameBar/GameBarHeader'
import { Wega } from '../../models';
interface PlayableGamesSectionProps extends React.Attributes {
 games: Wega[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function PlayableGamesSection({ games , ...rest }: PlayableGamesSectionProps){
  return (<Section hdr="Playable games" direction="col" className="gap-2" { ...rest } >
    <GameBarHeader />
    {
      games.map((dg) => (<GameBar loadedFromApi={dg} gameId={dg.id} key={`playable-game-bar${dg.id}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />))
    }
    </Section>
  )
}
export default PlayableGamesSection;