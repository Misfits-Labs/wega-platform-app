import {useEffect, useState} from 'react'
import { useGetRandomNumberQuery } from '../components/CreateGameCard/apiSlice';
import  { convertBytesToNumber} from '../utils'
export function useDrand() {
 const randomness = useGetRandomNumberQuery(undefined);
 const [currentDrand, setCurrentDrand] = useState<any>(null);
 
 useEffect(() => {
  if(!currentDrand && randomness?.data){
   setCurrentDrand(randomness.data);
   console.log(randomness?.data.randomness && convertBytesToNumber(randomness?.data.randomness))
  } else {
   setTimeout(() => {
    randomness.refetch();
   }, (60 * 1000) * 3);
  }
 }, [randomness?.data, randomness?.isLoading]);
 return currentDrand;
}
