import { useEffect } from 'react';
import { useWegaStore } from ".";
// import { useLoginPlayerMutation } from '../state/features/api'; 

export function useLoginPlayer() {
 const { account: { isConnected, address, uuid } } = useWegaStore();
 // const [loginPlayer] = useLoginPlayerMutation()
 
 // useEffect(() => {
 //  console.log('login in player');
 // }, [])
}