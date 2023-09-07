import { Wega, HexishString } from "../../models"
import { useEffect } from 'react';
import 'twin.macro';
import { HelpCircleIcon, ClockIcon, SparkleIcon } from '../../assets/icons';
import { NormalText } from '../../common/CreateGameCard/types';
import { PlayGameContainer } from './types';
import { PlayGamePlayerCard } from "../PlayGamePlayerCard";
import { Dice } from "../Dice";
import Button from "../../common/Button";
import { useWegaStore, useBlockchainApiHooks, useFirebaseData } from "../../hooks";

interface PlayGameSectionProps {
 game: Wega;
}
export const PlayGameSection: React.FC<PlayGameSectionProps>= ({
 game,
}: PlayGameSectionProps) => {
  const { user, wallet } = useWegaStore();
  const { useGetGameResultsQuery, useGetWinnersQuery } = useBlockchainApiHooks;
  const { isGamePlayable, players, currentTurn } = useFirebaseData(game.uuid as string);
  const { getGameResults, data: gameResults } = useGetGameResultsQuery();
  const { getWinners, data: winners } = useGetWinnersQuery();

  useEffect(() => {
    
    // navigates the user back to home page if not the correct address
    
    // if(wallet && connectedPlayers.length === 0){
    //   navigateTo('/', 0, {replace: true})
    // }
    // get game results
    if(game.wager.wagerHash && wallet && wallet.address) getGameResults(game.wager.wagerHash as HexishString, wallet.address as HexishString);
    getWinners(game.wager.wagerHash as HexishString);
    console.log(players)
  }, [game, players , wallet, wallet?.address ]);
  
 return user && players && players.length > 0 && (<>
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
        status={isGamePlayable ? 'connected' : 'connecting'} 
        opponent={players.filter(player => {
          return player.uuid !== user.uuid 
        })[0]}
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
