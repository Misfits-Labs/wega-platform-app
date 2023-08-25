import {
 useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import { useWegaStore } from '../../hooks';
import{ StarLoaderIcon } from '../../assets/icons';
import { AllPossibleWegaTypes } from '../../models';
import { Link } from 'react-router-dom';

interface ButtonForWaitingGameProps {
 gameType: AllPossibleWegaTypes;
 gameId: number;
}

export const ButtonForWaitingGame = ({ gameType, gameId }: ButtonForWaitingGameProps) => {
 const { wallet } = useWegaStore();
 const {openConnectModal} = useConnectModal();
 return ( !wallet && openConnectModal ?
   <Button 
       buttonType="secondary"  
       className="flex items-center"
       onClick={openConnectModal}
     >
     Play
     <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
   </Button> :
   <Link to={`/${gameType.toLowerCase()}/play/${gameId}`}>
     <Button buttonType="secondary" className="flex items-center">
       Play
     <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
     </Button>
   </Link>  
 )
}
