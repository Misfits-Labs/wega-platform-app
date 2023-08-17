import {styled} from 'twin.macro';

export const DateColumn = styled.span`
 font-size: 16px;
 font-style: normal;
 font-weight: 400;
 line-height: 15px;
 color: #787878;
`

export const BarWrapper = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 align-self: stretch; 
`

export const GameTypeBadgeWrapper = styled.div`
 border-radius: 5px;
 background: #2E2E2E;
 display: flex;
 padding: 5px 10px;
 justify-content: center;
 align-items: center;
 gap: 10px;
 `
 
 export const BadgeText = styled.span`
 font-size: 16px;
 font-style: normal;
 font-weight: 400;
 line-height: 15px;
 display: inline;
 vertical-align: center;
 `
 
 export const WagerTypeBadgeWrapper = styled.div`
 display: flex;
 padding: 5px 10px;
 align-items: center;
 gap: 0px 10px;
 border-radius: 10px;
 background: #4B4B4B;
 width: fit-content;
 height: max-content;
 > span {
  display: inline;
 }
`