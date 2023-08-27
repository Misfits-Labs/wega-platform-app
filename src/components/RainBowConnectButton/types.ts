import tw, { styled } from 'twin.macro';

export interface WegaConnectButtonProps {
 connected?: boolean;
 chainSupported?: boolean; 
}

export const WegaConnectButton = styled.button<WegaConnectButtonProps>(({ 
 connected,
 chainSupported,
 }) => [
 `
  border-radius: 5px;
  font-style: normal;
  font-weight: 700; 
  padding: 10px 25px;
  border-radius: 5px;
  max-height: fit-content;
 `,
 tw`text-base`,
 !connected && tw`text-pretu bg-gradient-to-r from-oranjo-blanc to-oranjo`,
  connected && tw`flex items-center justify-evenly dark:bg-pretu-lighter`,
  connected && `
   gap: 12px;
   border-radius: 20px;
  `,
  connected && !!chainSupported && tw`dark:bg-pretu-lighter`
])


export interface ConnectionInformationProps {
  chain?: {
    hasIcon: boolean;
    iconBackground: boolean;
    iconUrl: boolean;
    id: number;
    name: string;
    unsupported: boolean;
  }
  account?: {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
  }

}


export interface ConnectButtonWrapperProps {
  hidebutton: boolean;
}
export const ConnectButtonWrapper = styled.div<ConnectButtonWrapperProps>(({
  hidebutton
}) =>  hidebutton && [
  `
    opacity: 0,
    pointerEvents: 'none',
    userSelect: 'none'
  `
])

export const ConnectionInformation = styled.div`
  gap: 12px;
  cursor: pointer;
  background: #232323; 
  border-radius: 20px;
  padding-left: 16px;
  width: max-content;
  ${tw`flex justify-center items-center`}
`
export const Chain = styled.div`
  
`
export const Balance = styled.span`
  width: fit-content;
  line-height: 9px;
  font-family: League Spartan;
  font-size: 12px;
  font-style: normal;
  text-align: center;
  leading-trim: both; 
  ${tw`not-italic font-light`}
`

export const AvatarWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  border-radius: 20px;
  background-color: #414141;
  > canvas {
    max-height: 24px;
    max-width: 24px;
    border-radius: 100%;
  }
`