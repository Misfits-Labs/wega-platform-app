import tw, { styled } from 'twin.macro';

export const ModalContainer = styled.div`
 position: fixed;
 top: 0;
 right: 0;
 width: 100vw;
 height: 100vh;
 z-index: 10000;
 display: flex;
 align-items: center;
 justify-content: center;
`

export const WinnerDeclarationContainer = styled.div`
 display: flex;
 padding: 30px 60px;
 flex-direction: column;
 align-items: flex-end;
 gap: 8px; 
 border-radius: 10px;
 background: #343434;
`
export const GradientDiv = styled.div`
   --border: 2px;
   display: flex;
   align-items: center;
   width: 100%;
   height: max-content;
   margin: auto;
   position: relative;
   box-sizing: border-box;
   background: #414141;
   background-clip: padding-box;
   ${tw`border border-[2px] border-transparent`}
   border-radius: 5px;

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1; 
    border-radius: inherit;
    ${tw`m-[2px]`}
    background: linear-gradient(to right, #5DEDD3, #00D62F);
  }
`