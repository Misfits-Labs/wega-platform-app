import {useEffect} from 'react'
import { useGetSet } from 'react-use';
import { Wallet, Network, User, HexishString, CurrencyTypes, CurrencyTypesEnum } from '../models'
import { SupportedWagerTokenAddresses } from '../models/constants';
export function useCreateGameParams({
 wallet, user, network
}: {
 wallet?: Wallet,
 network?: Network,
 user?: User
}) {
  const [getTokenAddress, setTokenAddress] = useGetSet<HexishString | undefined>(undefined);
  const [getPlayerAddress, setPlayerAddress] = useGetSet<HexishString | undefined>(undefined);
  const [getUserUuid, setUserUuid] = useGetSet<string| undefined>(undefined);
  
  useEffect(() => {
    if((wallet && network && user) && !(getTokenAddress() && getPlayerAddress() && getUserUuid())) {
     setTokenAddress(SupportedWagerTokenAddresses(network?.id as number)[CurrencyTypes[CurrencyTypesEnum.USDC]]);
     setPlayerAddress(wallet.address as HexishString);
     setUserUuid(user.uuid as string);
    }
  }, [network?.id, wallet?.address, user?.uuid]);
  return {
   tokenAddress: getTokenAddress() as HexishString,
   playerAddress: getPlayerAddress() as HexishString,
   playerUuid: getUserUuid() as string
  }
}