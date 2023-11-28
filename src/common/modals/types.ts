import { styled } from 'twin.macro';

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
