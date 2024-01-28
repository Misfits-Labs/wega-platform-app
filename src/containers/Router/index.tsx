import {
 createHashRouter
} from "react-router-dom";
import Layout from "../Layout";
import PlayPage  from '../PlayPage';
import CreateGamePage  from '../CreateGamePage';
import JoinGamePage  from '../JoinGamePage';
import PlayGamePage  from '../PlayGamePage';
import ErrorPage from '../ErrorPage';
import WinsPage from '../WinsPage';
import { GlobalModal } from '../../common/modals';
import { gamesApiSlice } from '../../components/WegaGames/apiSlice'
import { createGameApiSlice } from '../../components/CreateGameCard/apiSlice'
import { store } from "../../app/store";

declare global  {
 interface Window{
   ethereum?: any
 }
}

const router = createHashRouter([
 {
  path: '/',
  element: <GlobalModal><Layout /></GlobalModal>,
  loader: async () => {
    store.dispatch(gamesApiSlice.endpoints.getGames.initiate(undefined)); // loads all games
    return null;
  },
  children: [
   {
    index: true,
    element: <PlayPage />,
   },
   {
    path: 'create/:gameType',
    element: <CreateGamePage />,
   },
   {
    path: 'join/:gameType/:id',
    element: <JoinGamePage />,
    loader: async () => store.dispatch(createGameApiSlice.endpoints.getRandomNumber.initiate(undefined)), 
   },
   {
    path: 'play/:gameType/:id',
    element: <PlayGamePage />,
   },
   {
    path: 'wins',
    loader: async () =>  store.dispatch(gamesApiSlice.endpoints.getGames.initiate({ state:  'COMPLETED'})),
    element: <WinsPage />,
   },
   {
    path: '*',
    element: <ErrorPage />, 
   },
  ]
 },
])

export const mobileRouter = createHashRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
   {
    index: true,
    element: <PlayPage />,
    errorElement:<ErrorPage /> 
   },
   {
    path: "*",
    element:<ErrorPage /> 
   },
  ]
 }
])

if (import.meta.hot) {
 import.meta.hot.dispose(() => router.dispose());
}

export default router;