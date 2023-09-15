import { PlayerCardContainer } from '../PlayGamePlayerCard/types';
import { ComponentLoader } from '../../common/loaders';
import { NormalText } from '../CreateGameCard/types';
import Button from '../../common/Button'; 
import { CopyPasteIcon } from '../../assets/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { toastSettings } from '../../utils';
import 'twin.macro';

export const WaitForPlayerConnectCard = () => {
  return (
    <PlayerCardContainer tw="flex flex-col justify-center">
      {/* loader */}
      <ComponentLoader tw="h-[unset] w-[unset]" />
      {/* text */}
      <NormalText>Searching for opponent...</NormalText>
      <CopyToClipboard onCopy={() => toast.success('Join link copied', { ...{ ...toastSettings('success', 'bottom-center') } as any })} text={document.URL.replace('play', 'join')} >
        <Button buttonType="primary" tw="font-normal flex items-center rounded-[5px]">Invite link<CopyPasteIcon tw="ms-[10px]"/></Button>
      </CopyToClipboard>
    </PlayerCardContainer>
  )
}
