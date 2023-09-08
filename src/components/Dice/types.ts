import tw, { styled } from 'twin.macro';

export const DiceContainer = styled.div`
 display: flex;
 width: 144px;
 height: 144px;
 padding: 17.349px;
 justify-content: center;
 align-items: center;
 gap: 17.349px;
 border-radius: 17.349px; 
 ${tw`bg-blanc`}
 box-shadow: 0px 6.939759254455566px 17.34939956665039px 0px rgba(0, 0, 0, 0.25);
 `
export const DiceWrapper = styled.div`
 width: 70px;
 height: 70px;
 border-radius: 5.205px;
 ${tw`border border-pretu border-[5px]`} 
`
// eslint-disable-next-line no-unused-vars
export enum DiceSides { MINUS_ONE, ONE, TWO, THREE, FOUR, FIVE, SIX } 

