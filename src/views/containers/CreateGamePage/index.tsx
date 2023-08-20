import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import { SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import 'twin.macro';
import JoinableGamesSection from '../JoinableGamesSection';
import {  WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum  } from '../../../models';
import { selectAllGamesIds } from '../../../state/features/games/gamesSlice';
import { useSelector } from 'react-redux';

const CreateGamePage = () => {
  const gameIds = useSelector(state => selectAllGamesIds(state));
  return (<>
    <Helmet>
     <title>Create</title>
    </Helmet>
    <Section 
     direction='col' 
     hdr={<SectionHeaderTitle tw='justify-center'><span>Choose your wager</span></SectionHeaderTitle>}
    >
      <CreateGameCard wagerType={WagerTypes[WagerTypesEnum.TOKEN]}  currencyType={CurrencyTypes[CurrencyTypesEnum.USDC]} />
    </Section>
    <JoinableGamesSection gameIds={gameIds}  />
   </>)
} 


export default CreateGamePage;

