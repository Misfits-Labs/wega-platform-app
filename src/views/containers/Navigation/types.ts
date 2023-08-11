import tw, { styled } from 'twin.macro'


export const BrandContainer = styled.ul`
 display: flex;
 align-items: end;
 box-sizing: border-box;
 > li:first-child img {
  width: 24px;
 }

`

export const Brand = styled.li`
 font-weight: 700;
 font-size: 32px;
 line-height: 0.8;
 &:focus, &:hover {
  unset;
 }
 span {
  ${tw`text-shinishi dark:text-shinishi`}
  font-weight: 400;
  font-size: 21px;
  line-height: 19px;
  text-align: center;
  margin-left: toRem(10, $font-base);
 }
`

export const NavigationLinksContainer = styled.ul`
flex-grow: 1;
display: grid;
align-content: end;
justify-content: center;
grid-template-columns: 0.05fr 0.05fr 0.05fr 0.75fr;
box-sizing: border-box;

> li {
   display: flex;
   align-items: flex-end;
   box-sizing: border-box;
   -webkit-box-sizing: border-box;
   
   a {
       display: block;
       box-sizing: border-box;
       &:hover {
           border-bottom: 1px solid #FDFDFD;
       }
       & span {
           padding-bottom: 0.5rem;
       } 
   }
 }
 & div:last-child, li:nth-child(4) {
   justify-self: flex-end;
 }
`

export const NavigationConnectButton = styled.button`
 ${
  tw`
  text-pretu 
  bg-gradient-to-r from-oranjoBlanc to-oranjo
  text-base
  `
 }
 font-style: normal;
 font-weight: 700; 
 padding: 12px 24px;
 border-radius: 5px;
 max-width: fit-content;
`
