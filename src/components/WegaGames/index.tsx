import { useEffect, useState } from 'react';
import GameBar from "../../common/GameBar";
import Section from '../../common/Section';
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
import { useGetGamesQuery } from './apiSlice';
import { Wega, WegaState } from '../../models';
import 'twin.macro';

export interface JoinableAndPlayableGamesProps extends React.Attributes, React.HTMLAttributes<HTMLDivElement> {
 userUuid: string;
 gamesCount: number;
}
const filterPlayableGames = (data: Wega[], userUuid: string) => data.filter(game => game.state === WegaState.PLAYING && game.players.some(predicate => predicate.uuid === userUuid ));
const filterJoinableGames = (data: Wega[], userUuid: string) => data.filter(game => game.state === WegaState.PENDING && game.players.every(predicate => predicate.uuid !== userUuid )); 
const filterWaitingGames = (data: Wega[], userUuid: string) => data.filter(game => game.state === WegaState.PENDING && game.players.some(predicate => predicate.uuid === userUuid )); 
const sortPlayableGames = (data: Wega[]) => data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
export const JoinableAndPlayableGames: React.FC<JoinableAndPlayableGamesProps> = ({ gamesCount, userUuid, ...rest }: JoinableAndPlayableGamesProps) => {
 const { data, isLoading, isSuccess} = useGetGamesQuery(undefined);
 const [gameIds, setGameIds] = useState<number[]>();
 useEffect(() => {
  if(isSuccess && data && data?.entities) {
    const dataArray = data.ids.map((id: number) => data.entities[id]) as Wega[];
    const playableGames = filterPlayableGames(dataArray, userUuid);
    const joinableGames = filterJoinableGames(dataArray, userUuid);
    const waitingGames  = filterWaitingGames(dataArray, userUuid);
    const sortedGameIds = sortPlayableGames([...playableGames, ...joinableGames, ...waitingGames]).map(game => game.id);
    setGameIds(sortedGameIds);
  }
 }, [data, gamesCount, isSuccess]);

 return (<Section hdr="Join matches instantly" direction="col" tw="gap-2 mt-[35px] " { ...rest }>
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
   <span tw="invisible"></span>
  </JoinableGamesHeaderBar>
    {
      !isLoading && gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`joinable-and-playable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" /> )) 
    }
  </Section>
 )
}

export const JoinableGames: React.FC<JoinableAndPlayableGamesProps> = ({ gamesCount, userUuid, ...rest }: JoinableAndPlayableGamesProps) => {
 const { data, isLoading, isSuccess} = useGetGamesQuery({ state: WegaState.PENDING });
 const [gameIds, setGameIds] = useState<number[]>();
 useEffect(() => {
  if(isSuccess && data && data?.entities) {
    const dataArray = data.ids.map((id: number) => data.entities[id]) as Wega[];
    const joinableGames = filterJoinableGames(dataArray, userUuid);
    const sortedGameIds = sortPlayableGames(joinableGames).map(game => game.id);
    setGameIds(sortedGameIds ?? []);
  }
 }, [data, gamesCount]);
 return (<Section hdr="Available Matches" direction="col" tw="gap-2" { ...rest } >
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
  </JoinableGamesHeaderBar>
  {
   !isLoading && gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`joinable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) 
  }
  </Section>
 )
}

export const PlayableGames: React.FC<JoinableAndPlayableGamesProps> = ({ gamesCount, userUuid, ...rest }: JoinableAndPlayableGamesProps) => {
 const { data, isLoading, isSuccess } = useGetGamesQuery({ state: WegaState.PLAYING });
 const [gameIds, setGameIds] = useState<number[]>();
 useEffect(() => {
  if(isSuccess && data) {
    const dataArray = data.ids.map((id: number) => data.entities[id]) as Wega[];
    const joinableGames = filterJoinableGames(dataArray, userUuid);
    const sortedGameIds = sortPlayableGames(joinableGames).map(game => game.id);
    setGameIds(sortedGameIds ?? []);
  }
 }, [data, gamesCount]);
 return (<Section hdr="Playable Matches" direction="col" className="gap-2" { ...rest }>
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
  </JoinableGamesHeaderBar>
  {
   !isLoading && gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`playable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) 
  }
  </Section>
 )
}

// interface ClaimableGamesProps extends JoinableAndPlayableGamesProps {
//   winners: HexishString[];
//   gameType: AllPossibleWegaTypes;
//   escrowHash: HexishString;
// }
// export const ClaimableGames: React.FC<JoinableAndPlayableGamesProps> = ({ gamesCount, userUuid, ...rest }: JoinableAndPlayableGamesProps) => {
//  const getGamesQuery = useGetGamesQuery({ state: WegaState.COMPLETED });
//  const [gameIds, setGameIds] = useState<number[]>();
//  const getGameWinners = async (games: Wega[]) => await Promise.all(games.map(async (game) => {
//   const { gameType, wager: { wagerHash } } = game;
//   const winnersData = playGameBlockchainApiSlice.endpoints.getGameWinners.useQuery({ gameType, escrowHash: wagerHash as HexishString });
//  })) 

//  const { data: winners } = useGetGameWinnersQuery({  });
 
//  useEffect(() => {
//   if(getGamesQuery.isSuccess && getGamesQuery.data) {
//     // once we have the data,

//   }
//   const dataArray = getGamesQuery.data.ids.map((id: number) => getGamesQuery.data.entities[id]) as Wega[];
//   const joinableGames = filterJoinableGames(dataArray, userUuid);
//   const sortedGameIds = sortPlayableGames(joinableGames).map(game => game.id);
//   setGameIds(sortedGameIds ?? []);
//  }, [data, gamesCount]);
//  return (<Section hdr="Playable Matches" direction="col" className="gap-2" { ...rest }>
//   <JoinableGamesHeaderBar>
//    <span>Date created</span>
//    <span>Game</span>
//    <span>Wager</span>
//    <span>Escrow</span>
//   </JoinableGamesHeaderBar>
//   {
//    !isLoading && gameIds && gameIds.map((gameId: number, i) => (<ClaimBar count={i+1} gameId={gameId} key={`playable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) 
//   }
//   </Section>
//  )
// }

