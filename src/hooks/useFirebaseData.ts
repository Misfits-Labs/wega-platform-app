import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../libs/firebase';
import { useGetSet } from 'react-use';
import { Player } from '../models';

export function useFirebaseData(gameUuid: string) {
  const [isGamePlayable, setIsGamePlayable] = useGetSet<boolean>(false);
  const [gameInfo, setGameInfo] = useGetSet<{ currentRound: number, rollerIndex: number, currentTurn: number }| undefined>(undefined);
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
        setGameInfo(Object.assign({}, { currentRound: (Math.floor((currentTurn - 1) / requiredPlayerNum)), rollerIndex: (currentTurn % requiredPlayerNum), currentTurn }));
      }
    });
  };

  useEffect(() => {
    startListeningFirebase();
  }, [isGamePlayable, gameUuid, playersInGame, setGameInfo]);

  return { 
    isGamePlayable: isGamePlayable(), 
    players: playersInGame(),
    gameInfo: gameInfo(),
  }
}













