import { Helmet } from 'react-helmet-async'; 
import {  useLocation } from 'react-router-dom';
import Section from '../../common/Section';
import { SectionHeaderContainer, SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../components/CreateGameCard';
import { 
  WagerTypes, 
  WagerTypesEnum, 
  CurrencyTypes, 
  CurrencyTypesEnum, 
  AllPossibleWegaTypes, 
  WegaTypesEnum, 
  WegaTypes 
} from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import MainContainer from '../../components/MainContainer';
import { FloatingOrbs } from "../../common/FloatingOrbs";
import { BADGE_TEXTS } from '../../common/GameBar';
import 'twin.macro';

const CreateGamePage = () => {
  const { state } = useLocation();
  const { user, network, wallet } = useWegaStore();

  return (
    network && 
    network?.id && 
    wallet && 
    user.uuid && 
    state 
  ) ? (<div tw="min-w-[100vw] min-h-[100vh] relative">
    <Helmet>
      <title>Create - {BADGE_TEXTS[state.gameType.toUpperCase()]} </title>
    </Helmet>
    <FloatingOrbs />
    <MainContainer>
      <Section
      tw="min-h-[max-content]"
      className={`${state.gameType === WegaTypes[WegaTypesEnum.COINFLIP] ? 'mt-[7.5rem]' : 'mt-[7.5rem]' }`}
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
          gameType={state.gameType.toUpperCase() as AllPossibleWegaTypes}
          playerUuid={user.uuid}
          network={network}
        />
      </Section>
    </MainContainer>
  </div>) : <ComponentLoader tw="min-w-[100vw] min-h-[100vh]" />
}
export default CreateGamePage;

