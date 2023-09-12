import Section from '../../common/Section';
import ClaimBar from '../../common/ClaimBar';

interface ClaimTokenWinsSectionProps extends React.Attributes {
 gameIds: number[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function ClaimTokenWinsSection({ gameIds , ...rest }: ClaimTokenWinsSectionProps){
  
  return (
    <Section hdr="Tokens won" direction="col" className="gap-2" { ...rest } >
      {
        gameIds.map(
        (dg, i) => ( <ClaimBar count={i + 1} gameId={dg} key={`claim-wins-bar-${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]"/>))
      }
    </Section>
  )
}

export default ClaimTokenWinsSection;