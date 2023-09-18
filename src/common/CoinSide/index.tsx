import { CoinSideHeadsIcon, CoinSideTailsIcon } from "../../assets/icons";
import { CoinSideTypes, CoinSideTypesEnum, AllPossibleCoinSides } from "../../models";
import 'twin.macro';

export const COIN_SIDE_COMPONENTS: any = {
 [CoinSideTypes[CoinSideTypesEnum.HEADS]]: CoinSideHeadsIcon, 
 [CoinSideTypes[CoinSideTypesEnum.TAILS]]: CoinSideTailsIcon, 
}

export interface CoinSideProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
 coinSide: AllPossibleCoinSides;
}

const CoinSide: React.FC<CoinSideProps> = ({ children, coinSide, ...rest }: CoinSideProps) => {
  if(coinSide){
    const CoinSideComp = COIN_SIDE_COMPONENTS[String(coinSide)];
    return children ? <CoinSideComp {...rest}>{children}</CoinSideComp> : <CoinSideComp {...rest}/>;
  } else {
    return null;
  }
}
export default CoinSide;