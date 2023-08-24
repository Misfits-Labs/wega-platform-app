import { useEffect, useRef, useState } from 'react';
import Joi from 'joi';
import { 
  CreateGameCardContainer, 
  InputBox, 
  NormalText, 
  SmallText, 
  MediumText, 
  LargeText 
} from "../CreateGameCard/types";
import { 
  GameTypeBadgeWrapper,
 } from '../JoinableGameBar/types';
import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes, 
  HexIshString,
  AllPossibleWegaTypes,
} from "../../models";
import { 
  BadgeIcon, 
  renderWagerBadge,
  renderGameTypeBadge,
  BADGE_TEXTS
} from "../JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownIcon, StarLoaderIcon } from '../../assets/icons';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { useBalance } from 'wagmi';
import { useBlockchainApiHooks } from '../../hooks';
import { selectWagerApproved } from '../../api/blockchain/blockchainSlice';
import { useCreateGameMutation } from '../../containers/App/api';
import toast from 'react-hot-toast';
import { toastSettings } from '../../utils';
import Button from '../Button';
import { ToggleWagerBadge } from '../ToggleWagerBadge';
import { useFormReveal } from '../CreateGameCard/animations';
import { utils } from 'ethers';



export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  tokenAddress: HexIshString;
  playerAddress: HexIshString;
  gameType: AllPossibleWegaTypes;
  playerUuid: string;
}

const JoinGameCard = ({ 
  wagerType, 
  currencyType,
  tokenAddress,
  playerAddress,
  playerUuid,
  gameType,
  ...rest 
}: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  
  const formRef = useRef<HTMLFormElement>(null);
  const detailsBlock = useRef<HTMLDivElement>(null)
  const [currentWagerType] = useState<AllPossibleWagerTypes>(wagerType);
  const [currentCurrencyType, setCurrentCurrencyType] = useState<AllPossibleCurrencyTypes>(currencyType);
  
  const {revealed, triggerRevealAnimation} = useFormReveal(false, formRef, detailsBlock);
  
  const { 
    useAllowanceQuery,
    useApproveERC20Mutation,
  } = useBlockchainApiHooks;
  
  const { register, formState: { errors }, getValues, watch, handleSubmit, setValue } = useForm({ 
    mode: 'onChange', 
    resolver: joiResolver(createGameSchema('wager')) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: 1
    }
  });
  
  // approval for allowance
  const { isLoading: isGetAllowanceLoading, allowance } = useAllowanceQuery();
  
  // get token balance of user
  const { data: userWagerBalance, isLoading: isWagerbalanceLoading } = useBalance({ 
    address: playerAddress,
    token: tokenAddress,
  })
  
  // approve token
  const { isLoading: isApproveERC20Loading, approveERC20 } = useApproveERC20Mutation();  
  const handleApproveWagerClick = ({ wager }: { wager: number }) => {
    approveERC20(tokenAddress, wager);
  };
    
  const handleWagerOptionClicked = (e: any, wagerAmount: number) => {
    e.preventDefault();
    setValue("wager", wagerAmount);
  }


  useEffect(() => {
    allowance(tokenAddress, playerAddress, getValues('wager'));
  }, [watch('wager'), tokenAddress ]);
  


  return (
    <form 
      tw="w-full flex flex-row justify-center" 
      onSubmit={handleSubmit(handleApproveWagerClick)} 
      ref={formRef}
    >
      <CreateGameCardContainer {...rest} tw="dark:bg-[#282828] rounded-[10px]">
        {/* badge selection */}
        <div tw="cursor-pointer flex w-[fit-content] justify-center items-center gap-[10px] px-[10px] py-[5px]">
          {/* icon */}
          <BadgeIcon><>{renderWagerBadge(currentWagerType, currentCurrencyType)}</></BadgeIcon>
          <span>{currentCurrencyType}</span>
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
            <SmallText> Balance: {
              isWagerbalanceLoading ? "Retrieving balance..." : userWagerBalance?.formatted + ' ' + userWagerBalance?.symbol 
            } </SmallText> 
            {/* useBalance from wagmi can be used here */}
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
            <BadgeIcon><>{renderWagerBadge(currentWagerType, currentCurrencyType)}</></BadgeIcon>
            <span>1</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={(e) => handleWagerOptionClicked(e, 5)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(currentWagerType, currentCurrencyType)}</></BadgeIcon>
            <span>5</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={(e) => handleWagerOptionClicked(e, 10)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(currentWagerType, currentCurrencyType)}</></BadgeIcon>
            <span>10</span>
          </button>
        </div>
        {/* <Button buttonType="primary"><>Approve</></Button> */}
          <Button type="submit" buttonType="primary" tw="flex">
            { (isGetAllowanceLoading || isApproveERC20Loading) ? "Loading..." : "Approve" }
            <StarLoaderIcon loading={(isGetAllowanceLoading || isApproveERC20Loading)} color="#000000" tw="h-[16px] w-[16px] ms-[5px]" />
          </Button>
        {/* button approve */}
        {/* button start game */}
        
        
        {/* details */}
        {/* wager  */}
        <div tw="h-0 w-full" ref={detailsBlock}>
          <div tw="flex justify-between p-[20px] items-center" className="details-1 invisible">
            <LargeText>Wager</LargeText>
            <div tw="dark:bg-[#4B4B4B] rounded-[10px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px]">
              <span>{watch('wager')}</span>
              <BadgeIcon><>{renderWagerBadge(currentWagerType, currentCurrencyType)}</></BadgeIcon>
              <span>{currencyType}</span>
            </div>
          </div>
          
          {/* game */}
          <div tw="flex justify-between p-[20px] items-center" className="details-2 invisible">
            <LargeText>Game</LargeText>
            <GameTypeBadgeWrapper tw="rounded-[10px] dark:bg-[#414141]">
              {renderGameTypeBadge(gameType)}
              <NormalText>{BADGE_TEXTS[gameType]}</NormalText>
            </GameTypeBadgeWrapper>
          </div>
        </div>
        
        {/* game details */}
        <div tw="flex items-center gap-x-[8px]">
          <MediumText tw="dark:text-blanc">{revealed ? "Hide game details" : "Show game details"}</MediumText>
          <ArrowDownIcon className="cursor-pointer" css={[revealed && tw`rotate-180`]} onClick={triggerRevealAnimation}/>
        </div>
      </CreateGameCardContainer>
    </form>
  )
}
export default JoinGameCard;

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

