import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectionInformation, Balance, ConnectButtonWrapper, Chain, AvatarWrapper } from './types';
import Button from '../../common/Button';
import WalletAvatar from '../../common/WalletAvatar';

const RainbowConnectButton = () => {
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
               return <Button buttonType="primary" content={"Wrong network"} onClick={openChainModal} />;
             }
             console.log(account)
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