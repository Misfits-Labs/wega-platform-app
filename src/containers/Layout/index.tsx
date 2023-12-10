import { useCallback } from 'react'
import { 
  Outlet, 
  useNavigation, 
  type Location, 
  type useMatches,
  useLoaderData,
  ScrollRestoration 
} from 'react-router-dom';
import Navigation from '../Navigation'
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';
import { useMediaQuery, useWarnAppInBeta } from '../../hooks';
import NavigationMobile from '../NavigationMobile';
import FooterMobile from '../FooterMobile';
import { ComponentLoader } from '../../common/loaders';
import 'twin.macro';

const Layout = () => {
  useWarnAppInBeta();
  const navigation = useNavigation();
  const { windowIsCurrentlyMobile } = useMediaQuery();
  useLoaderData();
  const getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      const match = matches.find((m) => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === "pathname") {
        return location.pathname;
      }
      return location.key;
    },
  []
 );

 return (
    <>
     <ComponentLoader
       tw="w-[100vw] h-[100vh] flex justify-center"
       style={{
         display: navigation.state === "idle" ? "none" : "block",
       }}
     />
     { windowIsCurrentlyMobile ? <NavigationMobile /> : <Navigation /> }
     <div tw="min-h-[100vh] flex flex-col sm:mt-0 justify-between relative z-[inherit]">
        <Outlet />
      { windowIsCurrentlyMobile ? <FooterMobile /> : <Footer /> }
     </div>
     <ScrollRestoration getKey={getKey} />
     <Toaster />
     <div id="wega-overlay" tw="absolute top-[-10rem] h-[450vh] w-full bg-pretu bg-opacity-60 z-[701] hidden"></div>
    </>
  )
}
export default Layout;
