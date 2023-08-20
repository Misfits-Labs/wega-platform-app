import { Link } from 'react-router-dom';
import { LogoDarkWo } from '../../../assets/images';
import { 
  BrandContainer, 
  Brand, 
  NavigationLinksContainer,
  NavigationBar
} from './types';
import RainbowConnectButton from '../../components/RainBowConnectButton';
import { useAnimateNav } from '../../../hooks';
import 'twin.macro';

const Navigation = () => {
  useAnimateNav();

  return (
    <NavigationBar className="box-border fixed w-full top-0 font-primary">
      <div tw="container dark:text-blanc flex w-full py-5 px-[20px] justify-center">
        <BrandContainer>
          <li tw="mr-5">
            <Link to="/"><LogoDarkWo /></Link>
          </li>
          <Brand><Link to="/">Wega</Link><span className="ms-2"><sup>Play</sup></span></Brand>
        </BrandContainer>
        <NavigationLinksContainer tw="box-border">
          <li><Link to="/play"><span>Play</span></Link></li>
          <li><Link to="/swap"><span>Swap</span></Link></li>
          <li><Link to="/wins"><span>Mint</span></Link></li>
          <li>
            <RainbowConnectButton />
          </li>
        </NavigationLinksContainer>
      </div>
    </NavigationBar>
  )
}

export default Navigation;
