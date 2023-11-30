import Section from '../../common/Section';
import 'twin.macro';
import { 
 LargeText, 
} from "../../components/CreateGameCard/types";
interface ClaimNFTWinsSection extends React.Attributes {
 gameIds: number[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClaimNFTWinsSection({ gameIds , ...rest }: ClaimNFTWinsSection) {
  // filter out the games of which the user is not the winner
  return (
    <Section hdr="NFTs won" direction="col" tw="gap-y-[5rem]" { ...rest } >
      <LargeText tw="text-shinishi">Coming soon.</LargeText>
    </Section>
  )
}
export default ClaimNFTWinsSection;