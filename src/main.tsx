import React from "react"
import ReactDOM from "react-dom/client"
import App from "./containers/App";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './app/store';
import { gamesApiSlice } from './components/WegaGames/apiSlice.ts'
import './themes/index.css'
import GlobalStyles  from "./themes/GlobalStyles.tsx";
import WalletProvider from './containers/WalletProvider/index.tsx' 

// TODO
  // remove old api files
store.dispatch(gamesApiSlice.endpoints.getGames.initiate(undefined));
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <WalletProvider isDark={true}>
        <GlobalStyles />
        <App />
      </WalletProvider>
    </ReduxProvider>
 </React.StrictMode>
)
