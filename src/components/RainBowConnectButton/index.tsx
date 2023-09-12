import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectionInformation, Balance, Chain, AvatarWrapper } from './types';
import Button from '../../common/Button';
import WalletAvatar from '../../common/WalletAvatar';
import { resetWallet, resetNetwork, setNetworkUnsupported, setWallet, setNetwork } from '../../containers/App/AppSlice';
import { useAppDispatch } from '../../hooks';
import { useAccount } from 'wagmi';
import { useCreatePlayerMutation } from '../../containers/App/api'; 

import 'twin.macro';

const RainbowConnectButton = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();
  useEffect(() => {
    if(!isConnected) { 
      dispatch(resetWallet()) 
      dispatch(resetNetwork()) 
    }
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
    dispatch(setNetworkUnsupported(true));
  }, [isConnected]);
  return <Button tw="w-[max-content]" buttonType="primary" content={"Wrong network"} onClick={openChainModal} />
} 

interface WalletInformationCompProps {
  account: any;
  chain: any;
  isConnected: boolean;
  openAccountModal: any;
}
const WalletInformation: React.FC<WalletInformationCompProps> = ({ account,  chain, openAccountModal, isConnected }: WalletInformationCompProps) => {
  const dispatch = useAppDispatch();
  const [createPlayer] = useCreatePlayerMutation();

  useEffect(() => {
    dispatch(setWallet({ ...account  }));
    dispatch(setNetwork({ ...chain, isConnected }));
    if(!account.uuid || account.uuid.length < 1 ) createPlayer(account.address);
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