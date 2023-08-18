import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectionInformation, Balance, ConnectButtonWrapper, Chain, AvatarWrapper } from './types';
import Button from '../../common/Button';
import WalletAvatar from '../../common/WalletAvatar';
import { setWalletInformation, initialWalletState } from '../../../state/features/wallet/walletSlice';
import { useAppDispatch } from '../../../hooks';
import { useAccount } from 'wagmi';

const RainbowConnectButton = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();  
  useEffect(() => {
    if(!isConnected) dispatch(setWalletInformation(initialWalletState))
  }, [dispatch, isConnected]);

  return (
    <ConnectButton.Custom>
      {({ 
        account, 
        chain, 
        openAccountModal, 
        openChainModal, 
        openConnectModal, 
        mounted 
        }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;
        const isConnected = (ready && account && chain) ? true : false

        // &&
        // (!authenticationStatus ||
        //   authenticationStatus === 'authenticated');
        return (
          <ConnectButtonWrapper ready={ready ?? false} {...(!ready && { 'area-hidden': true })}>
            {(() => {
              if (!connected) {
                return <Button buttonType="primary" content="Connect" onClick={openConnectModal}/>
              }
              if (chain.unsupported) {
                dispatch(setWalletInformation({ chain: { unsupported: chain.unsupported }, isConnected }));
                return <Button buttonType="primary" content={"Wrong network"} onClick={openChainModal} />;
              }
              dispatch(setWalletInformation({ ...account, chain, isConnected  }));
              return (
                <ConnectionInformation onClick={openAccountModal}>
                  {
                    chain.hasIcon && chain.iconUrl && 
                    <Chain >
                      <img src={chain.iconUrl} alt={chain.name} />
                    </Chain> 
                  }
                  <Balance>
                    ({account.displayBalance})
                  </Balance>
                  <AvatarWrapper>
                    <WalletAvatar address={account.address} ensImage={account.ensAvatar} size={0} /> 
                  </AvatarWrapper>
                </ConnectionInformation>
              );
            })()}
          </ConnectButtonWrapper>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default RainbowConnectButton;