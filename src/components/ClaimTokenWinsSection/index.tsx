import 'twin.macro';
import { ClaimableGames } from '../WegaGames';
import { HexishString } from '../../models';

interface ClaimTokenWinsSectionProps extends React.AllHTMLAttributes<HTMLDivElement> {
  userWalletAddress: HexishString;
  gamesCount: number;
  networkId: number;
}

function ClaimTokenWinsSection({ networkId, userWalletAddress, gamesCount, ...rest }: ClaimTokenWinsSectionProps) {
  // filter out the games of which the user is not the winner
  return ( <ClaimableGames userWalletAddress={userWalletAddress} gamesCount={gamesCount} {...rest} networkId={networkId} /> )
}
export default ClaimTokenWinsSection;