import { useAppSelector } from ".";
import {selectAccountInformation} from '../state/features/wallet/walletSlice';


export function useWegaStore(){
 const { chain, account } = useAppSelector(state => selectAccountInformation(state));
 
 return {
  account,
  chain,
 }
}