import { useAppSelector } from ".";
import {
 selectNetwork,
 selectUser,
 selectWallet,
} from '../containers/App/AppSlice';


export function useWegaStore(){
 const network = useAppSelector(state => selectNetwork(state));
 const user = useAppSelector(state => selectUser(state));
 const wallet = useAppSelector(state => selectWallet(state));
 
 return {
  network,
  user,
  wallet
 }
}