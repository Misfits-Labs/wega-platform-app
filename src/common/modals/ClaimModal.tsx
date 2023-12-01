import { formatEther } from 'ethers';
import tw, { styled } from 'twin.macro';
import { WinnerDeclarationContainer } from './types';
import { NormalText, SmallText } from '../../components/CreateGameCard/types';
import { ArrowDownIconV2, DownloadIcon } from '../../assets/icons';
import { BadgeIcon, renderWagerBadge } from "../GameBar";
import { HexishString, Wega } from '../../models';
import { useBlockchainApiHooks, useTokenUSDValue } from '../../hooks';
import { miniWalletAddress, capitalize } from '../../utils';
import Button from '../Button';
import WalletAvatar from "../../common/WalletAvatar";


// TODO add gas costs

export interface ClaimModalProps { 
  hide: any;
  game: Wega;
  wallet: any;
}

export const ClaimModal = ({ hide, game, wallet
}: ClaimModalProps) => {
  const {useClaimMutation} = useBlockchainApiHooks;
  const {claim, isLoading: isClaimingLoading} = useClaimMutation();
  const handleClaimClick = async () => { 
    await claim(game.wager.wagerHash as HexishString).unwrap();
    hide(); 
  };
  const wagerUSDValue = useTokenUSDValue(game.wager.wagerCurrency, Number(formatEther(game.wager.wagerAmount)));
  // console.log(game.wager)
  return (
   <WinnerDeclarationContainer tw="items-start p-[24px] gap-y-[16px] min-w-[340px]">
    <div tw="flex justify-end w-full">
      <button tw="w-[fit-content]" onClick={hide}><SmallText tw="text-left">Close</SmallText></button>
    </div>
    
    <div tw="flex flex-row justify-start">
     <ClaimModalTitle>Review claim</ClaimModalTitle>
    </div>
    
    <div tw="flex flex-row items-center gap-[10px] rounded-[5px] dark:bg-[#414141] py-[8px] px-[16px]">
     <SmallText>Effective price: 1 {game.wager.wagerCurrency} = { wagerUSDValue.loading ? 'loading..' : `${wagerUSDValue.value}`} USD </SmallText>
    </div>

    {/* mid section */}
    <div tw="flex flex-col gap-y-[11px] justify-center items-start w-full">
     {/* top */}
     <div tw="flex flex-col gap-y-[8px] min-w-[150px] w-full">
      <NormalText tw="text-shinishi">Amount</NormalText>
      <div tw="flex flex-row gap-x-[11px] items-center rounded-[5px] bg-[#3A3A3A] w-full p-[5px]">
       <BadgeIcon size="44px">{renderWagerBadge(game.wager.wagerType, game.wager.wagerCurrency)}</BadgeIcon>
       <div tw="flex flex-col gap-y-[11px]">
        <NormalText tw="text-blanc">{formatEther(game.wager.wagerAmount)} USDC</NormalText>
        <NormalText tw="text-shinishi">${formatEther(game.wager.wagerAmount)}</NormalText>
       </div>
      </div>
     </div>

     <div tw="w-full flex justify-center">
      <div tw="rounded-[100%] dark:bg-[#414141] flex justify-center">
        <ArrowDownIconV2 />
      </div>
     </div>

     {/* bottom */}
     <div tw="flex flex-col gap-y-[8px] min-w-[150px] w-full">
      <NormalText tw="text-shinishi">Destination</NormalText>
      <div tw="flex flex-row gap-x-[11px] items-center rounded-[5px] bg-[#3A3A3A] w-full p-[5px]">
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
      <NormalText>{formatEther(game.wager.wagerAmount)} {game.wager.wagerCurrency}</NormalText>
     </div>

     {/* <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="dark:text-shinishi">Gas costs</NormalText>
      <NormalText>0.0020 MATIC</NormalText>
    </div> */}
    </div>
    <div tw="w-full flex flex-col items-center justify-center gap-y-[8px]">
      <NormalText tw="dark:text-shinishi text-center">Fee details</NormalText>
      <div tw="w-full rounded-[4px] border border-[1px] border-shinishi p-[12px]">
        <div tw="flex flex-row items-end justify-between w-full">
          <NormalText tw="dark:text-shinishi">Platform fee (5%)</NormalText>
          <NormalText>00.00 {game.wager.wagerCurrency}</NormalText>
        </div>
      </div>
    </div>  
    
    <div tw="self-start flex flex-row items-center gap-[10px] py-[8px] px-[5px]">
      <NormalText tw="dark:text-shinishi">You pay</NormalText>
      <NormalText>{formatEther(game.wager.wagerAmount)} {game.wager.wagerCurrency}</NormalText>
    </div>

    <div tw="self-start flex flex-row items-center justify-between gap-[10px] rounded-[5px] dark:bg-[#414141] py-[8px] px-[5px] w-full">
      <NormalText tw="dark:text-shinishi">You receive</NormalText>
      <NormalText>{formatEther(game.wager.wagerAmount)} {game.wager.wagerCurrency}</NormalText>
    </div>

    <Button buttonType="primary" className="flex items-center justify-center w-full" onClick={() => handleClaimClick()} >
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