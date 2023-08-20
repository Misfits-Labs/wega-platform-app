import { createSlice } from '@reduxjs/toolkit';



interface BlockchainState {
 isWagerApproved: boolean | undefined;
}
export const initialBlockchainState: BlockchainState = {
 isWagerApproved: undefined,
};

const blockchainSlice = createSlice({
 name: 'blockchain',
 initialState: initialBlockchainState,
 reducers: {
 },
});
export default blockchainSlice.reducer;

