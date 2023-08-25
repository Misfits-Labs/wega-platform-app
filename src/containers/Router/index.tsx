import {
 createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout";
import PlayPage  from '../PlayPage';
import CreateGamePage  from '../CreateGamePage';
import JoinGamePage  from '../JoinGamePage';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Layout />,
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
      element: <PlayPage />
     },
     {
      path: 'create',
      element: <CreateGamePage />
     },
     {
      path: 'join/:id',
      element: <JoinGamePage />
     }
    ]
   },
   {
    path: 'swap',
    element: <div>This is the homepage of swap</div>
   },
   {
    path: 'wins',
    element: <div>This is the homepage of wins</div>
   }
  ]
 }
])

if (import.meta.hot) {
 import.meta.hot.dispose(() => router.dispose());
}

export default router;