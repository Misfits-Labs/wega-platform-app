import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import 'twin.macro';
import JoinableGamesSection from '../../components/JoinableGamesSection';
import {  WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum  } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { selectAllGamesIds } from '../App/api';
import { useSelector } from 'react-redux';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'

const CreateGamePage = () => {
  const gameIds = useSelector(state => selectAllGamesIds(state));
  const { user, network, wallet } = useWegaStore();

  return (network?.id && wallet && user.uuid) ? (<>
    <Helmet>
     <title>Create</title>
    </Helmet>
    <Section 
     direction='col' 
     hdr={<SectionHeaderTitle tw='justify-center'><span>Choose your wager</span></SectionHeaderTitle>}
    >
      <CreateGameCard 
        wagerType={WagerTypes[WagerTypesEnum.TOKEN]}  
        currencyType={CurrencyTypes[CurrencyTypesEnum.USDC]}
        tokenAddress={SupportedWagerTokenAddresses(network?.id as number)[CurrencyTypes[CurrencyTypesEnum.USDC]]}
        playerAddress={wallet.address}
      />
    </Section>
    <JoinableGamesSection gameIds={gameIds}  />
   </> ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
} 


export default CreateGamePage;

