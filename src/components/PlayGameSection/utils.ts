import { PlayerCardStates } from './types'
export function getGameStatus({
 isGamePlayable,
 isCurrentUserGameCreator,
 isCurrentUserTurn
}: {
 isGamePlayable: boolean;
 isCurrentUserGameCreator: boolean;
 isCurrentUserTurn: boolean;
}) {
 if(!isGamePlayable) {
  if(isCurrentUserGameCreator){
   return PlayerCardStates.CONNECTED
  } else {
   return PlayerCardStates.CONNECTING
  }
 } else {
  if(isCurrentUserTurn) {
   return PlayerCardStates.ROLLING
  } else {
   return PlayerCardStates.IDLE
  }
 }
}
export function isCurrentUserGameCreator(
 gameCreatorUuid: string, currentUserUuid: string) {
  return gameCreatorUuid === currentUserUuid;
}