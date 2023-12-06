import 'twin.macro';
import { NormalText } from '../CreateGameCard/types';
import Section from '../../common/Section';
import optimismLogo from '../../assets/images/optimisim-logo.png'
import arbitrumLogo from '../../assets/images/arbitrum-logo.png'

function ClaimOnOtherNetworkSection(props: React.AllHTMLAttributes<HTMLDivElement>)  {
  // filter out the games of which the user is not the winner
  return ( <Section hdr="Claim on other networks" direction="col" {...props}>
      
      <div tw="flex self-start gap-x-[24px] ">
        <div tw="flex px-[10px] py-[5px] rounded-[5px] bg-[#2E2E2E] justify-center items-center gap-x-[10px]">
          <img src={arbitrumLogo} alt="arbitrum-logo" tw="w-[24px] h-[24px]" />
          <NormalText>Arbitrum - Coming soon</NormalText>
        </div>

        <div tw="flex px-[10px] py-[5px] rounded-[5px] bg-[#2E2E2E] justify-center items-center gap-x-[10px]">
          <img src={optimismLogo} alt="optimism-logo"  tw="w-[24px] h-[24px]"/>
          <NormalText>Optimisim - Coming soon</NormalText>
        </div>
      </div>
    </Section> 
  )
}
export default ClaimOnOtherNetworkSection;