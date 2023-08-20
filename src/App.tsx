import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import LanguageProvider from './views/containers/LanguageProvider';
import { useAppSelector } from './hooks/useAppDispatch';
import { RouterProvider } from 'react-router-dom';
import { gamesApiSlice } from './state/features/games/gamesSlice';
import store from './state/store'
import router from './routes';
import 'twin.macro'


function App() {
  store.dispatch(gamesApiSlice.endpoints.getGames.initiate());
  const locale = useAppSelector(state => state.intlProvider.locale);
  useEffect(()=>{
    const htmlElement = document.documentElement;
    if(htmlElement && !htmlElement.classList.contains('dark')) htmlElement.classList.add('dark');
  })
  return (
    <LanguageProvider locale={locale}>
      <HelmetProvider>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </HelmetProvider>
    </LanguageProvider>
  )
}
export default App
