import {
 createHashRouter,
} from "react-router-dom";
import Layout from "../views/containers/Layout";
import PlayPage  from '../views/containers/PlayPage';

const router = createHashRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
   {
    index: true,
    element: <PlayPage />
   },
   {
    path: 'play',
    element: <PlayPage />
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