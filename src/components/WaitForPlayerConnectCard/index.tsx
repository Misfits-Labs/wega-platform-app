import { PlayerCardContainer } from '../PlayGamePlayerCard/types';
import { ComponentLoader } from '../../common/loaders';
import { NormalText } from '../../common/CreateGameCard/types';
import Button from '../../common/Button'; 
import { CopyPasteIcon } from '../../assets/icons';
import 'twin.macro' 

export const WaitForPlayerConnectCard = () => {
  return (
    <PlayerCardContainer tw="flex flex-col justify-center">
      {/* loader */}
      <ComponentLoader tw="h-[unset] w-[unset]" />
      {/* text */}
      <NormalText>Searching for opponent...</NormalText>
      {/* invite link button */}
      <Button buttonType="primary" tw="font-normal flex items-center rounded-[5px]">Invite link <CopyPasteIcon tw="ms-[10px]"/></Button>
    </PlayerCardContainer>
  )
}
