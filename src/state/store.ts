import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import intlProviderReducer from './features/intl/intlSlice' 
import walletReducer from './features/wallet/walletSlice' 
import { apiSlice } from './features/api/apiSlice' 

const store = configureStore({
 reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer,
  intlProvider: intlProviderReducer,
  wallet: walletReducer,
  // userStore - need current logged user - address, isConnected, ens, ensAvatar, blockies Avatar
  // wallet: ,
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
 devTools: import.meta.env.DEV 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
setupListeners(store.dispatch);
