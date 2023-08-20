import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { apiSlice } from '../api/apiSlice';

interface WalletState {
 uuid: string;
 address: `0x${string}` | string;
 ensName?: string;
 ensAvatar?: string;
 balanceDecimals?: number;
 balanceFormatted?: string;
 balanceSymbol?: string;
 displayBalance?: string;
 displayName?: string;
 isConnected?: boolean;
 usdBalance?: string;
 hasPendingTransactions?: boolean;
 chain?: {
  iconUrl?: string;
  id?: number;
  hasIcon?: boolean;
  unsupported?: boolean;
  name?: string;
 }
}

export const initialWalletState: WalletState = {
 uuid: "",
 address: "",
 chain: undefined,
 isConnected: false,
 balanceDecimals: undefined,
 balanceFormatted: undefined,
 balanceSymbol: undefined,
 displayBalance: undefined,
 displayName: undefined,
 usdBalance: undefined,
 hasPendingTransactions: undefined,
};
const walletSlice = createSlice({
 name: 'wallet',
 initialState: initialWalletState,
 reducers: {
  setWalletInformation(state, action: PayloadAction<WalletState>){
   if(action.payload == null) {
    return  { ...state, ...initialWalletState }
   }
   const { ...wallet } = action.payload;
   return { ...state, ...wallet };
  },
 },
 extraReducers: (builder) => {
  builder.addMatcher(apiSlice.endpoints.loginPlayer.matchFulfilled, (state, { payload }) => {
   return { ...state, uuid: payload };
  });
 }
});
export const { setWalletInformation } = walletSlice.actions;
export default walletSlice.reducer;
export const selectWallet = (state: RootState ) => state.wallet;

export const selectAccountInformation = createSelector([selectWallet], ({ chain, ...account }) => {
 return ({ chain, account });
});
