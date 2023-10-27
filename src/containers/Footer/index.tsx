import { Link } from 'react-router-dom';
import { TwitterIcon, WhitepaperIcon, GithubIcon } from '../../assets/icons';
import { SmallText } from '../../components/CreateGameCard/types';
import 'twin.macro';

const Footer = () => {
  return (
    <footer tw="relative z-[-10] mt-5 w-full">
      <div tw="container dark:text-blanc flex flex-col w-full py-[56px] font-primary items-end gap-y-[16px] items-center">
        <div tw="flex gap-x-[16px] ">
         <Link to="https://github.com/Misfits-Labs" target="_blank">
          <GithubIcon />
         </Link>
         <Link to="https://twitter.com/PlayWega" target="_blank">
          <TwitterIcon />
         </Link>
         <Link to="https://wega.gitbook.io/wega-litepaper/" target="_blank">
          <WhitepaperIcon />
         </Link>
        </div>
        <SmallText tw="dark:text-shinishi">&#169; 2023 Wega. All rights reserved.</SmallText>
       <div>
       </div>
      </div>
    </footer>
  )
}
export default Footer;