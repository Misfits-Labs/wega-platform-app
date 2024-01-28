import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import{ StarLoaderIcon } from '../../assets/icons';
import { AllPossibleWegaTypes} from '../../models';
import { Link } from 'react-router-dom';
import { useFirebaseData, useWegaStore } from '../../hooks';

interface ButtonForJoinableGameBar {
  gameType: AllPossibleWegaTypes;
  gameId: number;
  gameUuid: string;
}
export const ButtonForJoinableGame = ({ gameType, gameId, gameUuid }: ButtonForJoinableGameBar) => {
  const { wallet } = useWegaStore();
  const { openConnectModal } = useConnectModal();
  const { isGamePlayable } = useFirebaseData(gameUuid);
  return ( !wallet && openConnectModal ?
    <Button 
        buttonType="secondary"  
        className="flex items-center"
        onClick={openConnectModal}
      > 
      Join
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
    </Button> : !isGamePlayable ? <Link to={`/join/${gameType.toLowerCase()}/${gameUuid}`} state={{ gameUuid, gameId }}>
      <Button buttonType="secondary" className="flex items-center">
        Join
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link> : <Link to={`/play/${gameType.toLowerCase()}/${gameUuid}`} state={{ gameUuid, gameId }}>
      <Button buttonType="secondary" className="flex items-center">
        Play
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link>
  )
}
