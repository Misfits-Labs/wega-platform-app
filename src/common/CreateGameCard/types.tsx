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

export const NormalText = styled.span`
 font-size: 16px;
 font-style: normal;
 font-weight: 400;
 line-height: 15px;
`

export const LargeText = styled.span`
 font-family: League Spartan;
 font-size: 28px;
 font-style: normal;
 font-weight: 500;
 line-height: 32px;
`
export const ExtraLargeText = styled.span`
 font-family: League Spartan;
 font-size: 38px;
 font-style: normal;
 font-weight: 600;
 line-height: 35px;
`

export const MediumText = styled.span`
leading-trim: both;
text-edge: cap;
font-family: League Spartan;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 12px;
`

export const SmallText = styled.span`
 font-size: 12px;
 font-style: normal;
 font-weight: 300;
 line-height: 9px; 
`
