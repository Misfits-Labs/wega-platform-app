import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../libs/firebase';
import { useGetSet } from 'react-use';
import { Player } from '../models';

export function useFirebaseData(gameUuid: string) {
  const [isGamePlayable, setIsGamePlayable] = useGetSet<boolean>(false);
  const [currentGameTurn, setCurrentGameTurn] = useGetSet<number>(0);
  const [playersInGame, setPlayersInGame] = useGetSet<Player[]>([]);
  const startListeningFirebase = () => {
    const databaseRef = ref(database);
    onValue(databaseRef, (snapshot) => {
      const { games } = snapshot.val();
      const { players, requiredPlayerNum, currentTurn } = games[gameUuid];
      if(players.length === requiredPlayerNum) {
        setIsGamePlayable(true);
      } if (players){
        setPlayersInGame(players);
        setCurrentGameTurn(currentTurn);
      }
    });
  };

  useEffect(() => {
    startListeningFirebase();
  }, [currentGameTurn, isGamePlayable, gameUuid, playersInGame]);

  return { 
    isGamePlayable: isGamePlayable(), 
    currentTurn: currentGameTurn(), 
    players: playersInGame(),
  }
}













