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
 AllPossibleCoinSides
} from "../../models"
import { HelpCircleIcon, ClockIcon, SparkleIcon } from "../../assets/icons"
import { NormalText } from "../CreateGameCard/types"
import { PlayGameContainer } from "./types"
import { PlayGamePlayerCard } from "../PlayGamePlayerCard"
import { CoinFlip } from "../CoinFlip"
import { useRoll } from "../CoinFlip/animations"
import Button from "../../common/Button"
import { useUpdateGameMutation } from "../../containers/App/api"
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
 gameAttributes: WegaAttributes
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
 gameAttributes
}: PlayGameSectionProps) => {
 const [updateGame] = useUpdateGameMutation()
 const maxTurns = 1;
 const { showModal, hideModal } = useGlobalModalContext()
 
 const handleOnRollClick = async (gameUuid: string, turn: number) => {
  // should trigger the animation here
  try {
    await updateGame({ uuid: gameUuid, currentTurn: turn }).unwrap();
  } catch (e) {
    console.log(e)
  }
 }

 // setup the animation
 const coinRef = useRef<any>(null)
 const isPlayerOne = players && wallet.address.toLowerCase() === players[0]?.walletAddress?.toLowerCase();
 const playerFlipChoice = Number(gameAttributes.filter(a => a.key === 'players[0].flipChoice')[0].value) as AllPossibleCoinSides
 const oppFlipChoice =  Number(gameAttributes.filter(a => a.key === 'players[1].flipChoice')[0].value) as AllPossibleCoinSides
 const { triggerRoll, rolled } = useRoll(coinRef);
 
 useEffect(() => {
  if(rolled){
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
    triggerRoll([playerFlipChoice, oppFlipChoice][indexOfMaxValue]);
  }
 }, [players.length, wallet?.address, gameInfo?.currentTurn, maxTurns, rolled]);

 return (
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
     status={"connected"}
     player={user}
     wager={game.wager}
     isRolling={gameInfo.rollerIndex === 0}
     isGameOver={gameInfo.currentTurn >= maxTurns}
     coinFlipChoice={isPlayerOne ? playerFlipChoice : oppFlipChoice}
    />
    
    <CoinFlip coinRef={coinRef} />

    {/* searching for opponent box */}
    <PlayGamePlayerCard
     status={isGamePlayable ? "connected" : "connecting"}
     opponent={players.filter((player) => player.uuid !== user.uuid)[0]}
     wager={game.wager}
     isRolling={gameInfo.rollerIndex !== 0}
     isGameOver={gameInfo.currentTurn >= maxTurns}
     coinFlipChoice={isPlayerOne ? oppFlipChoice : playerFlipChoice}
    />
   </div>
   {
    <Button
     onClick={() => handleOnRollClick(game.uuid, game.currentTurn + 1)}
     buttonType="primary"
     disabled={!isGamePlayable || (gameInfo.currentTurn >= maxTurns) ? true : false}
     tw="w-[25%] flex justify-center items-center"
    >
     <SparkleIcon tw="h-[16px] w-[16px] me-[5px]" />
     Roll
    </Button>
   }
  </PlayGameContainer>
 )
}
export default PlayCoinFlipGameSection
