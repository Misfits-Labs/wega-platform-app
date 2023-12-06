import { useEffect, useState, useRef } from 'react';
import { Wega, HexishString, GameInfoType, User, Player, Wallet, WegaState } from "../../models"
import { SparkleIcon } from '../../assets/icons';
// import { NormalText } from '../CreateGameCard/types';
import { PlayGameContainer, MinimumGameRounds } from './types';
import { PlayGamePlayerCard } from "../PlayGamePlayerCard";
import { Dice } from "../Dice";
import { useRoll } from '../Dice/animations';
import { useUpdateGameMutation } from "./apiSlice";
import { useGlobalModalContext, MODAL_TYPES } from "../../common/modals";
import Button from "../../common/Button";
import { getGameStatus, isCurrentUserGameCreator } from './utils';
import 'twin.macro';

interface PlayGameSectionProps {
 game: Wega;
 user: User;
 players: Player[];
 gameResults: any;
 gameInfo: GameInfoType;
 wallet: Wallet;
 isGamePlayable: boolean;
 winners: HexishString[];
}

const PlayDiceGameSection: React.FC<PlayGameSectionProps>= ({
 game,
 user,
 players,
 gameResults,
 gameInfo,
 wallet,
 isGamePlayable,
 winners
}: PlayGameSectionProps) => {
  const [updateGame, ] = useUpdateGameMutation();
  const maxTurns = MinimumGameRounds[game.gameType] * game.requiredPlayerNum;
  const { showModal, hideModal } = useGlobalModalContext();
  // const [hasRolled, setHasRolled] = useState<boolean>(false); 
  const [shouldCurrentPlayerRoll, setShouldCurrentPlayerRoll] = useState<boolean>(false);
  
  const getShouldPlayerRoll = (players: any, gameInfo: any, wallet: any) => {
    const currentRoller = players[gameInfo.rollerIndex].walletAddress;
    if(currentRoller.toLowerCase() === wallet.address.toLowerCase()){
      setShouldCurrentPlayerRoll(true);
    } else {
      setShouldCurrentPlayerRoll(false);
    }
  }
  
  const getWinnerAndLoserResults = (): { winnerFinalResult: number, loserFinalResult: number } => {
    let winnerFinalResult: number = -1, loserFinalResult: number = -1;
    players.forEach((player, i) => {
      if (player.walletAddress?.toLowerCase() === winners[0].toLowerCase()) {
        winnerFinalResult = gameResults[i][gameResults[i].length -1]
      } else {
        loserFinalResult = gameResults[i][gameResults[i].length -1];
      }
    });
    return { winnerFinalResult, loserFinalResult };
  } 

  const handleOnRollClick = async (gameUuid: string, turn: number) => {
    if(turn < maxTurns) {
      try {
        return await updateGame({ uuid: gameUuid, currentTurn: turn }).unwrap();
      } catch (e) {
        console.log(e)
      }
    } else {
      const gameWinners = winners.map(w => ({ winner: w }));
      try {
        return await updateGame({ uuid: game.uuid, currentTurn: turn, state: WegaState.COMPLETED, gameWinners  }).unwrap();
      } catch(e) {
        console.log(e)
      }
    }
  }

  // setup animation
  const diceRef = useRef<any>(null);
  const { rolled, triggerRoll } = useRoll(diceRef,
    () => {
      // setHasRolled(false)
    }, // on animation begin
    () =>  {
      // setHasRolled(true);
    } // on animation end
  );

  useEffect(() => {
    if(rolled) {
      if(gameInfo.currentTurn >= maxTurns) {
        if(winners.length > 1) {
          showModal(MODAL_TYPES.DICE_WINNER_MODAL, { 
            wagerCurrency: game.wager.wagerCurrency, 
            wagerType: game.wager.wagerType, 
            wagerAmount: game.wager.wagerAmount,
            gameType: game.gameType,
            networkId: game.networkId,
            results: getWinnerAndLoserResults(),
            hide: hideModal,
          });
        } else {
          if(winners[0].toLowerCase() === wallet.address.toLowerCase()) {
            showModal(MODAL_TYPES.DICE_WINNER_MODAL, { 
              wagerCurrency: game.wager.wagerCurrency, 
              wagerType: game.wager.wagerType, 
              wagerAmount: game.wager.wagerAmount,
              gameType: game.gameType,
              networkId: game.networkId,
              results: getWinnerAndLoserResults(),
              hide: hideModal,
            });
          } else {
            showModal(MODAL_TYPES.DICE_LOSER_MODAL, { 
              gameType: game.gameType,
              results: getWinnerAndLoserResults(),
              networkId: game.networkId,
              hide: hideModal,
            });
          }
        }
      }
    }
    if(wallet && gameInfo && players) getShouldPlayerRoll(players, gameInfo, wallet);
    if(gameInfo && gameResults.length > 0 && gameInfo.currentTurn > 0 && !rolled) {
      const animationTarget = gameResults[gameInfo.rollerIndex === 0 ? 1 : 0][gameInfo.currentRound];
      triggerRoll(animationTarget, gameInfo.currentTurn >= maxTurns);
    }
  }, [ 
    gameResults.length,
    players.length,
    wallet?.address, 
    gameInfo?.currentTurn,
    gameInfo?.currentRound,
    rolled,
  ]);
 return players && gameInfo && <PlayGameContainer>
    {/* orbs */}
    {/* timer icon row */}
    {/* <div tw="flex flex-row justify-center gap-x-[10px] items-center">
      <ClockIcon tw="w-[24px] h-[24px]" />
      <NormalText tw="text-shinishi">2:30</NormalText>
      <HelpCircleIcon tw="cursor-pointer" />
    </div> */}
    {/* plage game ui */}
    <div tw="flex gap-x-[25px] items-center justify-center">
      {/* player card */}
      <PlayGamePlayerCard
        gameType={game.gameType}
        status={getGameStatus({ 
          isGamePlayable,
          isCurrentUserGameCreator: isCurrentUserGameCreator(game.creatorUuid, user?.uuid as string), 
          isCurrentUserTurn: shouldCurrentPlayerRoll,
        })}
        player={user}
        wager={game.wager}
        isGameOver={rolled}
        hasAnyOneRolled={gameInfo.currentTurn > 0}
        networkId={game.networkId}
      />
      <Dice diceRef={diceRef} />
      {/* searching for opponent box */}
      <PlayGamePlayerCard
        gameType={game.gameType}
        status={getGameStatus({ 
          isGamePlayable,
          isCurrentUserGameCreator: !isCurrentUserGameCreator(game.creatorUuid, user?.uuid as string),
          isCurrentUserTurn: !shouldCurrentPlayerRoll,
        })} 
        opponent={players.filter(player => player.uuid !== user.uuid)[0]}
        wager={game.wager}
        isGameOver={rolled}
        hasAnyOneRolled={gameInfo.currentTurn > 0}
        networkId={game.networkId}
      />
   </div>
    {
      <Button onClick={() => handleOnRollClick(game.uuid, gameInfo.currentTurn + 1)}
        buttonType="primary" 
        disabled={
          !isGamePlayable || (gameInfo.currentTurn >= maxTurns) ? true : shouldCurrentPlayerRoll ? false : true
        }
        tw="w-[25%] flex justify-center items-center" 
        >
        <SparkleIcon tw="h-[16px] w-[16px] me-[5px]"/>Roll
      </Button>
    }
  </PlayGameContainer>
}
export default PlayDiceGameSection;