import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import WordCarousel from '../../components/WordCarousel';

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
   <>Cards go here</>
  </Section>
 </>)


export default PlayPage;

