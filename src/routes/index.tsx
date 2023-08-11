import {
 createHashRouter,
} from "react-router-dom";
import Layout from "../views/containers/Layout"; 

const router = createHashRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
   {
    index: true,
    element: <>home</>
   },
   {
    path: 'play',
    element: <div>This is the homepage of play</div>
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