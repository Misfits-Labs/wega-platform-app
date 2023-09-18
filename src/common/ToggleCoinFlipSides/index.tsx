/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect} from "react";
import {  AllPossibleCoinSides, CoinSideTypes, CoinSideTypesEnum  } from "../../models"
import { CoinSideTailsIconWithCircle, CoinSideHeadsIconWithCircle } from "../../assets/icons";
import {css} from 'twin.macro';

export interface ToggleCoinFlipSidesProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  setCurrentCoinSide: any;
  currentCoinSide: AllPossibleCoinSides;
  locked?: boolean;
} 

export const ToggleCoinFlipSides: React.FC<ToggleCoinFlipSidesProps> = ({ setCurrentCoinSide, currentCoinSide, locked,...rest }: ToggleCoinFlipSidesProps) => {
  const selectedStyles = css`
    border-left: 2.5px solid #FF9C27;
    border-right: 2.5px solid #F26D21;
    background-image: linear-gradient(to left, #F26D21, #FF9C27), linear-gradient(to left, #F26D21, #FF9C27);
    background-size: 100% 2.5px;
    background-position:0 0, 0 100%;
    background-repeat:no-repeat;
  ` 
  const [isHEADSSelected, setIsHEADSSelected] = useState<boolean>(currentCoinSide === CoinSideTypes[CoinSideTypesEnum.HEADS]);
  const [isTAILSSelected, setIsTAILSSelected] = useState<boolean>(currentCoinSide === CoinSideTypes[CoinSideTypesEnum.TAILS]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleHeadsClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if(!locked) setCurrentCoinSide(CoinSideTypes[CoinSideTypesEnum.HEADS])
  };
  const handleTailsClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if(!locked) setCurrentCoinSide(CoinSideTypes[CoinSideTypesEnum.TAILS])
  };

  useEffect(()=> {
    if(currentCoinSide === CoinSideTypes[CoinSideTypesEnum.HEADS]) {
      setIsHEADSSelected(true)
      setIsTAILSSelected(false)
    } 
    if(currentCoinSide === CoinSideTypes[CoinSideTypesEnum.TAILS]) {
     setIsTAILSSelected(true)
     setIsHEADSSelected(false)
    } 
  }, [setCurrentCoinSide, currentCoinSide])
  
  // TODO
    // replace gradient border with other approach
  return (<div tw="flex flex-row rounded-[20px] gap-x-[40px]" {...rest}>
    <button
      tw="cursor-pointer flex w-[fit-content] justify-center items-center gap-[10px] px-[20px] py-[10px] rounded-[15px]" 
      css={[isHEADSSelected && selectedStyles]}
      onClick={handleHeadsClick} 
      >
      {/* icon */}
      {/* <CoinSide coinSide={CoinSideTypes[CoinSideTypesEnum.HEADS]} tw="flex items-center max-w-[45px]" /> */}
      <CoinSideHeadsIconWithCircle tw="max-w-[45px]" />
      <span tw="text-[21px] font-normal leading-[19px]">HEADS</span>
    </button>
    <button 
      onClick={handleTailsClick} 
      className="cursor-pointer flex w-[fit-content] justify-center items-center gap-[10px] px-[20px] py-[10px] rounded-[15px]"
      css={[isTAILSSelected && selectedStyles]}
      >
      {/* icon */}
      <CoinSideTailsIconWithCircle tw="max-w-[60px]" />
      <span tw="text-[21px] font-normal leading-[19px]">TAILS</span>
    </button>
  </div>)
}