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
   align-items: center;
 }
`

export const NavigationConnectButton = styled.button`
 ${
  tw`
  text-pretu 
  bg-gradient-to-r from-oranjo-blanc to-oranjo
  text-base
  `
 }
 font-style: normal;
 font-weight: 700; 
 padding: 10px 25px;
 border-radius: 5px;
 max-width: fit-content;
`

export const NavigationBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  transition: transform 500ms ease-out 100ms;

  &.nav-show {
    transform: initial;
    &::after {
      opacity: 0.95;
    }
    &::before {
      opacity: 0.85;
    }
  }
  &.nav-hide {
    transform: translateY(-100%);
  }

  &::before, &.nav-mobile .navigation::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    ${tw`dark:bg-pretu/90`}
    filter: blur(1.5rem);
    opacity: 0;
    transition: opacity 500ms ease-out 60ms;
  }

  &::after, &.nav-mobile .navigation::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: -3;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5.5rem) opacity(0.75);
    opacity: 0;
    ${tw`dark:shadow-wega-nav`}
    transition: all 500ms ease-out 60ms;
    ${tw`dark:bg-pretu/90`}
  }
`

// box-shadow: 0rem -3.5rem 1.5rem 5rem var(--background-color);
