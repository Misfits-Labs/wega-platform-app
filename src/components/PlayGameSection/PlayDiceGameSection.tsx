import { useEffect, useState, useRef } from 'react';
import 'twin.macro';
import { Wega, HexishString, GameInfoType, User, Player, Wallet } from "../../models"
import { HelpCircleIcon, ClockIcon, SparkleIcon } from '../../assets/icons';
import { NormalText } from '../CreateGameCard/types';
import { PlayGameContainer, MinimumGameRounds } from './types';
import { PlayGamePlayerCard } from "../PlayGamePlayerCard";
import { Dice } from "../Dice";
import { useRoll } from '../Dice/animations';
import Button from "../../common/Button";
import { useUpdateGameMutation } from "../../containers/App/api";
import { useGlobalModalContext, MODAL_TYPES } from "../../common/modals";

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
  const [isRolling, setIsRolling] = useState<boolean>(false); 
  const [hasRolled, setHasRolled] = useState<boolean>(false); 
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
      return await updateGame({ uuid: gameUuid, currentTurn: turn }).unwrap();
    } catch (e) {
      console.log(e)
    }
  }
  // setup animation
  const diceRef = useRef<any>(null);
  const { rolled, triggerRoll } = useRoll(diceRef,
    () => {
      setIsRolling(true);
      setHasRolled(false)
    }, // on animation begin
    () =>  {
      setIsRolling(false);
      setHasRolled(true);
    } // on animation end
  );

  useEffect(() => {
    if(rolled){
      if(gameInfo.currentTurn >= maxTurns) {
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
    rolled
  ]);
  console.log(gameInfo.rollerIndex, shouldCurrentPlayerRoll)
 return players && gameInfo && <PlayGameContainer>
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
        isGameOver={gameInfo.currentTurn === maxTurns}
        isRolling={isRolling && !shouldCurrentPlayerRoll}
        shouldRoll={gameInfo.currentTurn > 0 ? hasRolled && shouldCurrentPlayerRoll : shouldCurrentPlayerRoll}
        isGamePlayable={isGamePlayable}
      />
      <Dice diceRef={diceRef} />
      {/* searching for opponent box */}
      <PlayGamePlayerCard
        status={isGamePlayable ? 'connected' : 'connecting'} 
        opponent={players.filter(player => player.uuid !== user.uuid)[0]}
        wager={game.wager}
        isGameOver={gameInfo.currentTurn === maxTurns}
        isRolling={isRolling && shouldCurrentPlayerRoll}
        shouldRoll={gameInfo.currentTurn > 0 ? hasRolled && !shouldCurrentPlayerRoll : !shouldCurrentPlayerRoll}
        isGamePlayable={isGamePlayable}
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

// who should roll
  // is the rollerIndex 