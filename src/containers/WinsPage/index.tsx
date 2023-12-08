import {Helmet} from 'react-helmet-async' 
import 'twin.macro';
import Section from '../../common/Section';
import ClaimWinsTokenSection from '../../components/ClaimTokenWinsSection';
import ClaimWinsDisconnectedUserSection from '../../components/ClaimWinsDisconnectedUserSection'
import ClaimOnOtherNetworkSection from '../../components/ClaimOnOtherNetworkSection'
import ClaimNFTWinsSection from '../../components/ClaimNFTWinsSection';
import MainContainer from '../../components/MainContainer';
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { useWegaStore, useFirebaseData } from '../../hooks' 

const WinsPage = () => {
  const { wallet, network } = useWegaStore();
  const { gamesCount } = useFirebaseData('');

  // TODO
    // create claimwins disconnected user section for nft claims section 
  return (
    <>
      <Helmet>
      <title>Claim</title>
      </Helmet>
      <MainContainer tw="min-h-[100vh] w-[100vw] md:w-[80vw] lg:w-[67vw] 2xl:w-[55vw]">
       <Section
        direction='col' 
        tw="w-full"
        hdr={
         <SectionHeaderContainer tw="flex-col items-center">
         <SectionHeaderTitle>Claim wins</SectionHeaderTitle>
         <SectionHeaderSubtitle tw="dark:text-shinishi">
          Claim your winnings, you deserve it.
         </SectionHeaderSubtitle>
        </SectionHeaderContainer>
        }
        >
        </Section>
        { 
          wallet && wallet?.isConnected && network && network.id ?   
          (<div tw="flex flex-col gap-y-[80px] w-full">
            <ClaimWinsTokenSection networkId={network.id} userWalletAddress={wallet?.address} gamesCount={gamesCount ?? 0} tw="w-full"/> 
            <ClaimNFTWinsSection gameIds={[]} tw="w-full" />
            <ClaimOnOtherNetworkSection tw="w-full"/>
          </div>)
          : (
            <>
              <ClaimWinsDisconnectedUserSection  gameIds={[]} tw="w-full"/> 
              <ClaimNFTWinsSection gameIds={[]} tw="mt-[80px] w-full" /> 
            </>
          )
        }
      </MainContainer>
    </>
  )
} 

export default WinsPage;

