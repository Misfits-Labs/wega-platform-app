import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import 'twin.macro';
import JoinableGamesSection from '../../components/JoinableGamesSection';
import { useGetGamesQuery } from '../App/api';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders';
import { filter } from 'lodash'

const PlayPage = () => {
  const { user } = useWegaStore();
  const { joinableGameIds, isLoading, playableGameIds } = useGetGamesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess  }) => ({
      joinableGameIds: data ? isSuccess && Object.entries(data.entities).filter(([, game]: any) => (filter(game.players, { uuid: user?.uuid }).length < 1)).map(([id,]: any) => Number(id)) : [],
      playableGameIds: data ? isSuccess && Object.entries(data.entities).filter(([, game]: any) => (filter(game.players, { uuid: user?.uuid }).length > 0)).map(([id,]: any) => Number(id)) : [],
      isLoading,
    })
  })
      
  return (<>
    <Helmet>
    <title>Play</title>
    </Helmet>
    <Section 
    direction='col' 
    hdr={ <WordCarousel 
      pre="Play, wager and win" 
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
    { !isLoading && joinableGameIds && playableGameIds  ? <JoinableGamesSection gameIds={[...joinableGameIds, ...playableGameIds]} /> : <ComponentLoader tw="w-full" /> }
  </>)
} 

export default PlayPage;

