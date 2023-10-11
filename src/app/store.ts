import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../containers/App/AppSlice'
import { appApiSlice } from '../containers/App/api';
import { blockchainApiSlice } from './blockchainApiSlice';
import { appApiSlice as newAppApiSlice } from './apiSlice';
import intlReducer from '../containers/LanguageProvider/intlSlice'
import blockchainReducer from '../api/blockchain/blockchainSlice'

export const store = configureStore({
  reducer: {
    [appApiSlice.reducerPath]: appApiSlice.reducer,
    [newAppApiSlice.reducerPath]: newAppApiSlice.reducer,
    [blockchainApiSlice.reducerPath]: blockchainApiSlice.reducer,
    blockchain: blockchainReducer,
    app: appReducer,
    language: intlReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    appApiSlice.middleware,
    newAppApiSlice.middleware,
    blockchainApiSlice.middleware
  ),
  devTools: import.meta.env.VITE_REDUX_DEBUG === "true" ? true : false
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,Action<string>
>;