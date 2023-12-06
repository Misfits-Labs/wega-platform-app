import { User, Player, HexishString, AllPossibleCoinSides, AllPossibleWegaTypes, WegaTypesEnum, WegaTypes, Wager  } from "../../models";
import { SupportedWagerTokenAddresses } from "../../models/constants";
import WalletAvatar from "../../common/WalletAvatar";
import { PlayerCardContainer, PlayerAvatarWrapper } from './types';
import { NormalText } from '../CreateGameCard/types';
import { miniWalletAddress, format } from '../../utils'
import { WagerTypeBadgeWrapper, BadgeText} from "../../common/GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../../common/GameBar";
import { WaitForPlayerConnectCard } from '../../components/WaitForPlayerConnectCard';
import CoinSide from "../../common/CoinSide";
import 'twin.macro';



export interface PlayGamePlayerCardProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
 status: 'connecting' | 'connected' | 'idle' | 'rolling';
 networkId: number;
 gameType: AllPossibleWegaTypes;
 wager: Wager;
 player?: User;
 opponent?: Player;
 isGameOver: boolean;
 coinFlipChoice?: AllPossibleCoinSides;
 hasAnyOneRolled?: boolean;  
 isGamePlayable?: boolean;
 isWinner?: boolean;
 isPlayerOne?: boolean;
 tokenDecimals?: number;
}
export const PlayGamePlayerCard = ({ 
  status, 
  wager, 
  player, 
  opponent, 
  isGameOver, 
  coinFlipChoice,
  hasAnyOneRolled,
  isWinner, 
  isPlayerOne,
  isGamePlayable,
  gameType,
  networkId,
  ...rest
}: PlayGamePlayerCardProps) => {
  const tokenDecimals: number = SupportedWagerTokenAddresses[wager.wagerCurrency][networkId as number].decimals as number;

  return status !== 'connecting' ? (
    <PlayerCardContainer tw="gap-y-[32px]" {...rest}>
      {
        gameType === WegaTypes[WegaTypesEnum.COINFLIP] ? (
          <CoinFlipPlayerCard
            player={player}
            opponent={opponent}
            wager={wager}
            isGameOver={isGameOver}
            status={status}
            isWinner={isWinner}
            isPlayerOne={isPlayerOne}
            isGamePlayable={isGamePlayable}
            coinFlipChoice={coinFlipChoice}
            tokenDecimals={tokenDecimals}
          />
        ) : (
        <DicePlayerCard 
          player={player} 
          opponent={opponent} 
          wager={wager} 
          isGameOver={isGameOver} 
          hasAnyOneRolled={hasAnyOneRolled} 
          status={status}
          tokenDecimals={tokenDecimals}
          />
        )
      }
    </PlayerCardContainer>
  ) : <WaitForPlayerConnectCard />
}

interface DicePlayerCardProps extends 
Pick<PlayGamePlayerCardProps, 'player'>, 
Pick<PlayGamePlayerCardProps, 'opponent'>, 
Pick<PlayGamePlayerCardProps, 'wager'>, 
Pick<PlayGamePlayerCardProps, 'isGameOver'>, 
Pick<PlayGamePlayerCardProps, 'hasAnyOneRolled'>, 
Pick<PlayGamePlayerCardProps, 'status'>, 
Pick<PlayGamePlayerCardProps, 'tokenDecimals'> {}
const DicePlayerCard: React.FC<DicePlayerCardProps> = ({
  player,
  opponent,
  wager,
  isGameOver,
  status,
  hasAnyOneRolled,
  tokenDecimals
}: DicePlayerCardProps) => (
  <>
    { 
      (player || opponent) &&
      <PlayerAvatarWrapper tw="flex items-center gap-x-[15px]">
        <WalletAvatar 
          address={player && player.wallet ? player.wallet.address : opponent?.walletAddress} 
          ensImage={undefined}
          size={10} 
        />
        <NormalText>{
          player && player.wallet ? miniWalletAddress(player.wallet.address).concat('(you)') : miniWalletAddress(opponent?.walletAddress as HexishString) 
        }
        </NormalText>
      </PlayerAvatarWrapper>
    }
    <div tw="flex flex-col gap-y-[16px] items-center">
      <NormalText>Wager: </NormalText>
      <WagerTypeBadgeWrapper>
        <BadgeText>{parseFloat(format(wager.wagerAmount, tokenDecimals as number)).toFixed(0)}</BadgeText>
        <BadgeIcon>{renderWagerBadge(wager.wagerType, wager.wagerCurrency)}</BadgeIcon>
        <BadgeText>{wager.wagerCurrency}</BadgeText>
      </WagerTypeBadgeWrapper>
    </div>
    {
      !isGameOver && (status == 'idle' ? (
        <NormalText> 
          Awaiting opponent
        </NormalText>
      ) : status == 'rolling' && hasAnyOneRolled ? (
        <NormalText> 
          Rolling...
        </NormalText>
        ) : <NormalText>Press roll to start</NormalText> )
    }
  </>
) 

interface CoinflipPlayerCardProps extends 
Pick<PlayGamePlayerCardProps, 'player'>, 
Pick<PlayGamePlayerCardProps, 'opponent'>, 
Pick<PlayGamePlayerCardProps, 'wager'>, 
Pick<PlayGamePlayerCardProps, 'isGameOver'>, 
Pick<PlayGamePlayerCardProps, 'isGamePlayable'>, 
Pick<PlayGamePlayerCardProps, 'status'>,
Pick<PlayGamePlayerCardProps, 'isPlayerOne'>,
Pick<PlayGamePlayerCardProps, 'isWinner'>,
Pick<PlayGamePlayerCardProps, 'tokenDecimals'>,
Pick<PlayGamePlayerCardProps, 'coinFlipChoice'> {}
const CoinFlipPlayerCard: React.FC<CoinflipPlayerCardProps> = ({
  player,
  opponent,
  wager,
  isGameOver,
  status,
  isGamePlayable,
  isPlayerOne,
  coinFlipChoice,
  isWinner,
  tokenDecimals
}: CoinflipPlayerCardProps) => (
  <>
  <div tw="flex flex-col gap-y-[8px]">
    { 
      (player || opponent) &&
      <PlayerAvatarWrapper tw="flex items-center gap-x-[15px]">
        <WalletAvatar 
          address={player && player.wallet ? player.wallet.address : opponent?.walletAddress} 
          ensImage={undefined}
          size={10} 
        />
        <NormalText>{
          player && player.wallet ? miniWalletAddress(player.wallet.address).concat('(you)') : miniWalletAddress(opponent?.walletAddress as HexishString) 
        }
        </NormalText>
      </PlayerAvatarWrapper>
    }
    {
      coinFlipChoice && <div tw="self-center flex justify-center w-[50px] px-[5px] py-[5px] dark:bg-[#4B4B4B4D] rounded-[30px]">
          {
            coinFlipChoice == 1 ? <CoinSide coinSide={coinFlipChoice} tw={"flex items-center py-[5px] w-[13px]"} /> : <CoinSide coinSide={coinFlipChoice} tw={"flex items-center py-[7px] w-[20px]"} />
          }
        </div>
    }
    <div tw="flex flex-col gap-y-[16px] items-center">
      <NormalText>Wager: </NormalText>
      <WagerTypeBadgeWrapper>
        <BadgeText>{parseFloat(format(wager.wagerAmount, tokenDecimals as number)).toFixed(0)}</BadgeText>
        <BadgeIcon>{renderWagerBadge(wager.wagerType, wager.wagerCurrency)}</BadgeIcon>
        <BadgeText>{wager.wagerCurrency}</BadgeText>
      </WagerTypeBadgeWrapper>
    </div>
  </div>

  {
    !isGameOver && status == 'connected' && !isGamePlayable && isPlayerOne && <NormalText> 
      Awaiting opponent
    </NormalText>
  }
  {
    !isGameOver && status == 'connected' && isGamePlayable && ( isPlayerOne ? <NormalText>Press flip to start</NormalText> : <NormalText> 
    Awaiting opponent
    </NormalText>)
  }
  {
    isGameOver && status == 'connected' && (isWinner  ? <NormalText>Winner</NormalText> : <NormalText>Try again</NormalText>)
  }
  </>
) 
