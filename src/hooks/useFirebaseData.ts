import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../libs/firebase';
import { useGetSet } from 'react-use';
import { Player, WegaAttributes, GameInfoType } from '../models';

export function useFirebaseData(gameUuid: string) {
  const [isGamePlayable, setIsGamePlayable] = useGetSet<boolean>(false);
  const [gameInfo, setGameInfo] = useGetSet<GameInfoType | undefined>(undefined);
  const [playersInGame, setPlayersInGame] = useGetSet<Player[]>([]);
  const [wegaAttributes, setWegaAttributes] = useGetSet<WegaAttributes>([]);
  const startListeningFirebase = () => {
    const databaseRef = ref(database);
    onValue(databaseRef, (snapshot) => {
      const { games } = snapshot.val();
      const { players, requiredPlayerNum, currentTurn, gameAttributes } = games[gameUuid];
      if(players.length === requiredPlayerNum) {
        setIsGamePlayable(true);
      } 
      if (players) {
        setPlayersInGame(players);
        setGameInfo(Object.assign({}, { currentRound: (Math.floor((currentTurn - 1) / requiredPlayerNum)), rollerIndex: (currentTurn % requiredPlayerNum), currentTurn }));
      }
      if (gameAttributes) setWegaAttributes(gameAttributes);
    });
  };

  useEffect(() => {
    startListeningFirebase();
  }, [isGamePlayable, gameUuid, playersInGame, setGameInfo, setWegaAttributes]);

  return { 
    isGamePlayable: isGamePlayable(), 
    players: playersInGame(),
    gameInfo: gameInfo(),
    gameAttributes: wegaAttributes(),
  }
}













