import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './useAppDispatch';
import type { RootState } from '../app/store';
import { AllPossibleWegaTypes, HexishString } from '../models';
import {
 selectAllowanceQueryData,
 selectAllowanceQueryStatus,
 selectAllowanceQueryError,
 selectHashWagerQueryData,
 selectHashWagerQueryStatus,
 selectHashWagerQueryError,
 selectApproveERC20MutationData,
 selectApproveERC20MutationStatus,
 selectApproveERC20MutationError,
 selectCreateWagerMutationData,
 selectCreateWagerMutationStatus,
 selectCreateWagerMutationError,
 selectDepositOfQueryData,
 selectDepositOfQueryStatus,
 selectDepositOfQueryError,
 selectDepositWagerMutationData,
 selectDepositWagerMutationStatus,
 selectDepositWagerMutationError,
 selectGetGameResultsQueryData,
 selectGetGameResultsQueryStatus,
 selectGetGameResultsQueryError,
 selectGetWinnersQueryData,
 selectGetWinnersQueryStatus,
 selectGetWinnersQueryError,
 selectClaimMutationData,
 selectClaimMutationStatus,
 selectClaimMutationError,
} from '../api/blockchain/blockchainSlice';
import {
 allowanceQuery,
 approveERC20Mutation,
 hashWagerQuery,
 createWagerMutation,
 depositOfQuery,
 depositWagerMutation,
 getWinnersQuery,
 getGameResultsQuery,
 claimMutation,
} from '../api/blockchain/thunks';


function useAllowanceQuery(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectAllowanceQueryData(state));
  const status = useAppSelector((state: RootState) => selectAllowanceQueryStatus(state));
  const error = useAppSelector((state: RootState) => selectAllowanceQueryError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();  
  const allowance = (tokenAddress: HexishString, owner: HexishString, wager: number) => dispatch(allowanceQuery({ tokenAddress, owner, wager }));
  
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);

  return {allowance, error, data, isLoading, isError, isIdle, isSuccess }
}

function useHashWagerQuery(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectHashWagerQueryData(state));
  const status = useAppSelector((state: RootState) => selectHashWagerQueryStatus(state));
  const error = useAppSelector((state: RootState) => selectHashWagerQueryError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();  
  const hashWager = (inpts:{ tokenAddress: HexishString, playerAddress: HexishString, accountsCount: number, wager: number }) => dispatch(hashWagerQuery({ ...inpts }));
  
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);
  return { hashWager, error, data, isLoading, isError, isIdle, isSuccess }
}

function useApproveERC20Mutation(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectApproveERC20MutationData(state));
  const status = useAppSelector((state: RootState) => selectApproveERC20MutationStatus(state));
  const error = useAppSelector((state: RootState) => selectApproveERC20MutationError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const approveERC20 = (tokenAddress: HexishString, wager: number) => dispatch(approveERC20Mutation({ tokenAddress, wager }));
  useEffect(() => {
    setIsError(status === 'rejected');
    setisloading(status === 'pending');
    setIsIdle(status === 'idle');
    setIsSuccess(status === 'fulfilled');
  }, [status, data, error, dispatch]);
  return { approveERC20, error, data, isLoading, isError, isIdle, isSuccess }; 
}

function useCreateWagerMutation(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectCreateWagerMutationData(state));
  const status = useAppSelector((state: RootState) => selectCreateWagerMutationStatus(state));
  const error = useAppSelector((state: RootState) => selectCreateWagerMutationError(state));

  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  
  const createWager = (inpts: { 
    tokenAddress: HexishString; 
    playerAddress: HexishString; 
    accountsCount: number; 
    wager: number;
    gameType: AllPossibleWegaTypes;
  }) => dispatch(createWagerMutation({ ...inpts }));
  
  useEffect(() => {
    setIsError(status === 'rejected');
    setisloading(status === 'pending');
    setIsIdle(status === 'idle');
    setIsSuccess(status === 'fulfilled');
  }, [status, data, error, dispatch]);

  return { createWager, error, data, isLoading, isError, isIdle, isSuccess }; 
}

function useClaimMutation(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectClaimMutationData(state));
  const status = useAppSelector((state: RootState) => selectClaimMutationStatus(state));
  const error = useAppSelector((state: RootState) => selectClaimMutationError(state));

  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  
  const claim = (escrowHash: HexishString ) => dispatch(claimMutation({ escrowHash }));
  
  useEffect(() => {
    setIsError(status === 'rejected');
    setisloading(status === 'pending');
    setIsIdle(status === 'idle');
    setIsSuccess(status === 'fulfilled');
  }, [status, data, error, dispatch]);

  return { claim, error, data, isLoading, isError, isIdle, isSuccess }; 
}

function useDepositWagerMutation(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectDepositWagerMutationData(state));
  const status = useAppSelector((state: RootState) => selectDepositWagerMutationStatus(state));
  const error = useAppSelector((state: RootState) => selectDepositWagerMutationError(state));

  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  
  const depositWager = (escrowId: HexishString) => dispatch(depositWagerMutation({ escrowId }));
  
  useEffect(() => {
    setIsError(status === 'rejected');
    setisloading(status === 'pending');
    setIsIdle(status === 'idle');
    setIsSuccess(status === 'fulfilled');
  }, [status, data, error, dispatch]);

  return { depositWager, error, data, isLoading, isError, isIdle, isSuccess }; 
}

function useDepositOfQuery(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectDepositOfQueryData(state));
  const status = useAppSelector((state: RootState) => selectDepositOfQueryStatus(state));
  const error = useAppSelector((state: RootState) => selectDepositOfQueryError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();  
  const depositOf = (escrowHash: HexishString, account: HexishString) => dispatch(depositOfQuery({ escrowHash, account }));
  
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);
  return {depositOf, error, data, isLoading, isError, isIdle, isSuccess }
}

function useGetGameResultsQuery(){
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectGetGameResultsQueryData(state));
  const status = useAppSelector((state: RootState) => selectGetGameResultsQueryStatus(state));
  const error = useAppSelector((state: RootState) => selectGetGameResultsQueryError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();  
  const getGameResults = (gameType: AllPossibleWegaTypes,escrowHash: HexishString, players: HexishString[]) => dispatch(getGameResultsQuery({ escrowHash, players, gameType }));
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);
  return { getGameResults, error, data, isLoading, isError, isIdle, isSuccess }
}

function useGetWinnersQuery() {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: RootState) => selectGetWinnersQueryData(state));
  const status = useAppSelector((state: RootState) => selectGetWinnersQueryStatus(state));
  const error = useAppSelector((state: RootState) => selectGetWinnersQueryError(state));
  const [isError, setIsError] = useState<boolean>();
  const [isLoading, setisloading] = useState<boolean>();
  const [isIdle, setIsIdle] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();  
  const getWinners = (gameType: AllPossibleWegaTypes, escrowHash: HexishString) => dispatch(getWinnersQuery({ escrowHash, gameType }));
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);
  return {getWinners, error, data, isLoading, isError, isIdle, isSuccess }
}

export const useBlockchainApiHooks = {
  useAllowanceQuery,
  useApproveERC20Mutation,
  useHashWagerQuery,
  useCreateWagerMutation,
  useDepositOfQuery,
  useDepositWagerMutation,
  useGetGameResultsQuery,
  useGetWinnersQuery,
  useClaimMutation,
}