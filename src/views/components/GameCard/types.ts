import tw, { styled } from 'twin.macro';

export const GameCardContainer = styled.div`
border-radius: 20px; 
width: 272px;
position: relative;
z-index: 50;
${ tw`flex flex-col items-stretch` }
`
export const GameCardHeader = styled.div`
 border-radius: 5px 5px 0px 0px;
 background: #343434;
 min-height: 160px;
 width: 100%;
 position: inherit;
 z-index: inherit; 
`
export const GameCardBody = styled.div`
 border-radius: 0px 0px 5px 5px;
 padding: 20px 10px; 
 background: #282828;
 min-height: 186px;
 ${tw`flex flex-col justify-between items-center space-y-[24px]`}
  position: inherit;
  z-index: inherit; 
`

export const GameCardTitle = styled.span`
text-align: center;
font-size: 28px;
font-style: normal;
font-weight: 500;
line-height: 32px;
 ${tw`dark:text-blanc`}
`

export const GameCardDescription = styled.span`
text-align: center;
font-family: League Spartan;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 15px; 
 ${tw`dark:text-blanc`}
`