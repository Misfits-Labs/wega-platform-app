import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface WalletState {
 address?: string;
 ensName?: string;
 ensAvatar?: string;
 balanceDecimals?: number;
 balanceFormatted?: string;
 balanceSymbol?: string;
 displayBalance?: string;
 displayName?: string;
 isConnected?: boolean;
 usdBalance?: string;
 chain?: {
  iconUrl?: string;
  id?: number;
  hasIcon?: boolean;
  unsupported?: boolean;
  name?: string;
 }
}

export const initialWalletState: WalletState = {
 address: undefined,
 chain: undefined,
 isConnected: false,
};
const walletSlice = createSlice({
 name: 'wallet',
 initialState: initialWalletState,
 reducers: {
  setWalletInformation(state, action: PayloadAction<WalletState>){ 
   if(action.payload == null) {
    return state = { ...initialWalletState }
   }
   const { ...wallet } = action.payload;
   return state = { ...wallet };
  },
 } 
});
export const { setWalletInformation } = walletSlice.actions;
export default walletSlice.reducer;
export const selectAccountInformation = ({ wallet }: RootState ) => ({ ...wallet });