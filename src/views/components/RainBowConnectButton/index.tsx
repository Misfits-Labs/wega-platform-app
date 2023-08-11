import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WegaConnectButton } from './types';

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
         <div
           {...(!ready && {
             'aria-hidden': true,
             style: {
               opacity: 0,
               pointerEvents: 'none',
               userSelect: 'none'
             }
           })}
         >
           {(() => {
             if (!connected) {
               return <WegaConnectButton
                  connected={false} 
                  onClick={openConnectModal}
                  >
                  Connect
                </WegaConnectButton>;
             }

             if (chain.unsupported) {
               return <WegaConnectButton 
               onClick={openChainModal}
               chainSupported={!chain.unsupported}
               >Wrong network</WegaConnectButton>;
             }
             return (
               <WegaConnectButton 
                onClick={openAccountModal}
                connected={true}
                chainSupported={true}
               >
                 {account.displayName }
                 {account.displayBalance ? ` (${account.displayBalance})` : ''}
               </WegaConnectButton>
             );
           })()}
         </div>
       );
     }}
   </ConnectButton.Custom>
 );
};

export default RainbowConnectButton;