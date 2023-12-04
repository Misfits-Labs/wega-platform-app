import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';
import { 
  DiceGameCard,
  CoinFlipGameCard,
  RaffleGameCard
} from '../../components/GameCard';
import 'twin.macro';

const PlayPageGameCardsSection = () => {
  
  return ( <Section
                direction='col'
                tw="relative"
                hdr={ <WordCarousel 
                pre="Play and win" 
                tw='dark:text-oranjo'
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
            )
} 
export default PlayPageGameCardsSection;

