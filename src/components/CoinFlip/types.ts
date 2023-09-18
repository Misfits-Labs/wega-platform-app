import { styled } from 'twin.macro'
// eslint-disable-next-line no-unused-vars
export enum CoinSides { MINUS_ONE, HEADS, TAILS } 

export const CoinContainer = styled.div`
 display: flex;
 width: 144px;
 height: 144px;
 justify-content: center;
 align-items: center;
 border-radius: 100%; 
 box-shadow: 0px 6.939759254455566px 17.34939956665039px 0px rgba(0, 0, 0, 0.25);
 background: rgba(75, 75, 75, 0.30 );
 background-clip: padding-box;
 backdrop-filter: blur(15px);
 
 & > svg {
  border-radius: 100%;
 }
 `