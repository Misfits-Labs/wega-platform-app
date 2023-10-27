import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import { ComponentLoader } from '../../common/loaders';
import MainContainer from '../../components/MainContainer';
import { JoinableAndPlayableGames } from '../../components/WegaGames'
import { useWegaStore, useFirebaseData } from '../../hooks';
import 'twin.macro';

const PlayPage = () => {
  const { user } = useWegaStore(); 
  const { gamesCount } = useFirebaseData('');
  return (
    <>
      <Helmet>
      <title>Play</title>
      </Helmet>
      <MainContainer>
        <Section
          direction='col'
          hdr={ <WordCarousel 
          pre="Play and win" 
          className='dark:text-oranjo mt-[5rem] min-h-[100vh]'
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
        { user?.uuid ? <JoinableAndPlayableGames gamesCount={gamesCount} userUuid={user?.uuid} /> : gamesCount && !user.uuid ? <></> : <ComponentLoader tw="mt-20 w-full" /> }
      </MainContainer>
    </>
  )
} 
export default PlayPage;

