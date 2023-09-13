import { utils } from 'ethers';
import tw, { styled } from 'twin.macro';
import { WinnerDeclarationContainer } from './types';
import { NormalText, SmallText } from '../CreateGameCard/types';
import { ArrowDownIconV2, DownloadIcon } from '../../assets/icons';
import { BadgeIcon, renderWagerBadge } from "../GameBar";
import { HexishString, Wega } from '../../models';
import { useBlockchainApiHooks } from '../../hooks';
import { miniWalletAddress, capitalize } from '../../utils';
import Button from '../Button';
import WalletAvatar from "../../common/WalletAvatar";




export interface ClaimModalProps { 
  hide: any;
  game: Wega;
  wallet: any;
}

export const ClaimModal = ({ hide, game, wallet
}: ClaimModalProps) => {
  const {useClaimMutation} = useBlockchainApiHooks;
  const {claim, isLoading: isClaimingLoading} = useClaimMutation();
  const handleClaimClick = () => claim(game.wager.wagerHash as HexishString);
  return (
   <WinnerDeclarationContainer tw="items-start p-[24px] gap-y-[16px] min-w-[340px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><SmallText tw="text-left">Close</SmallText></button>
    </div>
    
    <div tw="flex flex-row justify-start">
     <ClaimModalTitle>Review claim</ClaimModalTitle>
    </div>
    
    <div tw="flex flex-row items-center gap-[10px] rounded-[5px] dark:bg-[#414141] py-[8px] px-[16px]">
     <SmallText>Effective price: 1 {game.wager.wagerCurrency} = 1.01 USD </SmallText>
    </div>

    {/* mid section */}
    <div tw="flex flex-col gap-y-[16px] justify-center items-center w-full">
     {/* top */}
     <div tw="flex flex-col gap-y-[8px]">
      <NormalText tw="text-shinishi">Amount</NormalText>
      <div tw="flex flex-row gap-x-[11px]">
       <BadgeIcon size="44px">{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</BadgeIcon>
       <div tw="flex flex-col gap-y-[11px]">
        <NormalText tw="text-blanc">{utils.formatEther(game.wager.wagerAmount)} USDC</NormalText>
        <NormalText tw="text-shinishi">${utils.formatEther(game.wager.wagerAmount)}</NormalText>
       </div>
      </div>
     </div>
     
     <div tw="rounded-[100%] dark:bg-[#414141] p-[5px] flex justify-center">
      <ArrowDownIconV2 />
     </div>

     {/* bottom */}
     <div tw="flex flex-col gap-y-[8px]">
      <NormalText tw="text-shinishi">Destination</NormalText>
      <div tw="flex flex-row gap-x-[11px]">
       <ClaimModalAvatarWrapper>
        <WalletAvatar 
          address={wallet.address} 
          ensImage={undefined}
          size={11} 
         />
       </ClaimModalAvatarWrapper>
       <div tw="flex flex-col gap-y-[11px]">
        <NormalText tw="text-blanc">{miniWalletAddress(wallet.address)}</NormalText>
        <NormalText tw="text-shinishi">{"Change wallet"}</NormalText>
       </div>
      </div>
     </div>
    </div>

    {/* details */}
    <div tw="flex flex-col items-start gap-y-[16px] items-center w-full">
     
     <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="font-bold">Claim details</NormalText>
      <div tw="flex flex-row items-center">
       <NormalText tw="dark:text-oranjo">{capitalize(game.wager.wagerType)}s</NormalText>
       <NormalText tw="text-end mx-[5px]">|</NormalText>
       <NormalText tw="dark:text-shinishi">USD</NormalText>
      </div>
     </div>

     <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="dark:text-shinishi">Total claim before fees</NormalText>
      <NormalText>{utils.formatEther(game.wager.wagerAmount)} {game.wager.wagerCurrency}</NormalText>
     </div>
     <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="dark:text-shinishi">Gas costs</NormalText>
      <NormalText>0.0020 MATIC</NormalText>
     </div>
     <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="dark:text-shinishi">Claim fees (1%)</NormalText>
      <NormalText>00.00 {game.wager.wagerCurrency}</NormalText>
     </div>
    </div>
    <div tw="flex flex-row items-center gap-[10px] rounded-[5px] dark:bg-[#414141] py-[8px] px-[16px]">
     <NormalText tw="dark:text-shinishi">What you should receive after fees</NormalText>
     <NormalText>{utils.formatEther(game.wager.wagerAmount)} {game.wager.wagerCurrency}</NormalText>
    </div>
    <Button buttonType="primary" className="flex items-center justify-center w-full" onClick={() => handleClaimClick()}>
     { isClaimingLoading ? "Loading..." : "Claim" }
     <DownloadIcon tw="h-[16px] w-[16px] ms-[5px] dark:stroke-blanc" />
    </Button> 
   </WinnerDeclarationContainer>
  )
}

export const ClaimModalTitle = styled.span`
 text-align: center;
 leading-trim: both;
 font-family: League Spartan;
 font-size: 21px;
 font-style: normal;
 font-weight: 700;
 line-height: 12px;
 letter-spacing: 0.42px;
 ${tw`dark:text-blanc text-start`}
`
export const ClaimModalAvatarWrapper = styled.div`
 & > img, canvas { 
  border-radius: 100%;
  ${tw`dark:border-blanc border-[2px]`}
 } 
` 