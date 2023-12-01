import Section from '../../common/Section';
import Button from '../../common/Button';
import { 
 LargeText,
 NormalText 
} from "../CreateGameCard/types";
import {
 useConnectModal,
} from '@rainbow-me/rainbowkit';
import 'twin.macro';

interface ClaimWinsDisconnectedUserSectionProps extends React.AllHTMLAttributes<HTMLDivElement> {
 gameIds: number[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClaimWinsDisconnectedUserSection({ gameIds , ...rest }: ClaimWinsDisconnectedUserSectionProps) {
  // filter out the games of which the user is not the winner
  const { openConnectModal } = useConnectModal();
  return openConnectModal ? (
    <Section hdr="Tokens won" direction="col" tw="gap-y-[32px] w-full" { ...rest } >
     <LargeText tw="text-shinishi text-center">Connect your wallet to see your wins.</LargeText>
     <Button buttonType="secondary" tw="flex max-w-[fit-content] self-center border-[2px]" onClick={
            (e: any) => { 
              e.preventDefault();
              openConnectModal();
            }}>
            <NormalText tw="tracking-[0.32px] leading-[12px] font-bold">Connect</NormalText>
     </Button>
    </Section>
  ) : <></>
}
export default ClaimWinsDisconnectedUserSection;