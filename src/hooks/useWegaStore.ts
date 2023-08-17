import { useAppSelector } from ".";

export function useWegaStore(){
 const { chain, account } = useAppSelector(({ wallet: { chain, ...account } }) => ({ chain, account }))
 return {
  account,
  chain
 }
}