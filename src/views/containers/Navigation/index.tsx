import { Link } from 'react-router-dom';
import { LogoDarkWo } from '../../../assets/images';
import { 
  BrandContainer, 
  Brand, 
  NavigationLinksContainer,
} from './types';
import RainbowConnectButton from '../../components/RainBowConnectButton';
import 'twin.macro';

const Navigation = () => {
  return (
    <nav tw="box-border fixed w-full z-50 top-0 font-primary">
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
    </nav>
  )
}

export default Navigation;
