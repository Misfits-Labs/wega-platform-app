import Section from '../../common/Section';
import 'twin.macro';
import { 
 LargeText, 
} from "../../components/CreateGameCard/types";
import {
  SectionHeader,
 } from "../../common/Section/types"
interface ClaimNFTWinsSection extends React.AllHTMLAttributes<HTMLDivElement> {
 gameIds: number[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClaimNFTWinsSection({ gameIds , ...rest }: ClaimNFTWinsSection) {
  // filter out the games of which the user is not the winner
  return (
    <Section hdr={
      <SectionHeader tw="w-full self-start">NFTs won</SectionHeader>
    } direction="col" tw="gap-y-[24px]" { ...rest } >
      <LargeText tw="text-shinishi text-center">Coming soon.</LargeText>
    </Section>
  )
}
export default ClaimNFTWinsSection;