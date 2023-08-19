import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import 'twin.macro';
import JoinableGamesSection from '../JoinableGamesSection';
import { WegaTypes, WagerTypes, WegaTypesEnum, Wager, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, Wega } from '../../../models';

const PlayPage = () => {
  const dummyGames: Wega[] = Array.from({ length: 5 }, () => ({
    gameType: WegaTypes[WegaTypesEnum.DICE],
    createdAt: new Date().getTime(),
    wager: new Object({ 
      wagerType: WagerTypes[WagerTypesEnum.TOKEN],
      wagerCurrency: CurrencyTypes[CurrencyTypesEnum.USDT],
      wagerAmount: 5,
     }) as Wager,
  }) as Wega);  


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
    <JoinableGamesSection games={dummyGames} />
  </>)
} 

export default PlayPage;

