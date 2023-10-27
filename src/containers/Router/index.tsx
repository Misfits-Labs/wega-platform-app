import {
 createHashRouter,
 redirect
} from "react-router-dom";
import Layout from "../Layout";
import PlayPage  from '../PlayPage';
import CreateGamePage  from '../CreateGamePage';
import JoinGamePage  from '../JoinGamePage';
import PlayGamePage  from '../PlayGamePage';
import WinsPage from '../WinsPage';
import { gamesApiSlice } from '../../components/WegaGames/apiSlice'; 

declare global  {
 interface Window{
   ethereum?: any
 }
}

const router = createHashRouter([
 {
  path: '/',
  element: <Layout />,
  loader: async() => {
   gamesApiSlice.endpoints.getGames.initiate(undefined);
   return null;
  },
  children: [
   {
    index: true,
    element: <PlayPage />
   },
   {
    path: ':gameType',
    children: [
     {
      index: true,
      element: <PlayPage />, 
     },
     {
      path: 'create',
      element: <CreateGamePage />,
      loader: async () => { 
       if(!window.ethereum.isConnected() || !window.ethereum.selectedAddress) {
        redirect('/');
       }
       return null;       
      },
     },
     {
      path: 'join/:id',
      element: <JoinGamePage />
     },
     {
      path: 'play/:id',
      element: <PlayGamePage />
     }
    ]
   },
   {
    path: 'swap',
    element: <div>This is the homepage of swap</div>
   },
   {
    path: 'wins',
    element: <WinsPage />
   }
  ]
 }
])

if (import.meta.hot) {
 import.meta.hot.dispose(() => router.dispose());
}

export default router;