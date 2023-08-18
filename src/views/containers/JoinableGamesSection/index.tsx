import Section from '../../common/Section';
import { Wega, WegaTypes, WagerTypes, WegaTypesEnum, Wager, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum } from '../../../models';
import JoinableGameBar from '../../common/JoinableGameBar';
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
// import {  constants } from 'ethers'

// interface JoinableGamesSectionProps {
//  games:  Wega[], // game object, should be structured according to data model of games 
// }

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function JoinableGamesSection(){
  // some logic to retrieve games;
  const dummyGames: Wega[] = Array.from({ length: 5 }, () => ({
    gameType: WegaTypes[WegaTypesEnum.DICE],
    createdAt: new Date().getTime(),
    wager: new Object({ 
      wagerType: WagerTypes[WagerTypesEnum.TOKEN],
      wagerCurrency: CurrencyTypes[CurrencyTypesEnum.USDT],
      wagerAmount: 5,
     }) as Wager,
  }) as Wega);  

  return (<Section hdr="Join Matches" direction="col" className="gap-2">
    <JoinableGamesHeaderBar>
      <span>Date created</span>
      <span>Game</span>
      <span>Wager</span>
      <span>Escrow</span>
    </JoinableGamesHeaderBar>
    {
      dummyGames.map(
      (dg, i) => (<JoinableGameBar game={dg} key={`joinable-game-bar${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />))
    }
    {/* <div className="flex flex-column justify-center items-center">
    </div> */}
    </Section>
  )
}

export default JoinableGamesSection