import { User, Player } from "../../models";
import WalletAvatar from "../../common/WalletAvatar";
import { PlayerCardContainer, PlayerAvatarWrapper } from './types';
import { NormalText } from '../../common/CreateGameCard/types';
import { isGameCreator, miniWalletAddress } from '../../utils'
import { WagerTypeBadgeWrapper, BadgeText} from "../../common/GameBar/types";
import { BadgeIcon, renderWagerBadge } from "../../common/GameBar";
import { WaitForPlayerConnectCard } from '../../components/WaitForPlayerConnectCard';
import { utils } from 'ethers';
import 'twin.macro';

export interface PlayGamePlayerCardProps {
 status: 'connecting' | 'connected' | 'idle' | 'rolling';
 player: User;
 players: Player[];
 wager: any;
}

export const PlayGamePlayerCard = ({ players, player, wager, status }: PlayGamePlayerCardProps) => {
  const isCreator = isGameCreator(player.uuid ,players);
  return status !== 'connecting' ? (
    <PlayerCardContainer>
      {
        player.wallet && 
        <PlayerAvatarWrapper tw="flex items-center gap-x-[15px]">
          <WalletAvatar 
            address={player.wallet.address} 
            ensImage={player.wallet.ensAvatar || undefined }
            size={10} 
          />
          <NormalText>{
            isCreator ? miniWalletAddress(player.wallet?.address).concat('(you') : miniWalletAddress(player.wallet?.address) 
          }(you)
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
    </PlayerCardContainer>
  ) : <WaitForPlayerConnectCard />
}
