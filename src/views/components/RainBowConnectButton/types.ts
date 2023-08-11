import tw, { styled } from 'twin.macro';

export interface WegaConnectButtonProps {
 connected?: boolean;
 chainSupported?: boolean; 
}

export const WegaConnectButton = styled.button<WegaConnectButtonProps>(({ 
 connected,
 chainSupported,
 }) => [
 `
  border-radius: 5px;
  font-style: normal;
  font-weight: 700; 
  padding: 10px 25px;
  border-radius: 5px;
  max-height: fit-content;
 `,
 tw`text-base`,
 !connected && tw`text-pretu bg-gradient-to-r from-oranjoBlanc to-oranjo`,
  connected && tw`flex items-center justify-evenly dark:bg-pretuLighter`,
  connected && `
   gap: 12px;
   border-radius: 20px;
  `,
  connected && !!chainSupported && tw`dark:bg-pretuLighter`
])



// ${
//  tw`
//  text-pretu 
//  bg-gradient-to-r from-oranjoBlanc to-oranjo
//  text-base
//  `
// }
// 
// 
// 
// 
// max-width: fit-content;


// const StyledInput = styled.input(({ hasBorder }) => [
//  `color: black;`,
//  hasBorder && tw`border-purple-500`,
// ])