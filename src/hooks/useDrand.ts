import {useEffect, useState} from 'react'
import { useGetRandomNumberQuery } from '../components/CreateGameCard/apiSlice';
export function useDrand() {
 const randomness = useGetRandomNumberQuery(undefined);
 // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
 const [drandInLocalStorage, _] = useState<string>(window.localStorage.getItem('drand') ?? 'empty');
 const [currentDrand, setCurrentDrand] = useState<any>(null);
 
 useEffect(() => {
  if(drandInLocalStorage === 'empty' && randomness?.data) {
   setCurrentDrand(randomness.data);
   setTimeout(() => {
    randomness.refetch();
   }, (60 * 1000) * 3);
  } else if (drandInLocalStorage !== 'empty' && randomness?.data) {
   setCurrentDrand(JSON.parse(drandInLocalStorage));
   window.localStorage.setItem('drand', JSON.stringify(randomness?.data ?? 'empty'))
  } 
  if(drandInLocalStorage === 'empty' && (randomness.data && randomness.data?.round === JSON.parse(drandInLocalStorage).round)){
   setTimeout(() => {
    randomness.refetch();
   }, (60 * 1000) * 3);
  } else {
   window.localStorage.setItem('drand', JSON.stringify(randomness?.data ?? 'empty'))
  }
 }, [randomness?.data, randomness?.isLoading, setCurrentDrand]);
 
 return currentDrand;
}
