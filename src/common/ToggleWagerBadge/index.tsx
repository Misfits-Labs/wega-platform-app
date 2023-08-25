/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect} from "react";
import {  WagerTypes, WagerTypesEnum, CurrencyTypes, CurrencyTypesEnum, AllPossibleCurrencyTypes } from "../../models"
import { BadgeIcon, renderWagerBadge } from "../JoinableGameBar";
import tw, {css} from 'twin.macro';

export interface ToggleWagerBadgesProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  setCurrentCurrencyType: any;
  currentCurrencyType: AllPossibleCurrencyTypes;
} 

export const ToggleWagerBadge: React.FC<ToggleWagerBadgesProps> = ({ setCurrentCurrencyType, currentCurrencyType }: ToggleWagerBadgesProps) => {
  const selectedStyles = css`
  ${tw`dark:bg-[#4B4B4B]`}
  ` 
  const [isUSDTSelected, setIsUSDTSelected] = useState<boolean>(currentCurrencyType === CurrencyTypes[CurrencyTypesEnum.USDT]);
  const [isUSDCSelected, setIsUSDCSelected] = useState<boolean>(currentCurrencyType === CurrencyTypes[CurrencyTypesEnum.USDC]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUSDTBadgeClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentCurrencyType(CurrencyTypes[CurrencyTypesEnum.USDT])
  };
  const handleUSDCBadgeClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentCurrencyType(CurrencyTypes[CurrencyTypesEnum.USDC])
  };

  useEffect(()=> {
    if(currentCurrencyType === CurrencyTypes[CurrencyTypesEnum.USDT]) {
      setIsUSDTSelected(true)
      setIsUSDCSelected(false)
    } 
    if(currentCurrencyType === CurrencyTypes[CurrencyTypesEnum.USDC]) {
      setIsUSDCSelected(true)
      setIsUSDTSelected(false)
    } 
  }, [currentCurrencyType, setCurrentCurrencyType])
  
  return (<div tw="flex flex-row px-[20px] py-[10px] rounded-[20px] dark:bg-[#2C2C2C] gap-x-[10px]">
    <button
      tw="cursor-pointer flex w-[fit-content] justify-center items-center gap-[10px] px-[10px] py-[5px] rounded-[15px]" 
      css={[isUSDCSelected && selectedStyles]}
      onClick={handleUSDCBadgeClick} 
      >
      {/* icon */}
      <BadgeIcon><>{renderWagerBadge(WagerTypes[WagerTypesEnum.TOKEN], CurrencyTypes[CurrencyTypesEnum.USDC])}</></BadgeIcon>
      <span>{CurrencyTypes[CurrencyTypesEnum.USDC]}</span>
    </button>
    <button 
      onClick={handleUSDTBadgeClick} 
      className="cursor-pointer flex w-[fit-content] justify-center items-center gap-[10px] px-[10px] py-[5px] rounded-[15px]"
      css={[isUSDTSelected && selectedStyles]}
      >
      {/* icon */}
      <BadgeIcon><>{renderWagerBadge(WagerTypes[WagerTypesEnum.TOKEN], CurrencyTypes[CurrencyTypesEnum.USDT])}</></BadgeIcon>
      <span>{CurrencyTypes[CurrencyTypesEnum.USDT]}</span>
    </button>
  </div>)
}