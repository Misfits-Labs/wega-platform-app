import { useEffect, useState } from 'react';
import GameBar from "../../common/GameBar";
import ClaimBar from "../../common/ClaimBar";
import Section from '../../common/Section';
import { JoinableGamesHeaderBar } from '../../common/JoinableGameBar/types';
import { useGetGamesQuery } from './apiSlice';
import { HexishString, Wega, WegaState } from '../../models';
import { ComponentLoader } from '../../common/loaders';

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

 return !isLoading ? (<Section hdr="Join matches instantly" direction="col" tw="gap-2 mt-[35px] " { ...rest }>
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
   <span tw="invisible"></span>
  </JoinableGamesHeaderBar>
    {
     gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`joinable-and-playable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" /> )) 
    }
  </Section>
 ) : <ComponentLoader tw="w-full flex justify-center" />
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
 }, [data, gamesCount, isSuccess]);
 return !isLoading ? (<Section hdr="Available Matches" direction="col" tw="gap-2" { ...rest } >
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
  </JoinableGamesHeaderBar>
  {
   gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`joinable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) 
  }
  </Section>
 ) : <ComponentLoader tw="w-full flex justify-center" />
}

export const PlayableGames: React.FC<JoinableAndPlayableGamesProps> = ({ gamesCount, userUuid, ...rest }: JoinableAndPlayableGamesProps) => {
 const { data, isLoading, isSuccess } = useGetGamesQuery({ state: WegaState.PLAYING });
 const [gameIds, setGameIds] = useState<number[]>();
 useEffect(() => {
  if(isSuccess && data && data?.entities) {
    const dataArray = data.ids.map((id: number) => data.entities[id]) as Wega[];
    const joinableGames = filterJoinableGames(dataArray, userUuid);
    const sortedGameIds = sortPlayableGames(joinableGames).map(game => game.id);
    setGameIds(sortedGameIds ?? []);
  }
 }, [data, gamesCount, isSuccess]);
 return !isLoading ? (<Section hdr="Playable Matches" direction="col" className="gap-2" { ...rest }>
  <JoinableGamesHeaderBar>
   <span>Date created</span>
   <span>Game</span>
   <span>Wager</span>
   <span>Escrow</span>
  </JoinableGamesHeaderBar>
  {
   gameIds && gameIds.map((gameId: number) => (<GameBar gameId={gameId} key={`playable-game-bar${gameId}`} tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) 
  }
  </Section>
 ) : <ComponentLoader tw="w-full flex justify-center" />
}

// const filterClaimableGames = (data: Wega[], userWalletAddress: HexishString) => data.filter(game => game.gameWinners?.some(predicate => predicate.winner.toLowerCase() === userWalletAddress.toLowerCase() ));
export interface ClaimableGamesProps extends React.Attributes, React.HTMLAttributes<HTMLDivElement> {
  userWalletAddress: HexishString;
  gamesCount: number;
  networkId: number;
 }
export const ClaimableGames: React.FC<ClaimableGamesProps> = ({ networkId, gamesCount, userWalletAddress, ...rest }: ClaimableGamesProps) => {
  const { data, isLoading, isSuccess } = useGetGamesQuery({ state: WegaState.COMPLETED, winners: userWalletAddress });
  const [sortedGames, setSortedGames] = useState<Wega[]>();
  useEffect(() => {
    if(isSuccess && data && data?.entities) {
      const dataArray = data.ids.map((id: number) => data.entities[id]) as Wega[];
      const sortedGameIds = sortPlayableGames(dataArray).map(game => game.id);
      // setGameIds(sortedGameIds ?? undefined);
      setSortedGames(sortedGameIds.map(id => data.entities[id] as Wega) ?? []);
    }
  }, [data, gamesCount, isSuccess, userWalletAddress]); 
  return !isLoading ? (<Section hdr="Tokens won" direction="col" tw="gap-2" { ...rest } >
    {
     sortedGames && sortedGames.length > 0 ? sortedGames.map((game: Wega, i) => (
     <ClaimBar game={game} networkId={networkId} count={i + 1} gameId={game.id} key={`claim-wins-bar-${i}`} className="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px]" />)) : <></>
    }
    
    </Section> 
  ) : <ComponentLoader tw="w-full flex justify-center" />
}