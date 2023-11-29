import { useEffect, useRef } from "react"
import "twin.macro"
import {
 Wega,
 HexishString,
 GameInfoType,
 User,
 Player,
 Wallet,
 WegaAttributes,
 AllPossibleCoinSides,
 PlayerFlipChoices,
 WegaState
} from "../../models"
import { SparkleIcon } from "../../assets/icons"
// import { NormalText } from "../CreateGameCard/types"
import { PlayGameContainer } from "./types"
import { PlayGamePlayerCard } from "../PlayGamePlayerCard"
import { CoinFlip } from "../CoinFlip"
import { useRoll } from "../CoinFlip/animations"
import Button from "../../common/Button"
import { useUpdateGameMutation } from "./apiSlice"
import { useGlobalModalContext, MODAL_TYPES } from "../../common/modals"

interface PlayGameSectionProps {
 game: Wega
 user: User
 players: Player[]
 gameResults: any
 gameInfo: GameInfoType
 wallet: Wallet
 isGamePlayable: boolean
 winners: HexishString[]
 gameAttributes: WegaAttributes;
 playerFlipChoices: PlayerFlipChoices; 
}

const PlayCoinFlipGameSection: React.FC<PlayGameSectionProps> = ({
 game,
 user,
 players,
 gameResults,
 gameInfo,
 wallet,
 isGamePlayable,
 winners,
 playerFlipChoices
}: PlayGameSectionProps) => {
 const [updateGame] = useUpdateGameMutation()
 const maxTurns = 1;
 const { showModal, hideModal } = useGlobalModalContext();
 
 const handleOnRollClick = async (gameUuid: string, turn: number) => {
  // should trigger the animation here
  const gameWinners = winners.map(w => ({ winner: w }));
  try {
    await updateGame({ uuid: gameUuid, currentTurn: turn, state: WegaState.COMPLETED, gameWinners }).unwrap();
  } catch (e) {
    console.log(e)
  }
 }

 // setup the animation
 const coinRef = useRef<any>(null)
 const isPlayerOne = players && wallet.address.toLowerCase() === players[0]?.walletAddress?.toLowerCase();
 const { triggerRoll, rolled } = useRoll(coinRef);
 
 useEffect(() => {
  if(rolled) {
    if (gameInfo.currentTurn >= maxTurns) {
     if (winners.length > 1) {
      showModal(MODAL_TYPES.WINNER_DECLARATION_WINNER_MODAL, {
       wagerCurrency: game.wager.wagerCurrency,
       wagerType: game.wager.wagerType,
       wagerAmount: game.wager.wagerAmount,
       gameType: game.gameType,
       hide: hideModal
      })
     } else {
      if (winners[0].toLowerCase() === wallet.address.toLowerCase()) {
       showModal(MODAL_TYPES.WINNER_DECLARATION_WINNER_MODAL, {
        wagerCurrency: game.wager.wagerCurrency,
        wagerType: game.wager.wagerType,
        wagerAmount: game.wager.wagerAmount,
        gameType: game.gameType,
        hide: hideModal
       })
      } else {
       showModal(MODAL_TYPES.WINNER_DECLARATION_LOSER_MODAL, {
        gameType: game.gameType,
        hide: hideModal
       })
      }
     }
    }
  }
  if(gameInfo && gameResults && gameInfo.currentTurn > 0) {
    const indexOfMaxValue = gameResults.reduce((iMax: any, x: any, i: any, arr: any) => x > arr[iMax] ? i : iMax, 0);
    triggerRoll([playerFlipChoices.playerOne as AllPossibleCoinSides, playerFlipChoices.playerTwo as AllPossibleCoinSides][indexOfMaxValue]);
  }
 }, [
  players.length, 
  wallet?.address, 
  gameInfo?.currentTurn,  
  rolled
]);

 return players && playerFlipChoices && (<PlayGameContainer>
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
      tw="gap-y-[24px]"
      status={"connected"}
      player={user}
      wager={game.wager}
      coinFlipChoice={isPlayerOne ? playerFlipChoices.playerOne : playerFlipChoices.playerTwo}
      isGamePlayable={players.length > 1}
      isGameOver={rolled && gameInfo.currentTurn === maxTurns}
      isPlayerOne={true}
      isWinner={winners.some((w: HexishString) => wallet.address.toLowerCase() === w.toLocaleLowerCase())}
      gameType={game.gameType}
    />
    <CoinFlip coinRef={coinRef} />
    {/* searching for opponent box */}
    <PlayGamePlayerCard
      status={isGamePlayable ? "connected" : "connecting"}
      opponent={players.filter((player) => player.uuid !== user.uuid)[0]}
      wager={game.wager}
      isGameOver={rolled && gameInfo.currentTurn === maxTurns}
      isGamePlayable={players.length > 1}
      coinFlipChoice={isPlayerOne ? playerFlipChoices.playerTwo : playerFlipChoices.playerOne}
      isPlayerOne={false}
      isWinner={winners.some((w: HexishString) => players.filter((player) => player.uuid !== user.uuid)[0].walletAddress?.toLowerCase() === w.toLocaleLowerCase())}
      gameType={game.gameType}

    />
   </div>
   {
    <Button
     onClick={() => handleOnRollClick(game.uuid, game.currentTurn + 1)}
     buttonType="primary"
     disabled={!isGamePlayable || (gameInfo.currentTurn >= maxTurns) ? true : false}
     tw="w-[25%] flex justify-center items-center"
    >
     <SparkleIcon tw="h-[16px] w-[16px] me-[5px]" />Flip
    </Button>
   }
  </PlayGameContainer>
 )
}
export default PlayCoinFlipGameSection
