import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import Button from '../Button';
import { useWegaStore } from '../../hooks';
import{ StarLoaderIcon } from '../../assets/icons';
import { AllPossibleWegaTypes, Player } from '../../models';
import { Link } from 'react-router-dom';

interface ButtonForJoinableGameBar {
  gameType: AllPossibleWegaTypes;
  gameId: number;
  requiredPlayerNum: number;
  players: Player[];
}

export const ButtonForJoinableGame = ({ gameType, gameId, requiredPlayerNum, players }: ButtonForJoinableGameBar) => {
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
    </Button> : requiredPlayerNum !== players.length ? <Link to={`/${gameType.toLowerCase()}/join/${gameId}`}>
      <Button buttonType="secondary" className="flex items-center">
        Join
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link> : <Link to={`/${gameType.toLowerCase()}/play/${gameId}`}>
      <Button buttonType="secondary" className="flex items-center">
        Play
      <StarLoaderIcon className="dark:fill-blanc h-[16px] w-[16px] ms-[5px]" />
      </Button>
    </Link>
  )
}
