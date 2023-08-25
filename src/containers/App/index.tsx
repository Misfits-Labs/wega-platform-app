import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import LanguageProvider from '../LanguageProvider';
import { localeSelector } from '../LanguageProvider/intlSlice';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { RouterProvider } from 'react-router-dom';
import { appApiSlice } from './api';
import { store } from '../../app/store';
import router from '../Router';
import 'twin.macro';


function App() {
  store.dispatch(appApiSlice.endpoints.getGames.initiate());
  const locale = useAppSelector(state => localeSelector(state));
  
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