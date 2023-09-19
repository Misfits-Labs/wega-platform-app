import { User, Player, HexishString, AllPossibleCoinSides } from "../../models";
import WalletAvatar from "../../common/WalletAvatar";
import { PlayerCardContainer, PlayerAvatarWrapper } from './types';
import { NormalText } from '../CreateGameCard/types';
import { miniWalletAddress } from '../../utils'
import { WagerTypeBadgeWrapper, BadgeText} from "../../common/GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../../common/GameBar";
import { WaitForPlayerConnectCard } from '../../components/WaitForPlayerConnectCard';
import CoinSide from "../../common/CoinSide";
import { utils } from 'ethers';
import 'twin.macro';

export interface PlayGamePlayerCardProps {
 status: 'connecting' | 'connected' | 'idle' | 'rolling';
 wager: any;
 player?: User;
 opponent?: Player;
 shouldRoll: boolean;
 isGameOver: boolean;
 isRolling: boolean;
 coinFlipChoice?: AllPossibleCoinSides; 
}
export const PlayGamePlayerCard = ({ 
  status, 
  wager, 
  player, 
  opponent, 
  shouldRoll,
  isRolling,
  isGameOver, 
  coinFlipChoice 
}: PlayGamePlayerCardProps) => {
  return status !== 'connecting' ? (
    <PlayerCardContainer tw="gap-y-[7.5px]">
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
            <CoinSide coinSide={coinFlipChoice} tw="flex items-center w-[12px] py-[5px]" />
          </div>
      }
      <div tw="flex flex-col gap-y-[16px] items-center">
        <NormalText>Wager: </NormalText>
        <WagerTypeBadgeWrapper>
          <BadgeText>{utils.formatEther(wager.wagerAmount)}</BadgeText>
          <BadgeIcon>{renderWagerBadge(wager.wagerType, wager.wagerCurrency)}</BadgeIcon>
          <BadgeText>{wager.wagerCurrency}</BadgeText>
        </WagerTypeBadgeWrapper>
      </div>
      {
        !isGameOver && shouldRoll && ( 
        <div>
          <NormalText> 
            Press roll to start...
          </NormalText>
        </div>)
      }
      {
        !isGameOver && (isRolling && 
        <div>
          <NormalText> 
            Rolling...
          </NormalText>
        </div>)
      }
    </PlayerCardContainer>
  ) : <WaitForPlayerConnectCard />
}
