import { AllPossibleWegaTypes, HexishString } from "../../models"
import { useEffect } from 'react';
import { selectGameById } from '../../containers/App/api';
import { useSelector } from 'react-redux';
import 'twin.macro';
import { HelpCircleIcon, ClockIcon, SparkleIcon } from '../../assets/icons';
import { NormalText } from '../../common/CreateGameCard/types';
import { PlayGameContainer } from './types';
import { PlayGamePlayerCard } from "../PlayGamePlayerCard";
import { Dice } from "../Dice";
import { useList } from 'react-use';
import Button from "../../common/Button";
import { useWegaStore, useBlockchainApiHooks, useNavigateTo} from "../../hooks";

interface PlayGameSectionProps {
 gameType?: AllPossibleWegaTypes;
 gameId: number;
}
export const PlayGameSection: React.FC<PlayGameSectionProps>= ({
 gameId,
}: PlayGameSectionProps) => {
  const { user, wallet } = useWegaStore();
  const game = useSelector(state => selectGameById(state, gameId));
  const [connectedPlayers,{ filter: filterPlayers }] =  useList(() => game ? game.players : []);
  const { useGetGameResultsQuery, useGetWinnersQuery } = useBlockchainApiHooks;
  const { getGameResults, data: gameResults } = useGetGameResultsQuery();
  const { getWinners, data: winners } = useGetWinnersQuery();
  const navigateTo = useNavigateTo(); 
  
    
  useEffect(() => {
    // navigates the user back to home page if not the correct address
    if (wallet) filterPlayers(player => player.walletAddress === wallet.address);
    if(wallet && connectedPlayers.length === 0){
      navigateTo('/', 10, {replace: true})
    }
    // get game results
    if(wallet && game) {
      getGameResults(game?.wager.wagerHash as HexishString, wallet.address as HexishString);
      getWinners(game?.wager.wagerHash as HexishString);
    }
    
    if(gameResults){
      console.log('gameResults: ', gameResults)
    } 
    if(winners){
      console.log('winners: ', winners)
    }
  }, [gameResults, winners, wallet, game]);
  
 return user && game && (<>
   <PlayGameContainer>
    {/* orbs */}
    {/* timer icon row */}
    <div tw="flex flex-row justify-center gap-x-[10px] items-center">
      <ClockIcon tw="w-[24px] h-[24px]" />
      <NormalText tw="text-shinishi">2:30</NormalText>
      <HelpCircleIcon tw="cursor-pointer" />
    </div>
    {/* plage game ui */}
    <div tw="flex gap-x-[25px] items-center justify-center">
      {/* player card */}
      <PlayGamePlayerCard
        status={'connected'} 
        player={user} 
        players={game.players}
        wager={game.wager} 
      />
      {
        /* dice render
        * state - idle - rolling
        * trigger
        * winning number
        */
      }
      <Dice />
      {/* searching for opponent box */}
      <PlayGamePlayerCard
        status={'connecting'} 
        player={user} 
        players={game.players}
        wager={game.wager}
      />
   </div>
    <Button buttonType="primary" tw="w-[25%] flex justify-center items-center">
      <SparkleIcon tw="h-[16px] w-[16px] me-[5px]"/> Roll
    </Button>
   {/* roll box */}
  </PlayGameContainer>
 </> )
 
}
