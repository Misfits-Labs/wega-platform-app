import {
 useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import { useWegaStore, useFirebaseData } from '../../hooks';
import{ StarLoaderIcon } from '../../assets/icons';
import { AllPossibleWegaTypes } from '../../models';
import { Link } from 'react-router-dom';

interface ButtonForWaitingGameProps {
 gameType: AllPossibleWegaTypes;
 gameId: number;
 gameUuid: string;
}

export const ButtonForWaitingGame = ({ gameType, gameId, gameUuid }: ButtonForWaitingGameProps) => {
  const { wallet } = useWegaStore();
  const { isGamePlayable } = useFirebaseData(gameUuid);
  const { openConnectModal } = useConnectModal();
  return ( !wallet && openConnectModal ?
    <Button 
        buttonType="secondary"  
        className="flex items-center"
        onClick={openConnectModal}
      >
      Play
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
    </Button> : isGamePlayable ? (
    <Link to={`/play/${gameType.toLowerCase()}/${gameUuid}`} state={{ gameUuid, gameId }}>
      <Button buttonType="secondary" className="flex items-center">
        Play
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link>  

    ) : (  
      <Link to={`/play/${gameType.toLowerCase()}/${gameUuid}`} state={{ gameUuid, gameId }}>
        <Button buttonType="secondary" className="flex items-center w-[max-content]">
          Matching...
          <StarLoaderIcon loading={true} className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
        </Button>
      </Link>  
    )
  )
}

