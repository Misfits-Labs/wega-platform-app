import { Link } from 'react-router-dom';
import { logoDark } from '../../../assets/images';
import { 
  BrandContainer, 
  Brand, 
  NavigationLinksContainer,
} from './types';
import RainbowConnectButton from '../../components/RainBowConnectButton';
import 'twin.macro';



const Navigation = () => {
  const connected = true;
  return (
    <nav tw="box-border fixed w-full z-50 top-0">
      <div tw="container dark:text-blanc flex w-full py-5 justify-center">
        <BrandContainer>
          <li tw="mr-5">
            <Link to="/"><img className="logo" src={logoDark}  alt="logo"/></Link>
          </li>
          <Brand><Link to="/">Wega</Link><span className="ms-2"><sup>Play</sup></span></Brand>
        </BrandContainer>
        <NavigationLinksContainer tw="box-border">
          <li><Link to="/play"><span>Play</span></Link></li>
          <li><Link to="/swap"><span>Swap</span></Link></li>
          <li><Link to="/wins"><span>Mint</span></Link></li>
          {
            connected &&
            <li>
              <RainbowConnectButton />
            </li>
          }
        </NavigationLinksContainer>
      </div>
    </nav>
  )
}

export default Navigation;
