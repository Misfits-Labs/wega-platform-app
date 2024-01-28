import { HelmetProvider } from 'react-helmet-async';
import LanguageProvider from '../LanguageProvider';
import { localeSelector } from '../LanguageProvider/intlSlice';
import { useAppSelector, useMediaQuery } from '../../hooks';
import { RouterProvider } from 'react-router-dom';
import router, { mobileRouter } from '../Router';
import { ComponentLoader } from '../../common/loaders';
import 'twin.macro';


function App() {
  const locale = useAppSelector(state => localeSelector(state));
  const { windowIsCurrentlyMobile } = useMediaQuery();

  return (
    <LanguageProvider locale={locale}>
      <HelmetProvider>
        <RouterProvider router={!windowIsCurrentlyMobile ? router : mobileRouter} fallbackElement={<ComponentLoader tw="w-[100vw] h-[100vh] flex justify-center items-center"/>} />
      </HelmetProvider>
    </LanguageProvider>
  )
}
export default App
