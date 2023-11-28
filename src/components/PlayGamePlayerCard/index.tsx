import { User, Player, HexishString, AllPossibleCoinSides } from "../../models";
import WalletAvatar from "../../common/WalletAvatar";
import { PlayerCardContainer, PlayerAvatarWrapper } from './types';
import { NormalText } from '../CreateGameCard/types';
import { miniWalletAddress } from '../../utils'
import { WagerTypeBadgeWrapper, BadgeText} from "../../common/GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../../common/GameBar";
import { WaitForPlayerConnectCard } from '../../components/WaitForPlayerConnectCard';
import CoinSide from "../../common/CoinSide";
import { formatEther } from 'ethers';
import 'twin.macro';

export interface PlayGamePlayerCardProps {
 status: 'connecting' | 'connected' | 'idle' | 'rolling';
 wager: any;
 player?: User;
 opponent?: Player;
 shouldRoll: boolean;
 isGameOver: boolean;
 isRolling?: boolean;
 coinFlipChoice?: AllPossibleCoinSides;
 hasAnyOneRolled: boolean;  
}
export const PlayGamePlayerCard = ({ 
  status, 
  wager, 
  player, 
  opponent, 
  isGameOver, 
  coinFlipChoice,
  hasAnyOneRolled
}: PlayGamePlayerCardProps) => {
  
  return status !== 'connecting' ? (
    <PlayerCardContainer tw="gap-y-[32px]">
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
        coinFlipChoice && <div tw="flex justify-center w-[50px] px-[5px] py-[5px] dark:bg-[#4B4B4B4D] rounded-[30px]">
            {
              coinFlipChoice == 1 ? <CoinSide coinSide={coinFlipChoice} tw={"flex items-center py-[5px] w-[13px]"} /> : <CoinSide coinSide={coinFlipChoice} tw={"flex items-center py-[7px] w-[20px]"} />
            }
          </div>
      }
      <div tw="flex flex-col gap-y-[16px] items-center">
        <NormalText>Wager: </NormalText>
        <WagerTypeBadgeWrapper>
          <BadgeText>{formatEther(wager.wagerAmount)}</BadgeText>
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
    </PlayerCardContainer>
  ) : <WaitForPlayerConnectCard />
}
