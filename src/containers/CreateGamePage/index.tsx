import { Helmet } from 'react-helmet-async'; 
import {  useLocation } from 'react-router-dom';
import Section from '../../common/Section';
import { SectionHeaderContainer, SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../components/CreateGameCard';
import PlayableGamesSection from '../../components/PlayableGamesSection';
import { WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, AllPossibleWegaTypes, WegaTypesEnum, WegaTypes } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { useGetGamesQuery } from '../App/api';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import MainContainer from '../../components/MainContainer';
import { BADGE_TEXTS } from '../../common/GameBar';
import { MinimumGameRounds } from '../../components/PlayGameSection/types';
import 'twin.macro';

const CreateGamePage = () => {
  const { state } = useLocation();
  const { user, network, wallet } = useWegaStore();
  const { isLoading, joinableGameIds } = useGetGamesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({ 
        joinableGameIds: data ? isSuccess && Object.entries(data.entities)
          .filter(([, game]: any) => 
          game.creatorUuid !== user.uuid && (game.currentTurn !== (game.gameType === WegaTypes[WegaTypesEnum.COINFLIP] ? 1 : MinimumGameRounds[game.gameType] * game.requiredPlayerNum)))
          .map(([id,]: any) => Number(id)) : [],      
        isLoading,
      })
    }
  );

  return (
    !isLoading &&
    network?.id && 
    wallet && 
    user.uuid && 
    state 
  ) ? (<>
    <Helmet>
      <title>Create - {BADGE_TEXTS[state.gameType.toUpperCase()]} </title>
    </Helmet>
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
        />
      </Section>
      <PlayableGamesSection gameIds={joinableGameIds as number[]} />
    </MainContainer>
  </>) : <ComponentLoader tw="min-w-[100vw] min-h-[100vh]" />
}
export default CreateGamePage;

