import { useEffect, useRef, useState } from 'react';
import Joi from 'joi';
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
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
 } from '../../common/JoinableGameBar/types';
import { 
  AllPossibleCurrencyTypes, 
  AllPossibleWagerTypes,
  WegaState,
} from "../../models";
import { 
  BadgeIcon, 
  renderWagerBadge,
  renderGameTypeBadge,
  BADGE_TEXTS
} from "../../common/JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownIcon, StarLoaderIcon } from '../../assets/icons';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { useBalance } from 'wagmi';
import { useCreateGameParams, useWegaStore, useNavigateTo, useTokenUSDValue, useDrand } from '../../hooks';
import { useDepositAndJoinDiceMutation } from './blockchainApiSlice';
import { useAllowanceQuery, useApproveERC20Mutation } from '../CreateGameCard/blockchainApiSlice';
import toast from 'react-hot-toast';
import { toastSettings, escrowConfig, toBigIntInWei, convertBytesToNumber, parseError } from '../../utils';
import Button from '../../common/Button';
import { useFormReveal } from '../CreateGameCard/animations';
import { useJoinGameMutation, useUpdateGameMutation } from './apiSlice';
import { JoinGameCardProps } from './'
import { ComponentLoader } from '../../common/loaders'

export interface JoinDiceGameCardProps extends JoinGameCardProps, React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {};

const JoinGameDiceCard: React.FC<JoinDiceGameCardProps> = ({ 
  wagerType, 
  currencyType,
  gameUuid,
  gameType,
  wagerAmount,
  escrowId,
  gameId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css,
  ...rest 
}: JoinDiceGameCardProps) => {
  const { openConnectModal } = useConnectModal();
  const { wallet, user, network } = useWegaStore();
  const drand = useDrand();
  const formRef = useRef<HTMLFormElement>(null);
  const detailsBlock = useRef<HTMLDivElement>(null)
  const [currentWagerType] = useState<AllPossibleWagerTypes>(wagerType);
  const [currentCurrencyType] = useState<AllPossibleCurrencyTypes>(currencyType);
  const {tokenAddress, playerAddress, playerUuid} = useCreateGameParams({ wallet, user, network, currencyType: currentCurrencyType }); // TODO change to generic name
  const {revealed, triggerRevealAnimation} = useFormReveal(false, formRef, detailsBlock);

  
  // should go into blockchain api slice 
  const { register, formState: { errors }, handleSubmit, watch } = useForm({ 
    mode: 'onChange',
    resolver: joiResolver(createGameSchema('wager', wagerAmount)) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: wagerAmount,
    }
  });

  const wagerUSDValue = useTokenUSDValue(currentCurrencyType, watch('wager'));

  // approval for allowance
  const isWagerApproved = (allowance: number, wagerAmount: number) => allowance >= wagerAmount;
  const allowanceQuery = useAllowanceQuery({ 
    spender: escrowConfig.address[network?.id as keyof typeof escrowConfig.address], 
    owner: playerAddress,
    tokenAddress,  
  });

  // get token balance of user
  const { data: userWagerBalance, isLoading: isWagerbalanceLoading } = useBalance({ 
    address: playerAddress,
    token: tokenAddress,
  })
  
  const [updateGame, updateGameQuery] = useUpdateGameMutation(); 
  const [depositAndJoinDice, depositAndJoinQuery] = useDepositAndJoinDiceMutation();
  const [joinGame, joinGameQuery] = useJoinGameMutation();
  const [approveERC20, approveERC20Query] = useApproveERC20Mutation();
  const handleDepositWagerClick = async () => {
    try {
      if(!isWagerApproved(allowanceQuery.data, wagerAmount)) {
        await approveERC20({ spender: escrowConfig.address[network?.id as keyof typeof escrowConfig.address], wagerAsBigint: toBigIntInWei(wagerAmount), tokenAddress }).unwrap();
      }
      await depositAndJoinDice({ 
        escrowHash: escrowId, 
        randomness: [convertBytesToNumber(drand.randomness)] 
      }).unwrap();
      await joinGame({ newPlayerUuid: playerUuid, gameUuid }).unwrap();
      await updateGame({ uuid: gameUuid, state: WegaState.PLAYING }).unwrap();
      navigateToGameUi(`/play/${gameType.toLowerCase()}/${gameUuid}`, 1500, { replace: true, state: { gameId: gameId, gameUuid } });
      toast.success('Deposit success', { ...toastSettings('success', 'top-center') as any });
    } catch (e: any){
      console.log(e)
      const message = parseError(e, 'Deposit error');
      toast.error(message, { ...toastSettings('error', 'bottom-center') as any });
    }
  }

  const navigateToGameUi = useNavigateTo()
  useEffect(() => {
    allowanceQuery.refetch();
  }, [tokenAddress, wagerAmount]);
  
  return drand ?  (
    <form 
      tw="w-full flex flex-row justify-center" 
      onSubmit={handleSubmit(handleDepositWagerClick)} 
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
            <NormalText tw="dark:text-shinishi">{wagerUSDValue.loading ? 'loading...' : wagerUSDValue.value} USD</NormalText>
            <SmallText> Balance: {
              isWagerbalanceLoading ? "Retrieving balance..." : parseFloat(userWagerBalance?.formatted as string).toFixed(2) 
            } </SmallText> 
            {/* useBalance from wagmi can be used here */}
          </div>
          {/* wager in usd */}
          {/* balance of users currency type */}
        </div>
        {/* <Button buttonType="primary"><>Approve</></Button> */}
        { 
          (!(tokenAddress && playerAddress && playerUuid) && openConnectModal) ? <Button buttonType="primary" tw="flex" onClick={
            (e: any) => { 
              e.preventDefault();
              openConnectModal();
            }}>
            {"Play game"}
            <StarLoaderIcon loading={false} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" />
          </Button> :
          <Button type="submit" buttonType="primary" tw="flex">
          {(
            approveERC20Query.isLoading || 
            depositAndJoinQuery.isLoading || 
            joinGameQuery.isLoading || 
            updateGameQuery.isLoading 
          ) ? "Loading..." : "Play game"}
          <StarLoaderIcon loading={approveERC20Query.isLoading || depositAndJoinQuery.isLoading || joinGameQuery.isLoading || updateGameQuery.isLoading} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" />
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
  ) : <ComponentLoader tw="min-w-[559px]" />
}
export default JoinGameDiceCard;

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

