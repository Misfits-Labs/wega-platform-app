import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
 address?: string,
 ensName?: string,
 ensAvatar?: string,
 balanceDecimals?: number,
 balanceFormatted?: string,
 balanceSymbol?: string,
 displayBalance?: string,
 displayName?: string,
 usdBalance?: string,
 chain?: {
  iconUrl?: string,
  hasIcon?: boolean,
  unsupported?: boolean,
 }
}

const initialState: WalletState = {
 address: '',
 chain: {
  hasIcon: undefined,
  unsupported: undefined,
  iconUrl: undefined,
 },
};
const walletSlice = createSlice({
 name: 'wallet',
 initialState,
 reducers: {
  setWalletInformation(state, action: PayloadAction<Partial<WalletState>>){ 
   const { chain, ...wallet } = action.payload;
   return state = { ...wallet, chain } 
  }
 }
});
export const { setWalletInformation } = walletSlice.actions;
export default walletSlice.reducer;