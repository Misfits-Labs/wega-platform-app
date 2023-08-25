import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
interface IntlProviderState {
 locale: string;
}

const initialState: IntlProviderState = {
 locale: 'en-US',
};
const intlProviderSlice = createSlice({
 name: 'language',
 initialState,
 reducers: {
  changeLocale(state, action: PayloadAction<string>){ state.locale = action.payload },
 }
});
export const { changeLocale } = intlProviderSlice.actions;
export default intlProviderSlice.reducer;
export const localeSelector = (state: RootState) => state.language.locale;
