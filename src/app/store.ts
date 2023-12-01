import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import walletConnectionReducer from '../components/RainBowConnectButton/connectionSlice'
import { blockchainApiSlice } from './blockchainApiSlice';
import { appApiSlice } from './apiSlice';
import intlReducer from '../containers/LanguageProvider/intlSlice'
import blockchainReducer from '../api/blockchain/blockchainSlice'

export const store = configureStore({
  reducer: {
    connection: walletConnectionReducer,
    [appApiSlice.reducerPath]: appApiSlice.reducer,
    [blockchainApiSlice.reducerPath]: blockchainApiSlice.reducer,
    blockchain: blockchainReducer,
    language: intlReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    appApiSlice.middleware,
    blockchainApiSlice.middleware
  ),
  devTools: import.meta.env.VITE_REDUX_DEBUG === "true" ? true : false
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,Action<string>
>;