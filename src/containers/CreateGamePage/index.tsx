import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderContainer, SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import PlayableGamesSection from '../../components/PlayableGamesSection';
import {  WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, AllPossibleWegaTypes  } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { selectAllGamesIds } from '../App/api';
import { useSelector } from 'react-redux';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer'
import 'twin.macro';

const CreateGamePage = () => {
  const gameIds = useSelector(state => selectAllGamesIds(state));
  const { user, network, wallet } = useWegaStore();
  const { gameType } = useParams();
  return (network?.id && wallet && user.uuid && gameType) ? (<MainContainer>
    <Helmet>
     <title>Create</title>
    </Helmet>
    <Section
    tw="min-h-[100vh]"
    direction='col'
    hdr={
     <SectionHeaderContainer tw='justify-center'>
       <SectionHeaderTitle>Choose your wager</SectionHeaderTitle>
     </SectionHeaderContainer>
    }
    >
      <CreateGameCard
        wagerType={WagerTypes[WagerTypesEnum.TOKEN]}  
        currencyType={CurrencyTypes[CurrencyTypesEnum.USDC]}
        tokenAddress={SupportedWagerTokenAddresses(network?.id as number)[CurrencyTypes[CurrencyTypesEnum.USDC]]}
        playerAddress={wallet.address}
        gameType={gameType.toUpperCase() as AllPossibleWegaTypes}
        playerUuid={user.uuid}
      />
    </Section>
    <PlayableGamesSection gameIds={gameIds} />
   </MainContainer> ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
}
export default CreateGamePage;

