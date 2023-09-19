import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import 'twin.macro';
import JoinableOrPlayableGamesSection from '../../components/JoinableOrPlayableGamesSection';
import { useGetGamesQuery } from '../App/api';
import { ComponentLoader } from '../../common/loaders';
import MainContainer from '../../components/MainContainer';
import { useWegaStore } from '../../hooks';
import { MinimumGameRounds } from '../../components/PlayGameSection/types'

const PlayPage = () => {
  const { user } = useWegaStore();
  const { joinableGameIds, isLoading, playableGameIds } = useGetGamesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess  }) => ({
      joinableGameIds: data ? 
        isSuccess && Object.entries(data.entities)
          .filter(([, game]: any) => game.creatorUuid !== user.uuid && (game.currentTurn !== (MinimumGameRounds[game.gameType] * game.requiredPlayerNum)))
          .map(([id,]: any) => Number(id)) : [],
      playableGameIds: data ? 
        isSuccess && Object.entries(data.entities)
        .filter(([, game]: any) => game.creatorUuid === user.uuid && (game.currentTurn !== (MinimumGameRounds[game.gameType] * game.requiredPlayerNum)))
        .map(([id,]: any) => Number(id)) : [],
      isLoading,
      })
    }
  );
  
  return (
    <>
      <Helmet>
      <title>Play</title>
      </Helmet>
      <MainContainer tw="min-h-[100vh]">
        <Section 
          direction='col' 
          hdr={ <WordCarousel 
          pre="Play and win" 
          className='dark:text-oranjo'
          fontSize={51}
          words={[
          "Crypto",
          "NFTs",
          "Points",
          "Fractions"
          ]} 
          /> }
        >
          <div tw="container mx-auto p-0 flex flex-row justify-center items-center gap-[32px]">
            <DiceGameCard />
            <CoinFlipGameCard />
            <RaffleGameCard />
          </div>
        </Section>
        { !isLoading && joinableGameIds && playableGameIds && user?.uuid ? <JoinableOrPlayableGamesSection gameIds={[...joinableGameIds, ...playableGameIds ]} /> : <ComponentLoader tw="w-full" /> }
      </MainContainer>
    </>
  )
} 
export default PlayPage;

