import { formatUnits } from 'ethers';
import tw, { styled } from 'twin.macro';
import { WinnerDeclarationContainer, GradientDiv } from './types';
import { NormalText, SmallText } from '../../components/CreateGameCard/types';
import { DownloadIcon } from '../../assets/icons';
import arrowDown from '../../assets/icons/arrow-down-icon.png';
import { BadgeIcon, renderWagerBadge } from "../GameBar";
import { HexishString, Wega, WegaState} from '../../models';
import { useTokenUSDValue } from '../../hooks';
import { useWithdrawMutation, useGetClaimAmountQuery } from './blockchainApiSlice'; 
import { useUpdateGameMutation } from '../../components/PlayGameSection/apiSlice'; 
import { miniWalletAddress, capitalize, toastSettings, parseError } from '../../utils';

import Button from '../Button';
import WalletAvatar from "../../common/WalletAvatar";
import toast from 'react-hot-toast';

// TODO add gas costs
export interface ClaimModalProps { 
  hide: any;
  game: Wega;
  wallet: any;
  tokenDecimals: number;
}


export const ClaimModal = ({ hide, game, wallet, tokenDecimals
}: ClaimModalProps) => {
  const [feeAmountIndex, sendAmountIndex] = [0, 1]
  const [claim, claimQuery] = useWithdrawMutation();
  const [updateGame, ] = useUpdateGameMutation();

  const calculateFeesQuery = useGetClaimAmountQuery({ 
    escrowHash: game.wager.wagerHash as HexishString,
    account: wallet.address
  });
  
  const handleClaimClick = async () => { 
    try {
      await claim({ escrowHash: game.wager.wagerHash as HexishString }).unwrap();
      await updateGame({ uuid: game.uuid, state: WegaState.SETTLED  }).unwrap();
      toast.success('Withdraw success', { ...toastSettings('success', 'top-center') as any });
      return hide(); 
    } catch (e) {
      const message = parseError(e, 'Claim error');
      toast.error(message, { ...toastSettings('error', 'bottom-center') as any });      
    }
  };
  const wagerUSDValue = useTokenUSDValue(game.wager.wagerCurrency, Number(formatUnits(game.wager.wagerAmount, tokenDecimals)));
  
  return tokenDecimals && (
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
        <NormalText tw="text-blanc">{formatUnits(game.wager.wagerAmount, tokenDecimals)} USDC</NormalText>
        <NormalText tw="text-shinishi">${formatUnits(game.wager.wagerAmount, tokenDecimals)}</NormalText>
       </div>
      </div>
     </div>
     <div tw="w-full flex justify-center">
      <img src={arrowDown} alt="arrow" />
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
       <div tw="flex flex-row items-center justify-start gap-y-[11px]">
        <NormalText tw="text-blanc">{miniWalletAddress(wallet.address)}</NormalText>
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
      {
        !calculateFeesQuery.data ? 'calculating...' : <NormalText>{
          parseFloat(String((Number(formatUnits(calculateFeesQuery.data[feeAmountIndex], tokenDecimals)) + Number(formatUnits(calculateFeesQuery.data[sendAmountIndex], tokenDecimals))/2))).toFixed(0) 
        } {game.wager.wagerCurrency}</NormalText>
      }
     </div>

     {/* <div tw="flex flex-row items-end justify-between w-full">
      <NormalText tw="dark:text-shinishi">Gas costs</NormalText>
      <NormalText>0.0020 MATIC</NormalText>
    </div> */}
    </div>
    <div tw="w-full flex flex-col justify-center gap-y-[8px]">
      <NormalText tw="dark:text-shinishi text-center">Fee details</NormalText>
      <div tw="flex flex-col w-full rounded-[4px] p-[12px]">
        
        <NormalText tw="dark:text-shinishi text-center">Platform fee (2%)</NormalText>
        <div tw="h-[1px] w-[90%] bg-[#3A3A3A] my-[8px]"></div>
        <div tw="w-full flex justify-between">
          <NormalText tw="dark:text-shinishi">You pay</NormalText>
          {
            !calculateFeesQuery.data ? 'calculating...' : <NormalText>{
              parseFloat(formatUnits(calculateFeesQuery.data[feeAmountIndex], tokenDecimals) ).toFixed(2)
            } {game.wager.wagerCurrency}</NormalText>
          }
        </div>
      </div>
    </div> 
    <GradientDiv tw="h-[max-content] flex justify-between gap-[10px] dark:bg-[#414141] py-[8px] px-[5px]">
      <NormalText tw="dark:text-blanc">Net winnings</NormalText>
      {
        !calculateFeesQuery.data ? 'calculating...' : <NormalText>{
          parseFloat(String(formatUnits(calculateFeesQuery.data[sendAmountIndex], tokenDecimals))).toFixed(2)
        } {game.wager.wagerCurrency}</NormalText>
      }
    </GradientDiv>
    <div tw="flex flex-col w-full items-center gap-y-[8px]">
      <SmallText tw="text-center font-[14px] font-[400] leading-[15px]">Why is withdrawal amount higher on block explorer?</SmallText>
      <SmallText tw="text-shinishi text-center font-[12px] font-[300] leading-[15px]" >When claiming a win you also claim back your initial wager deposit.</SmallText>
    </div>
    <Button buttonType="primary" className="flex items-center justify-center w-full" onClick={() => handleClaimClick()} >
     { claimQuery.isLoading ? "Loading..." : "Claim" }
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