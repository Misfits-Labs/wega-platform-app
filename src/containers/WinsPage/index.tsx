import {Helmet} from 'react-helmet-async' 
import 'twin.macro';
import Section from '../../common/Section';
import ClaimWinsTokenSection from '../../components/ClaimTokenWinsSection';
import ClaimNFTWinsSection from '../../components/ClaimNFTWinsSection';
import { useGetGamesQuery } from '../App/api';
import { ComponentLoader } from '../../common/loaders';
import MainContainer from '../../components/MainContainer';
import {
 SectionHeaderTitle,
 SectionHeaderSubtitle,
 SectionHeaderContainer
} from "../../common/Section/types"
import { useWegaStore } from '../../hooks' 

const WinsPage = () => {
  const { user, wallet } = useWegaStore();
  const { claimableGameIds, isLoading } = useGetGamesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      claimableGameIds: data ? Object.entries(data.entities)
      .filter(([, game]: any) => game.players.filter((player: any) => player.walletAddress.toLowerCase() === wallet?.address.toLowerCase()).length > 0)
      .map(([id,]: any) => Number(id)) : [],
      isLoading,
    })
  })

  return (
    <>
      <Helmet>
      <title>Claim</title>
      </Helmet>
      <MainContainer tw="min-h-[100vh]">
       <Section
        direction='col' 
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
          !isLoading && wallet && wallet?.address && user?.uuid ? 
          <>
            <ClaimWinsTokenSection gameIds={[ ...claimableGameIds ]} /> 
            <ClaimNFTWinsSection gameIds={[ ...claimableGameIds ]} />
          </>
          : <ComponentLoader tw="w-full" /> 
        }
      </MainContainer>
    </>
  )
} 

export default WinsPage;

