import tw, { styled } from 'twin.macro';

export const ComponentLoaderWrapper = styled.div`
 width: 100%;
 height: 100%;
 
 ${tw`flex flex-row justify-center items-center`}
 > svg {
  width: 48px;
  height: 48px;
  ${tw`animate-spin`}
 }
`