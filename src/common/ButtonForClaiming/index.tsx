import { useEffect } from 'react';
import {
 useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import{ DownloadIcon } from '../../assets/icons';
import { useWegaStore, useBlockchainApiHooks } from '../../hooks';
import { useSelector } from 'react-redux';
import { useGetSet } from 'react-use';
import { selectGameById } from '../../containers/App/api';
import { HexishString } from '../../models';
import 'twin.macro'

interface ButtonForClaimingProps {
 gameId: number;
}
export const ButtonForClaiming = ({ gameId  }: ButtonForClaimingProps) => {
  const game = useSelector(state => selectGameById(state, gameId));
  const { wallet } = useWegaStore()
  const { openConnectModal } = useConnectModal();
  const [isPlayerWinner, setIsPlayerWinner] = useGetSet<boolean>(false);
  const { useGetWinnersQuery, useClaimMutation } = useBlockchainApiHooks;
  const { getWinners, data: winners } = useGetWinnersQuery();
  const { claim, isLoading: isClaimingLoading } = useClaimMutation(); 
  
  const handleClaim = async (escrowHash: HexishString) => {
    claim(escrowHash);
  }

  useEffect(() => {
    if(game && game?.wager) {
      getWinners(game.wager.wagerHash as HexishString);
    }
    if(winners && winners.length > 0 && wallet && wallet?.address) {
      setIsPlayerWinner(winners.some((winner: any) => winner.toLowerCase() === wallet?.address))
    }
    console.log(winners);
  }, [winners?.length, game, wallet, wallet?.address, winners]);

 return wallet && game && winners && isPlayerWinner() ? (!wallet && openConnectModal ?
   <Button 
       buttonType="secondary"  
       className="flex items-center"
       onClick={openConnectModal}
     >
     Claim
     <DownloadIcon tw="h-[16px] w-[16px] ms-[5px]" />
   </Button> :  
     <Button buttonType="secondary" className="flex items-center" onClick={() => handleClaim(game.wager.wagerHash as HexishString)} >
       { isClaimingLoading ? "Loading..." : "Claim" }
     <DownloadIcon tw="h-[16px] w-[16px] ms-[5px]" />
    </Button> 
 ) : <></>
}
// sdfasdf