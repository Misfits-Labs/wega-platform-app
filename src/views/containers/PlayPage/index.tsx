import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import 'twin.macro';

const PlayPage = () => (<>
  <Helmet>
   <title>Play</title>
  </Helmet>
  <Section 
   direction='col' 
   title={ <WordCarousel 
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
 </>)


export default PlayPage;

