/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';
import { LogoDarkWo } from '../../assets/images';
import { TwitterIcon, GithubIcon, WhitepaperIcon  } from '../../assets/icons';
import { Brand, BrandContainer } from '../Navigation/types';
import { NormalText } from '../../components/CreateGameCard/types';
import tw, { css} from 'twin.macro';

const FooterMobile = () => {
  const hoverStrokeOranjoStyle = css`
    &:hover svg path {
      border-color: black;
      ${tw`stroke-oranjo`}
    }
  `
  const hoverFillOranjoStyle = css`
    &:hover svg path {
      border-color: black;
      ${tw`fill-oranjo`}
    }
  `
  
  return (
    <footer tw="relative z-[0] w-full">
      {/* footer thingy */}

      <div tw="container dark:text-blanc mt-0 sm:mt-5 flex flex-col w-full py-[56px] font-primary gap-y-[30px] justify-center items-center">
            <div tw="flex flex-col w-full justify-center items-center gap-y-[15px]">
             <BrandContainer tw="mb-[4px]">
               <div tw="mr-5">
                 <Link to="/"><LogoDarkWo /></Link>
               </div>
               <Brand><Link to="/">Wega</Link></Brand>
             </BrandContainer>
             <NormalText tw="text-[16px] font-[300] leading-[19px] text-[#D3D3D3]">Play together, Own together.</NormalText>
            </div>
            
            <div tw="flex flex-col items-center">
              <div tw="flex gap-x-[24px] w-full justify-center">
                <a href="https://wega-1.gitbook.io/wega-lite-paper/" css={hoverStrokeOranjoStyle} target="_blank" tw="w-[24px]" rel="noreferrer">
                <WhitepaperIcon width="100%" height="100%" />
                </a>
                <a href="https://twitter.com/PlayWega" css={hoverFillOranjoStyle} target="_blank" tw="w-[24px]" rel="noreferrer">
                  <TwitterIcon width="100%" height="100%" />
                </a>
                <a href="https://github.com/Misfits-Labs" css={hoverStrokeOranjoStyle} target="_blank" tw="w-[24px]" rel="noreferrer">
                  <GithubIcon width="100%" height="100%"/>
                </a>
              </div>
            </div>
            
            <div tw="flex flex-col gap-x-[15px] items-center">
              <Link to="https://wega-1.gitbook.io/wega-lite-paper/" target="_blank">
                <NormalText>Documentation</NormalText>
              </Link>
              <Link to="https://app.wega.fun" target="_blank">
                <NormalText tw="text-transparent dark:bg-gradient-to-r from-oranjo-blanc to-oranjo  bg-clip-text">Play Beta(Web only)</NormalText>
              </Link>
            </div>
      </div> 
    </footer>
  )
}
export default FooterMobile;