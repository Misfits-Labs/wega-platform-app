import { createSlice } from '@reduxjs/toolkit';
import { BigNumberish } from 'ethers';
import { RootState } from '../../app/store';
import { HexIshString } from '../../models';

type RequestState = 'pending' | 'fulfilled' | 'rejected';
type StatusByEndpointName = 'allowance' | 'approvedWager' | 'hash' | 'nonceByUserAddress';
type StatusByName = Record<string, RequestState | undefined>;

interface BlockchainState {
 allowance: BigNumberish | undefined;
 approvedWager: boolean | undefined;
 hash: string | undefined;
 nonceByUserAddress: Record<string, number | undefined> 
 statusByEndpointName: Record<StatusByEndpointName, StatusByName | undefined>;
}


export const initialBlockchainState: BlockchainState = {
 allowance: undefined,
 approvedWager: undefined,
 hash: undefined,
 nonceByUserAddress: {},
 statusByEndpointName: {
  allowance: {},
  approvedWager: {},
  hash: {},
  nonceByUserAddress: {}
 },
};

const blockchainSlice = createSlice({
 name: 'blockchain-api',
 initialState: initialBlockchainState,
 reducers: {},
});

export default blockchainSlice.reducer;
export const selectAllowance = (state: RootState) => state.blockchain.allowance;
export const selectApprovedWager = (state: RootState) => state.blockchain.approvedWager;
export const hash = (state: RootState) => state.blockchain.hash
export const nonceByUserAddress = (state: RootState, address: HexIshString) => state.blockchain.nonceByUserAddress[address];