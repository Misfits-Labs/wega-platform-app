import {useEffect} from 'react'
import { useGetSet } from 'react-use';
import { Wallet, Network, User, HexishString,  AllPossibleCurrencyTypes } from '../models'
import { SupportedWagerTokenAddresses } from '../models/constants';
export function useCreateGameParams({
 wallet, user, network,currencyType 
}: {
 wallet?: Wallet,
 network?: Network,
 user?: User,
 currencyType: AllPossibleCurrencyTypes
}) {
  const [getTokenAddress, setTokenAddress] = useGetSet<HexishString | undefined>(undefined);
  const [getPlayerAddress, setPlayerAddress] = useGetSet<HexishString | undefined>(undefined);
  const [getUserUuid, setUserUuid] = useGetSet<string| undefined>(undefined);
  
  useEffect(() => {
    if(wallet && wallet.isConnected && user && network) {
      if(!(getTokenAddress() && getPlayerAddress() && getUserUuid())) {
        setTokenAddress(SupportedWagerTokenAddresses[currencyType][network?.id as number] as HexishString);
        setPlayerAddress(wallet.address as HexishString);
        setUserUuid(user.uuid as string);
      }
    } else {
      if(getTokenAddress() && getPlayerAddress() && getUserUuid()) {
        setTokenAddress(SupportedWagerTokenAddresses[currencyType][network?.id as number] as HexishString);
        setPlayerAddress(undefined);
        setUserUuid(undefined);
      }
    }
  }, [network?.id, wallet?.isConnected, user?.uuid, currencyType]);
  return {
   tokenAddress: getTokenAddress() as HexishString,
   playerAddress: getPlayerAddress() as HexishString,
   playerUuid: getUserUuid() as string
  }
}