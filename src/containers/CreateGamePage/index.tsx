import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderContainer, SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import PlayableGamesSection from '../../components/PlayableGamesSection';
import { WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, AllPossibleWegaTypes } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { useGetGamesQuery } from '../App/api';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer';
import { MinimumGameRounds } from '../../components/PlayGameSection/types'
import 'twin.macro';

const CreateGamePage = () => {
  const { gameType } = useParams();
  const { user, network, wallet } = useWegaStore();
  const { isLoading, playableGameIds } = useGetGamesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess  }) => ({ 
      playableGameIds: data ? isSuccess && Object.entries(data.entities).filter(([, game]: any) => game.creatorUuid === user.uuid && (game.currentTurn !== (MinimumGameRounds[game.gameType] * game.requiredPlayerNum ))).map(([id,]: any) => Number(id)) : [],
      isLoading,
      })
    }
  );

  return (
    !isLoading &&
    network?.id && 
    wallet && 
    user.uuid && 
    gameType
  ) ? (
  <MainContainer tw="min-h-[100vh]">
    <Helmet>
      <title>Create</title>
    </Helmet>
    <Section
    tw="min-h-[max-content]"
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
    <PlayableGamesSection gameIds={playableGameIds as number[]} />
  </MainContainer>
  ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
}
export default CreateGamePage;

