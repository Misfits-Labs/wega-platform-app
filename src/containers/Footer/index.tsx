import { BrandContainer, Brand } from '../Navigation/types';
import { Link } from 'react-router-dom';
import { NormalText } from '../../common/CreateGameCard/types';
import { LogoDarkWo } from '../../assets/images';
import 'twin.macro';


const Footer = () => {
  return (
    <footer tw="fixed w-full bottom-0">
      <div tw="container dark:text-blanc flex w-full py-[56px] font-primary items-end gap-x-[10px] justify-between">
       <BrandContainer tw="mb-[4px]">
         <div tw="mr-[15px]">
          <LogoDarkWo tw="w-[25px]" />
         </div>
         <Brand>Wega</Brand>
       </BrandContainer>
       <div>
        <span tw="text-[21px] font-[400] leading-[19px]">
         Play together, Own together
        </span>
       </div>
       <div>
         <Link to="https://wega.gitbook.io/wega-litepaper/" target="_blank"><NormalText>Documentation</NormalText></Link>
       </div>
      </div>
    </footer>
  )
}
export default Footer;