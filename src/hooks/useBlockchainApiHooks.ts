import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './useAppDispatch';
import type { RootState } from '../app/store';
import { HexIshString } from '../models';
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
 selectDepositOfQueryError
} from '../api/blockchain/blockchainSlice';
import {
 allowanceQuery,
 approveERC20Mutation,
 hashWagerQuery,
 createWagerMutation,
 depositOfQuery
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
  const allowance = (tokenAddress: HexIshString, owner: HexIshString, wager?: number) => dispatch(allowanceQuery({ tokenAddress, owner, wager }));
  
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
  const hashWager = (inpts:{ token: HexIshString, creator: HexIshString, accountsCount: number, wager: number }) => dispatch(hashWagerQuery({ ...inpts }));
  
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
  const approveERC20 = (tokenAddress: HexIshString, wager: number) => {
    dispatch(approveERC20Mutation({ tokenAddress, wager }));
  };
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
  const createWager = (inpts: { token: HexIshString, creator: HexIshString, accountsCount: number, wager: number }) => {
    dispatch(createWagerMutation({ ...inpts }));
  };
  
  useEffect(() => {
    setIsError(status === 'rejected');
    setisloading(status === 'pending');
    setIsIdle(status === 'idle');
    setIsSuccess(status === 'fulfilled');
  }, [status, data, error, dispatch]);

  return { createWager, error, data, isLoading, isError, isIdle, isSuccess }; 
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
  const depositOf = (escrowHash: HexIshString, account: HexIshString) => dispatch(depositOfQuery({ escrowHash, account }));
  
  useEffect(() => {
    setIsError(status === 'rejected')
    setisloading(status === 'pending')
    setIsIdle(status === 'idle')
    setIsSuccess(status === 'fulfilled')
  }, [status, data, error, dispatch]);
  return {depositOf, error, data, isLoading, isError, isIdle, isSuccess }
}

export const useBlockchainApiHooks = {
  useAllowanceQuery,
  useApproveERC20Mutation,
  useHashWagerQuery,
  useCreateWagerMutation,
  useDepositOfQuery,
}