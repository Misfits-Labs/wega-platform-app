/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';
import { LogoDarkWo } from '../../assets/images';
import { 
  BrandContainer, 
  Brand, 
  NavigationLinksContainer,
  NavigationBar
} from './types';
import RainbowConnectButton from '../../components/RainBowConnectButton';
import { useAnimateNav } from '../../hooks';
import tw, { css } from 'twin.macro';

const Navigation = () => {
  useAnimateNav();
  const liElementStyle = css`
   > li {
    ${tw`box-border`}
    a {
      ${tw`block border-b-[2px] border-[transparent] hover:dark:border-oranjo`} 
    }
   }
  ` 

  return (
    <NavigationBar tw="font-primary">
      <div tw="relative z-[950] sm:container dark:text-blanc flex w-full py-[20px] px-[20px] justify-center items-end">
        <NavigationLinksContainer tw="box-border flex w-full gap-x-[30px]">
          <BrandContainer tw="mb-[4px]">
            <div tw="mr-5">
              <Link to="/"><LogoDarkWo /></Link>
            </div>
            <Brand><Link to="/">Wega</Link></Brand>
          </BrandContainer>
          <ul tw="block flex items-end" css={[liElementStyle]} >
            <li><Link to="/" tw="px-[8px]"><span>Play</span></Link></li>
            <li><Link to="/wins" tw="px-[8px]"><span>Wins</span></Link></li>
          </ul>
        </NavigationLinksContainer>
        <div> 
          <RainbowConnectButton />
        </div>
      </div>
    </NavigationBar>
  )
}
export default Navigation;

