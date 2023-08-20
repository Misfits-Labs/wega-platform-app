import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectionInformation, Balance, Chain, AvatarWrapper } from './types';
import Button from '../../common/Button';
import WalletAvatar from '../../common/WalletAvatar';
import { setWalletInformation, initialWalletState } from '../../../state/features/wallet/walletSlice';
import { useAppDispatch } from '../../../hooks';
import { useAccount } from 'wagmi';
import { useLoginPlayerMutation } from '../../../state/features/api'; 

import 'twin.macro';

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
        const isWalletConnected = (ready && account && chain) ? true : false

        

        // &&
        // (!authenticationStatus ||
        //   authenticationStatus === 'authenticated');
        return (
          <div  {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              
              if (!connected) {
                return <Button buttonType="primary" content="Connect" onClick={openConnectModal}/>
              } 
              if (chain.unsupported) {
                return <WrongNetworkButton isConnected={isWalletConnected} openChainModal={openChainModal} />
              }
              return (
                <WalletInformation openAccountModal={openAccountModal} account={account} chain={chain} isConnected={isWalletConnected} />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default RainbowConnectButton;

interface WrongNetworkButtonProps {
  isConnected: boolean;
  openChainModal: any;
} 
const WrongNetworkButton: React.FC<WrongNetworkButtonProps> = ({ isConnected,  openChainModal }: WrongNetworkButtonProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setWalletInformation({ chain: { unsupported: true }, isConnected, address: '', uuid: '' }));
  }, [isConnected]);
  return <Button buttonType="primary" content={"Wrong network"} onClick={openChainModal} />
} 

interface WalletInformationCompProps {
  account: any;
  chain: any;
  isConnected: boolean;
  openAccountModal: any;
}
const WalletInformation: React.FC<WalletInformationCompProps> = ({ account,  chain, openAccountModal, isConnected }: WalletInformationCompProps) => {
  const dispatch = useAppDispatch();
  const [loginPlayer] = useLoginPlayerMutation();

  useEffect(() => {
    dispatch(setWalletInformation({ ...account, chain, isConnected  }));
    if(!account.uuid || account.uuid.length < 1 ) loginPlayer(account.address);
  }, [account.address]);
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
  )
} 