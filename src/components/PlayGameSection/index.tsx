import { Wega, HexishString } from "../../models"
import { useEffect, useState } from 'react';
import 'twin.macro';
import { HelpCircleIcon, ClockIcon, SparkleIcon } from '../../assets/icons';
import { NormalText } from '../../common/CreateGameCard/types';
import { PlayGameContainer, MinimumGameRounds } from './types';
import { PlayGamePlayerCard } from "../PlayGamePlayerCard";
import { Dice } from "../Dice";
import Button from "../../common/Button";
import { useWegaStore, useBlockchainApiHooks, useFirebaseData } from "../../hooks";
import { useUpdateGameMutation } from "../../containers/App/api";
import { useGlobalModalContext, MODAL_TYPES } from "../../common/modals";
import { ComponentLoader } from "../../common/loaders";

interface PlayGameSectionProps {
 game: Wega;
}

export const PlayGameSection: React.FC<PlayGameSectionProps>= ({
 game,
}: PlayGameSectionProps) => {
  const { user, wallet } = useWegaStore();
  const { useGetGameResultsQuery, useGetWinnersQuery } = useBlockchainApiHooks;
  const [updateGame, ] = useUpdateGameMutation();
  const { isGamePlayable, players, gameInfo } = useFirebaseData(game.uuid as string);
  const { getGameResults, data: gameResults } = useGetGameResultsQuery();
  const { getWinners, data: winners } = useGetWinnersQuery();
  const maxTurns = MinimumGameRounds[game.gameType] * game.requiredPlayerNum;
  const { showModal, hideModal } = useGlobalModalContext();
  const [shouldCurrentPlayerRoll, setShouldCurrentPlayerRoll] = useState<boolean>(false);
  
  const getShouldPlayerRoll = (players: any, gameInfo: any, wallet: any) => {
    const currentRoller = players[gameInfo.rollerIndex].walletAddress;
    if(currentRoller.toLowerCase() === wallet.address.toLowerCase()){
      setShouldCurrentPlayerRoll(true);
    } else {
      setShouldCurrentPlayerRoll(false);
    }
  }

  const handleOnRollClick = async (gameUuid: string, turn: number) => {
    // should trigger the animation here
    try {
      if(turn == maxTurns) return await updateGame({ uuid: gameUuid, currentTurn: turn, state: "PLAYED" }).unwrap();
      return await updateGame({ uuid: gameUuid, currentTurn: turn }).unwrap();
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getGameResults(
      game.gameType, 
      game.wager.wagerHash as HexishString, 
      players.map(player => player.walletAddress as HexishString)
    );
    getWinners(game.gameType, game.wager.wagerHash as HexishString);
    if(wallet && winners && winners.length && gameInfo && game && gameInfo.currentTurn === maxTurns) {
      if(winners.length > 1) {
        showModal(MODAL_TYPES.WINNER_DECLARATION_WINNER_MODAL, { 
          wagerCurrency: game.wager.wagerCurrency, 
          wagerType: game.wager.wagerType, 
          wagerAmount: game.wager.wagerAmount,
          gameType: game.gameType,
          hide: hideModal,
        });
      } else {
        if(winners[0].toLowerCase() === wallet.address.toLowerCase()) {
          showModal(MODAL_TYPES.WINNER_DECLARATION_WINNER_MODAL, { 
            wagerCurrency: game.wager.wagerCurrency, 
            wagerType: game.wager.wagerType, 
            wagerAmount: game.wager.wagerAmount,
            gameType: game.gameType,
            hide: hideModal,
          });
        } else {
          showModal(MODAL_TYPES.WINNER_DECLARATION_LOSER_MODAL, { 
            gameType: game.gameType,
            hide: hideModal,
          });
        }
      }
    }
    if(wallet && gameInfo && players) getShouldPlayerRoll(players, gameInfo, wallet);
  }, [
    game.wager.wagerHash, 
    players.length , 
    wallet?.address, 
    gameInfo?.currentTurn, 
    gameResults?.length
  ]);
  
 return user && players && players.length > 0 && gameResults && gameResults.length && gameInfo ? ( <>
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
        isRolling={gameInfo.rollerIndex === 0}
        isGameOver={gameInfo.currentTurn === maxTurns}
      />
      <Dice 
        gameResults={gameResults} 
        currentRound={gameInfo.currentRound} 
        rollerIndex={gameInfo.rollerIndex} 
        currentTurn={gameInfo.currentTurn} 
        isGamePlayable={isGamePlayable} 
      />
      {/* searching for opponent box */}
      <PlayGamePlayerCard
        status={isGamePlayable ? 'connected' : 'connecting'} 
        opponent={players.filter(player => player.uuid !== user.uuid)[0]}
        wager={game.wager}
        isRolling={gameInfo.rollerIndex !== 0}
        isGameOver={gameInfo.currentTurn === maxTurns}
      />
   </div>
    {
      <Button onClick={() => handleOnRollClick(game.uuid, game.currentTurn + 1)} 
        buttonType="primary" 
        disabled={gameInfo.currentTurn === maxTurns ? true : shouldCurrentPlayerRoll ? false : true}
        tw="w-[25%] flex justify-center items-center" 
        >
        <SparkleIcon tw="h-[16px] w-[16px] me-[5px]"/>Roll
      </Button>
    }

  </PlayGameContainer>
 </>) : <ComponentLoader />
}
