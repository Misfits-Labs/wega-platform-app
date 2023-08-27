import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import 'twin.macro';
import PlayableGamesSection from '../../components/PlayableGamesSection';
import {  WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, AllPossibleWegaTypes  } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { selectAllGamesIds } from '../App/api';
import { useSelector } from 'react-redux';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';

const CreateGamePage = () => {
  const gameIds = useSelector(state => selectAllGamesIds(state));
  const { user, network, wallet } = useWegaStore();
  const { gameType } = useParams();
  return (network?.id && wallet && user.uuid && gameType) ? (<>
    <Helmet>
     <title>Create</title>
    </Helmet>
    <Section 
     direction='col' 
     hdr={<SectionHeaderTitle tw='justify-center' ><span>Choose your wager</span></SectionHeaderTitle>}
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
   </> ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
} 


export default CreateGamePage;

