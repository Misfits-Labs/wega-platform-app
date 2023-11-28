import tw, { styled } from 'twin.macro';

export const DiceContainer = styled.div`
 display: flex;
 width: 144px;
 height: 144px;
 padding: 17.5px;
 justify-content: center;
 align-items: center;
 gap: 17.5px;
 border-radius: 17.5px; 
 box-shadow: 0px 6.939759254455566px 17.34939956665039px 0px rgba(0, 0, 0, 0.25);
 background: rgba(75, 75, 75, 0.30 );
 backdrop-filter: blur(15px);
 border-radius: 13.964px; 
 ${tw`border border-blanc border-[1.461px]`}
 
 `
export const DiceWrapper = styled.div`
 position: relative;
 z-index: 10;
 width: 70px;
 height: 70px;
 border-radius: 13.964px;
 border-left: 5px solid #FF9C27;
 border-right: 5px solid #F26D21;
 background-image: linear-gradient(to left, #F26D21, #FF9C27), linear-gradient(to left, #F26D21, #FF9C27);
 background-size: 100% 5px;
 background-position:0 0, 0 100%;
 background-repeat:no-repeat;
`
// eslint-disable-next-line no-unused-vars
export enum DiceSides { MINUS_ONE, ONE, TWO, THREE, FOUR, FIVE, SIX } 

