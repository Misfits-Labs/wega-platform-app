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
  AllPossibleWegaTypes
} from '../../models';
import { ComponentLoader } from '../../common/loaders'
import MainContainer from '../../components/MainContainer';
import { FloatingOrbs } from "../../common/FloatingOrbs";
import { BADGE_TEXTS } from '../../common/GameBar';
import 'twin.macro';

const CreateGamePage = () => {
  const { state } = useLocation();
  return state ? ( <>
    <Helmet>
      <title>Create - {BADGE_TEXTS[state.gameType.toUpperCase()]} </title>
    </Helmet>
    <FloatingOrbs />
    <MainContainer>
      <Section
      tw="min-h-[75vh]"
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
          gameType={state.gameType.toUpperCase() as AllPossibleWegaTypes}
        />
      </Section>
    </MainContainer>
  </>) : <ComponentLoader tw="min-w-[100vw] min-h-[100vh]" />
}
export default CreateGamePage;

