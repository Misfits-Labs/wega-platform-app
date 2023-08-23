import { useEffect } from 'react';
import Joi from 'joi';
import { CreateGameCardContainer, InputBox, NormalText, SmallText, MediumText } from "./types";
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes } from "../../models";
import { BadgeIcon, renderWagerBadge } from "../JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownIcon, StarLoaderIcon } from '../../assets/icons';
import 'twin.macro';
import { useForm } from 'react-hook-form';
import { useWegaStore, useBlockchainHelpers, useBlockchainApiHooks } from '../../hooks';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import Button from '../Button';


export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
}

const CreateGameCard = ({ wagerType, currencyType, ...rest }: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  const { useAllowanceQuery } = useBlockchainApiHooks;
  const { user, network, wallet } = useWegaStore();
  const { 
    wagerApprovalQuery, 
    wagerApprovalMutation,
    createWagerMutation,
  } = useBlockchainHelpers();
  const { allowance, isLoading, data, error, isSuccess, isError } = useAllowanceQuery();


  const tokenAddress = SupportedWagerTokenAddresses(network?.id as number)[currencyType];
  // get user usdt balance;
  // const [wager, setWager] = useGetSet<number>(0);
  const { register, formState: { errors }, getValues, watch, handleSubmit, setValue } = useForm({ 
    mode: 'onChange', 
    resolver: joiResolver(createGameSchema('wager')) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: 1
    }
  });
  
  const handleApproveWagerClick = ({ wager }: { wager: number }) => {
    wagerApprovalMutation.wagerApproval(tokenAddress, wager);
  }

  const handleCreateGameClick = ({ wager }: { wager: number }) => {
    createWagerMutation.createWager({ token: tokenAddress, creator: wallet?.address as `0x${string}`, numberOfPlayers: 2, wager })
  }

  const handleWagerOptionClicked = (e: any, wagerAmount: number) => {
    e.preventDefault();
    setValue("wager", wagerAmount);
  }


  useEffect(() => {
    if(tokenAddress && wallet && wallet.address && getValues('wager') > 0) allowance(tokenAddress, 0)
    console.log(`loading: ${isLoading} \n data: ${data} error: ${JSON.stringify(error)} \n success: ${isSuccess} \n isError: ${isError}`)
    
    // wagerApprovalQuery.wagerApproval(tokenAddress, wallet.address as `0x${string}`, getValues('wager'));
    // if(wagerApprovalMutation.approved.value) wagerApprovalQuery.wagerApproval(tokenAddress, account?.address as `0x${string}`, getValues('wager'))
  }, [watch('wager'), tokenAddress, wagerApprovalMutation.approved.value]);

  return tokenAddress && wallet && (
    <form tw="w-full flex flex-row justify-center" onSubmit={wagerApprovalQuery.approved.value ? handleSubmit(handleCreateGameClick) : handleSubmit(handleApproveWagerClick)}>
      <CreateGameCardContainer {...rest} tw="dark:bg-[#282828] rounded-[10px]">
        <div tw="flex w-[fit-content] justify-center items-center gap-[10px]">
          {/* icon */}
          <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
          <span>{currencyType}</span>
        </div>
        <div >
          {/* wager */}
          <div tw="flex flex-col items-center gap-y-[16px]">
            <InputBox type="number" step="any" { ...register('wager', {
              setValueAs: (v: string) => parseInt(v), 
            }) }/>
            <ErrorMessage
              errors={errors}
              name="wager"
              render={({ message }) => <NormalText tw="text-[#E11D48]">{message}</NormalText> }
            />
            <NormalText tw="dark:text-shinishi">00,00 USD</NormalText>
            <SmallText>Balance: {wallet.displayBalance} </SmallText> {/* useBalance from wagmi can be used here */}
          </div>
          {/* wager in usd */}
          {/* balance of users currency type */}
        </div>
        <div tw="flex gap-x-[16px]">
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={(e) => handleWagerOptionClicked(e, 1)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>1</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={(e) => handleWagerOptionClicked(e, 5)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>5</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={(e) => handleWagerOptionClicked(e, 10)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>10</span>
          </button>
        </div>
        {/* <Button buttonType="primary"><>Approve</></Button> */}
        {
          wagerApprovalQuery.approved.value ? 
          <Button type="submit" buttonType="primary" tw="flex">
            <>
              Start Game
              <StarLoaderIcon color="#000000" className="h-[16px] w-[16px] ms-[5px]" />
            </>
          </Button> :
          <Button type="submit" buttonType="primary" tw="flex">
          <>
            {
              wagerApprovalMutation.approved.loading ? 'Loading...' : 'Approve'
            }
            <StarLoaderIcon color="#000000" className="h-[16px] w-[16px] ms-[5px]" />
          </>
          </Button>
        }
        {/* button approve */}
        {/* button start game */}
        {/* game details */}

        <div tw="flex items-center gap-x-[8px]">
          <MediumText tw="dark:text-blanc">Show game details</MediumText>
          <ArrowDownIcon className="cursor-pointer"/>
        </div>
      </CreateGameCardContainer>
    </form>
  )
}
export default CreateGameCard;

export const createGameSchema = (fieldName: string) => {
  return Joi.object({
    wager: Joi.number().min(1).multiple(1 || 5 || 10)
      .required()
      .messages({
        // 'number.base': `"Royalties" should of type number`,
        'number.base': `Oops! seems like you forgot to select a wager amount.`,
        'number.integer': `"${fieldName}" should be up to 2 decimal places`
      }),
  });
};

