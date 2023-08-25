import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import { useWegaStore } from '../../hooks';
import{ StarLoaderIcon } from '../../assets/icons';
import { AllPossibleWegaTypes } from '../../models';
import { Link } from 'react-router-dom';

interface ButtonForJoinableGameBar {
  gameType: AllPossibleWegaTypes;
  gameId: number;
}

export const ButtonForJoinableGame = ({ gameType, gameId }: ButtonForJoinableGameBar) => {
  const { wallet } = useWegaStore();
  const {openConnectModal} = useConnectModal();
  return ( !wallet && openConnectModal ?
    <Button 
        buttonType="secondary"  
        className="flex items-center"
        onClick={openConnectModal}
      >
      Join
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
    </Button> :
    <Link to={`/${gameType.toLowerCase()}/join/${gameId}`}>
      <Button buttonType="secondary" className="flex items-center">
        Join
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link>  
  )
}
