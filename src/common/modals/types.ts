import tw, { styled } from 'twin.macro';

export const ModalContainer = styled.div`
 position: fixed;
 top: 0;
 right: 0;
 width: 100vw;
 height: 100vh;
 background-color: rgba(45, 45, 45, 0.5);
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
export const ClaimModalTitle = styled.span`
 text-align: center;
 leading-trim: both;
 font-family: League Spartan;
 font-size: 21px;
 font-style: normal;
 font-weight: 700;
 line-height: 12px;
 letter-spacing: 0.42px;
 ${tw`dark:text-blanc`}
`
