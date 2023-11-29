import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../libs/firebase';
import { useGetSet } from 'react-use';
import { 
  Player,
  WegaAttributes, 
  GameInfoType, 
  WegaTypes, 
  WegaTypesEnum, 
  AllPossibleCoinSides,
  PlayerFlipChoices,
  Wega
} from '../models';
 
export function useFirebaseData(gameUuid: string) {
  const [isGamePlayable, setIsGamePlayable] = useGetSet<boolean>(false);
  const [gameInfo, setGameInfo] = useGetSet<GameInfoType | undefined>(undefined);
  const [playersInGame, setPlayersInGame] = useGetSet<Player[]>([]);
  const [wegaAttributes, setWegaAttributes] = useGetSet<WegaAttributes>([]);
  const [playerFlipChoices, setPlayerFlipChoices] = useGetSet<PlayerFlipChoices | undefined >(undefined);
  const [gamesCount, setGamesCount] = useGetSet<number>(0);
  const [game, setGame] = useGetSet<Wega | undefined>(undefined);

  const startListeningFirebase = () => {
    const databaseRef = ref(database);
    onValue(databaseRef, (snapshot) => {
      const { games } = snapshot.val();
      setGamesCount(Object.keys(games).length);
      if(gameUuid) {
        setGame(games[gameUuid]);
        const { players, requiredPlayerNum, currentTurn, gameAttributes, gameType } = games[gameUuid];
        if(players.length === requiredPlayerNum) {
          setIsGamePlayable(true);
        } 
        if (players) {
          setPlayersInGame(players);
          setGameInfo(Object.assign({}, { currentRound: (Math.floor((currentTurn - 1) / requiredPlayerNum)), rollerIndex: (currentTurn % requiredPlayerNum), currentTurn }));
        }
        if (gameType === WegaTypes[WegaTypesEnum.COINFLIP]) {
          if(gameAttributes.length > 0){
            setWegaAttributes(gameAttributes);
            if(gameAttributes.length >= 1) {
              setPlayerFlipChoices((s: any) => ({
                ...s, 
                playerOne: Number(gameAttributes.filter((a: any) => a.key === 'players[0].flipChoice')[0].value) as AllPossibleCoinSides })
              )
              if(gameAttributes.length === 2) {
                setPlayerFlipChoices((s: any) => ({
                  ...s, 
                  playerTwo: Number(gameAttributes.filter((a: any) => a.key === 'players[1].flipChoice')[0].value) as AllPossibleCoinSides })
                )
              }
            }
          }
        }
      };
    });
  };

  useEffect(() => {
    startListeningFirebase();
  }, [
    gameUuid,
    setIsGamePlayable,
    setPlayersInGame,
    setGameInfo,
    setWegaAttributes,
    setPlayerFlipChoices,
    setGamesCount,
  ]);

  return { 
    isGamePlayable: isGamePlayable(), 
    players: playersInGame(),
    gameInfo: gameInfo(),
    gameAttributes: wegaAttributes(),
    playerFlipChoices: playerFlipChoices(),
    gamesCount: gamesCount(),
    game: game(),
  }
}