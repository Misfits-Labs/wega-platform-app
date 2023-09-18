import { CoinContainer } from './types'; 
import Coin from './images/Coin';

import "twin.macro";

export const CoinFlip: React.FC<{ coinRef: any }> = ({ coinRef }: { coinRef: any }) => {
  return (
    <CoinContainer >
     <Coin ref={coinRef} />
    </CoinContainer>
  )
}