import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderTitle } from '../../common/Section/types';
import JoinGameCard from '../../common/JoinGameCard';
import 'twin.macro';
// import JoinableGamesSection from '../../components/JoinableGamesSection';
import {  AllPossibleWegaTypes, HexIshString  } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { selectGameById } from '../App/api';
import { useSelector } from 'react-redux';
import { useWegaStore } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';
import { utils } from 'ethers';

const JoinGamePage = () => {
 const { user, network, wallet } = useWegaStore();
 const { id } = useParams();
 const game = useSelector(state => selectGameById(state, Number(id)));
  return (network?.id && wallet && user.uuid && game) ? (<>
    <Helmet>
     <title>Create</title>
    </Helmet>
    <Section 
     direction='col' 
     hdr={<SectionHeaderTitle tw='justify-center'><span>Match wager</span></SectionHeaderTitle>}
    >
      <JoinGameCard 
        wagerType={game.wager.wagerType}  
        currencyType={game.wager.wagerCurrency}
        tokenAddress={SupportedWagerTokenAddresses(network?.id as number)[game.wager.wagerCurrency]}
        playerAddress={wallet.address}
        gameType={game.gameType.toUpperCase() as AllPossibleWegaTypes}
        playerUuid={user.uuid}
        wagerAmount={Number(utils.formatEther(game.wager.wagerAmount))}
        gameUuid={game.uuid}
        escrowId={game.wager.wagerHash as HexIshString}
        gameId={game.id}
      />
    </Section>
    {/* <JoinableGamesSection gameIds={gameIds}  /> */}
   </> ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
} 


export default JoinGamePage;

