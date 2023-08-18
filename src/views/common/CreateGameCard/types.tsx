import tw, { styled } from 'twin.macro';

export const CreateGameCardContainer = styled.div`
 display: flex;
 max-width: 559px;
 padding: 30px;
 flex-direction: column;
 align-items: center;
 gap: 32px;
` 

export const InputBox = styled.input`
 font-family: League Spartan;
 font-size: 67px;
 font-style: normal;
 font-weight: 600;
 line-height: 68px;
 ${tw`bg-inherit focus:outline-none`}
 text-align: center;
 
 -moz-appearance: textfield;

 &::-webkit-outer-spin-button, 
 &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
 }
`

export const MediumText = styled.span`
 font-family: League Spartan;
 font-size: 16px;
 font-style: normal;
 font-weight: 400;
 line-height: 15px;
`

export const SmallText = styled.span`
 font-family: League Spartan;
 font-size: 12px;
 font-style: normal;
 font-weight: 300;
 line-height: 9px; 
`
