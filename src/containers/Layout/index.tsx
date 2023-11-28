import { useCallback } from 'react'
import { 
  Outlet, 
  useNavigation, 
  type Location, 
  type useMatches, 
  ScrollRestoration 
} from 'react-router-dom';
import Navigation from '../Navigation'
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';
import { GlobalModal } from '../../common/modals';
import 'twin.macro';

const Layout = () => {
 const navigation = useNavigation();
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
     <div
       className="spinner"
       style={{
         display: navigation.state === "idle" ? "none" : "block",
       }}
     >
       Navigating...
     </div>
     <Navigation />
     <div tw="min-h-[100vh] flex flex-col justify-between relative z-[inherit]">
      <GlobalModal>
        <Outlet />
      </GlobalModal>
      <Footer />
     </div>
     <ScrollRestoration getKey={getKey} />
     <Toaster />
    </>
  )
}
export default Layout;
