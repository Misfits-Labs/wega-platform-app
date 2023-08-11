import { useCallback } from 'react'
import { Outlet, useNavigation, type Location, type useMatches, ScrollRestoration } from 'react-router-dom';
import 'twin.macro';
import Navigation from '../Navigation'

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
     <main tw="container mt-20 flex justify-center">
      <Outlet />
     </main>
     <footer tw="container flex justify-center">This is the footer</footer>
     <ScrollRestoration getKey={getKey} />
    </>
  )
}
export default Layout;
