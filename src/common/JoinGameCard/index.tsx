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
  HexishString,
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
import { useBlockchainApiHooks, useAppSelector, useNavigateTo } from '../../hooks';
import { selectWagerApproved } from '../../api/blockchain/blockchainSlice';
import toast from 'react-hot-toast';
import { toastSettings } from '../../utils';
import Button from '../Button';
import { useFormReveal } from '../CreateGameCard/animations';
import { useUpdateGameMutation } from '../../containers/App/api';

export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  tokenAddress: HexishString;
  playerAddress: HexishString;
  gameType: AllPossibleWegaTypes;
  playerUuid: string;
  wagerAmount: number;
  gameUuid: string;
  escrowId: HexishString;
  gameId: number;
}

const JoinGameCard = ({ 
  wagerType, 
  currencyType,
  tokenAddress,
  playerAddress,
  gameUuid,
  playerUuid,
  gameType,
  wagerAmount,
  escrowId,
  gameId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css,
  ...rest 
}: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  
  const formRef = useRef<HTMLFormElement>(null);
  const detailsBlock = useRef<HTMLDivElement>(null)
  const [currentWagerType] = useState<AllPossibleWagerTypes>(wagerType);
  const [currentCurrencyType] = useState<AllPossibleCurrencyTypes>(currencyType);
  const isWagerApproved = useAppSelector(state => selectWagerApproved(state));
  
  const {revealed, triggerRevealAnimation} = useFormReveal(false, formRef, detailsBlock);
  
  const { 
    useAllowanceQuery,
    useApproveERC20Mutation,
    useDepositWagerMutation,
  } = useBlockchainApiHooks;
  
  const { register, formState: { errors }, handleSubmit } = useForm({ 
    mode: 'onChange',
    resolver: joiResolver(createGameSchema('wager', wagerAmount)) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: wagerAmount,
    }
  });
  // approval for allowance
  const { isLoading: isGetAllowanceLoading, allowance } = useAllowanceQuery();
  
  // get token balance of userP
  const { data: userWagerBalance, isLoading: isWagerbalanceLoading } = useBalance({ 
    address: playerAddress,
    token: tokenAddress,
  })
  
  const { isLoading: isDepositWagerLoading, depositWager } = useDepositWagerMutation();
  const [ updateGame, { isLoading: isUpdateGameLoading  } ] = useUpdateGameMutation();
  const handleDepositWagerClick = async () => {
    try {
      await depositWager(escrowId).unwrap();
      await updateGame({ newPlayerUuid: playerUuid, gameUuid }).unwrap();
      navigateToGameUi(`/${gameType.toLowerCase()}/play/${gameId}`, 1500, { replace: true });
      toast.success('Deposit success', { ...toastSettings('success', 'top-center') as any });
    } catch (e: any){
      console.log(e)
      const message = e?.message ?? 'Deposit error'
      toast.error(message, { ...toastSettings('error', 'bottom-center') as any });
    }
  }

  // approve token
  const { isLoading: isApproveERC20Loading, approveERC20 } = useApproveERC20Mutation();
  const handleApproveWagerClick = ({ wager }: { wager: number }) => {
    approveERC20(tokenAddress, wager);
  };
  
  const navigateToGameUi = useNavigateTo()
  useEffect(() => {
    allowance(tokenAddress, playerAddress, wagerAmount);
  }, [tokenAddress, wagerAmount, isWagerApproved]);
  
  return (
    <form 
      tw="w-full flex flex-row justify-center" 
      onSubmit={!isWagerApproved ? handleSubmit(handleApproveWagerClick) : handleSubmit(handleDepositWagerClick)} 
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
            <InputBox tw="pointer-events-none" type="number" step="any" { ...register('wager', {
              setValueAs: () => wagerAmount, 
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
        {/* <Button buttonType="primary"><>Approve</></Button> */}
        { 
          isWagerApproved ? <Button type="submit" buttonType="primary" tw="flex">
          {(isDepositWagerLoading || isUpdateGameLoading) ? "Loading..." : "Deposit" }
          <StarLoaderIcon loading={(isDepositWagerLoading || isUpdateGameLoading)} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" /> 
          </Button> : <Button type="submit" buttonType="primary" tw="flex">
              { (isGetAllowanceLoading || isApproveERC20Loading) ? "Loading..." : "Approve" }
              <StarLoaderIcon loading={(isGetAllowanceLoading || isApproveERC20Loading)} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" />
          </Button>
        }
        {/* details */}
        {/* wager  */}
        <div tw="h-0 w-full" ref={detailsBlock}>
          <div tw="flex justify-between p-[20px] items-center" className="details-1 invisible">
            <LargeText>Wager</LargeText>
            <div tw="dark:bg-[#4B4B4B] rounded-[10px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px]">
              <span>{wagerAmount}</span>
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

export const createGameSchema = (fieldName: string, minAmount: number) => {
  return Joi.object({
    wager: Joi.number().min(minAmount).max(minAmount)
      .required()
      .messages({
        // 'number.base': `"Royalties" should of type number`,
        'number.base': `Oops! seems like you forgot to select a wager amount.`,
        'number.integer': `"${fieldName}" should be up to 2 decimal places`
      }),
  });
};

