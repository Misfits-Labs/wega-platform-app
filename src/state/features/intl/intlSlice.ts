import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IntlProviderState {
 locale: string;
}

const initialState: IntlProviderState = {
 locale: 'en-US',
};
const intlProviderSlice = createSlice({
 name: 'intlProvider',
 initialState,
 reducers: {
  changeLocale(state, action: PayloadAction<string>){ state.locale = action.payload },
 }
});
export const { changeLocale } = intlProviderSlice.actions;
export default intlProviderSlice.reducer;