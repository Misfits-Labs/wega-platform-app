import {Helmet} from 'react-helmet-async' 
import Section from '../../common/Section';
import { SectionHeaderTitle } from '../../common/Section/types';
import CreateGameCard from '../../common/CreateGameCard';
import 'twin.macro';
import JoinableGamesSection from '../JoinableGamesSection';
import { WegaTypes, WagerTypes, WegaTypesEnum, Wager, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, Wega } from '../../../models';



const CreateGamePage = () => {

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
     <title>Create</title>
    </Helmet>
    <Section 
     direction='col' 
     hdr={<SectionHeaderTitle tw='justify-center'><span>Choose your wager</span></SectionHeaderTitle>}
    >
      <CreateGameCard wagerType={WagerTypes[WagerTypesEnum.TOKEN]} currencyType={CurrencyTypes[CurrencyTypesEnum.USDC]} />
    </Section>
    <JoinableGamesSection games={dummyGames} />
   </>)
} 


export default CreateGamePage;

