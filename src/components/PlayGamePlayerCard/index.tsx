import { User, Player, HexishString } from "../../models";
import WalletAvatar from "../../common/WalletAvatar";
import { PlayerCardContainer, PlayerAvatarWrapper } from './types';
import { NormalText } from '../../common/CreateGameCard/types';
import { miniWalletAddress } from '../../utils'
import { WagerTypeBadgeWrapper, BadgeText} from "../../common/GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../../common/GameBar";
import { WaitForPlayerConnectCard } from '../../components/WaitForPlayerConnectCard';
import { utils } from 'ethers';
import 'twin.macro';

export interface PlayGamePlayerCardProps {
 status: 'connecting' | 'connected' | 'idle' | 'rolling';
 wager: any;
 player?: User;
 opponent?: Player;
 isRolling: boolean;
 isGameOver: boolean;
}
export const PlayGamePlayerCard = ({ status, wager, player, opponent, isRolling, isGameOver }: PlayGamePlayerCardProps) => {
  return status !== 'connecting' ? (
    <PlayerCardContainer>
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
          <BadgeText>{utils.formatEther(wager.wagerAmount)}</BadgeText>
          <BadgeIcon>{renderWagerBadge(wager.wagerType, wager.wagerCurrency)}</BadgeIcon>
          <BadgeText>{wager.wagerCurrency}</BadgeText>
        </WagerTypeBadgeWrapper>
      </div>
      {
        isRolling && !isGameOver &&
        <div>
          <NormalText> 
            Press roll to start...
          </NormalText>
        </div>
      }
    </PlayerCardContainer>
  ) : <WaitForPlayerConnectCard />
}
