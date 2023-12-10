import {Helmet} from 'react-helmet-async' 
import MainContainer from '../../components/MainContainer';
import { JoinableAndPlayableGames } from '../../components/WegaGames'
import PlayPageMobile from '../PlayPageMobile'
import { useWegaStore, useFirebaseData, useMediaQuery } from '../../hooks';
import PlayPageGameCardsSection from '../../components/PlayPageGameCardsSection'
import 'twin.macro';

const PlayPage = () => {
  const { user } = useWegaStore(); 
  const { gamesCount } = useFirebaseData('');
  const { windowIsCurrentlyMobile } = useMediaQuery();
  return (
    <>
      <Helmet>
      <title>Play</title>
      </Helmet>
      <MainContainer>
        {
          !windowIsCurrentlyMobile ? <PlayPageGameCardsSection />  : <PlayPageMobile />
            
        }
        { 
          !windowIsCurrentlyMobile && user?.uuid && ( <JoinableAndPlayableGames tw="md:w-[978px]" gamesCount={gamesCount ?? 0} userUuid={user.uuid} /> )   
        }
      </MainContainer>
    </>
  )
} 
export default PlayPage;

