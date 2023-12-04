import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import wagmiConfig, { chains } from '../../libs/wagmi'
import {defaultNetwork } from '../../models/constants'
import { WagmiConfig } from 'wagmi';
import WalletAvatar from '../../common/WalletAvatar';
import 'twin.macro';
export interface WalletConnectorProps {
  isDark: boolean;
  children: React.ReactElement | React.ReactElement[];
}


const WalletProvider = (props: WalletConnectorProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={props.isDark ? darkTheme() : lightTheme()}
        chains={chains}
        initialChain={defaultNetwork}
        avatar={WalletAvatar}
      >
        <div tw="relative z-[1]">
        {props.children}
        </div>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default WalletProvider;
