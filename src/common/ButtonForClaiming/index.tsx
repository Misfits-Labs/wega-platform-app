import { useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '../Button';
import{ DownloadIcon } from '../../assets/icons';
import { useWegaStore } from '../../hooks';
import { useGlobalModalContext, MODAL_TYPES } from "../../common/modals";
import { Wega } from '../../models';
import 'twin.macro'

interface ButtonForClaimingProps {
 game: Wega;
 tokenDecimals: number;
}

export const ButtonForClaiming = ({ game, tokenDecimals  }: ButtonForClaimingProps) => {
  const { wallet } = useWegaStore()
  const { openConnectModal } = useConnectModal();

  const { showModal, hideModal } = useGlobalModalContext();

  const handleClaim = async (wallet: any) => {
    showModal(MODAL_TYPES.CLAIM_MODAL, {
      game,
      wallet,
      tokenDecimals,
      hide: hideModal,
    }, true); 
  }
 return tokenDecimals && (!wallet && openConnectModal ?
   <Button 
       buttonType="primary"  
       className="flex items-center"
       onClick={openConnectModal}
     >
     Claim
     <DownloadIcon tw="h-[16px] w-[16px] ms-[5px]" />
   </Button> :  
     <Button buttonType="primary" className="flex items-center w-[max-content]" onClick={() => handleClaim(wallet)} >
       Claim
     <DownloadIcon tw="h-[16px] w-[16px] ms-[5px] dark:stroke-blanc" />
    </Button> 
 )
}