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
import { selectAllGamesIds } from '../App/api';
import { useSelector } from 'react-redux';

const PlayPage = () => {
  const gameIds = useSelector(state => selectAllGamesIds(state));
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
    <JoinableGamesSection gameIds={gameIds} />
  </>)
} 

export default PlayPage;

