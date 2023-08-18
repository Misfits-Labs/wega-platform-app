import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import wagmiConfig, { chains } from '../../../libs/wagmi'
import { polygonMumbai } from 'wagmi/chains';
import { WagmiConfig } from 'wagmi';
import WalletAvatar from '../../common/WalletAvatar';

export interface WalletConnectorProps {
  isDark: boolean;
  children: React.ReactNode | React.ReactNode[];
}

const WalletConnector = (props: WalletConnectorProps) => {
   
  
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      theme={props.isDark ? darkTheme() : lightTheme()}
      chains={chains}
      initialChain={polygonMumbai}
      avatar={WalletAvatar}
    >
      {props.children}
    </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default WalletConnector;
