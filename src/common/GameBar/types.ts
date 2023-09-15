import tw, {styled} from 'twin.macro';

export const DateColumn = styled.span`
 font-size: 16px;
 font-style: normal;
 font-weight: 400;
 line-height: 15px;
 color: #787878;
`

export const BarWrapper = styled.div`
 align-items: center;
 align-self: stretch;
`

export const GameTypeBadgeWrapper = styled.div`
 border-radius: 5px;
 background: #2E2E2E;
 display: flex;
 padding: 5px 10px;
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
 justify-content: start;
 gap: 0px 10px;
 border-radius: 10px;
 background: #4B4B4B;
 width: fit-content;
 height: max-content;
 > span {
  display: inline;
 }
`

export const JoinableGamesHeaderBar = styled.div`
 display: flex;
 align-items: flex-start;
 justify-content: space-between;
 gap: 10px;
 border-radius: 10px;
 ${tw`px-2`}
`

type BadgeIconContainerProps = {
 size?: string;
}

export const BadgeIconContainer = styled.div<BadgeIconContainerProps>(({ size }) => size ? [
 `width: ${size};
  height: ${size};
 `
] : [ tw`w-[24px] h-[24px]`]) 

export const BarHeaderColumn = styled.span`
 font-family: League Spartan;
 font-size: 21px;
 font-style: normal;
 font-weight: 400;
 line-height: 19px;
 ${tw`text-shinishi`}
`