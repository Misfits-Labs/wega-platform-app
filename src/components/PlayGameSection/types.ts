import { styled } from "twin.macro";
import { WegaTypesEnum, WegaTypes } from "../../models";

export const PlayGameContainer = styled.div`
 display: flex;
 width: 944px;
 height: 444px;
 padding: 30px;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 25px;
 position: relative;
 z-index: 10;
 border-radius: 20px;
 background: linear-gradient(137deg, #282828 0%, rgba(40, 40, 40, 0.00) 100%);
 
 &::before {
  content: '';
  border-radius: 20px;
  border: 3px solid #8A8A8A;
  position: absolute;
  width: inherit;
  height: inherit;
  box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.25);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  z-index: -5;
 }
`

export const MinimumGameRounds: any = {
 [WegaTypes[WegaTypesEnum.DICE]]: 1,
 [WegaTypes[WegaTypesEnum.COINFLIP]]: 1,
} 