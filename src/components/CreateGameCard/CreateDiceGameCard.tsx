import { useEffect, useRef, useState } from 'react';
import { parseEther } from 'ethers';
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
} from "./types";
import { 
  GameTypeBadgeWrapper,
 } from '../../common/JoinableGameBar/types';
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
} from "../../common/JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownIcon, StarLoaderIcon } from '../../assets/icons';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { useBalance } from 'wagmi';
import { useNavigateTo, useWegaStore, useCreateGameParams, useTokenUSDValue, useDrand} from '../../hooks';
import { useCreateGameMutation } from './apiSlice';
import { 
  useCreateWagerAndDepositMutation,
  useAllowanceQuery,
  useApproveERC20Mutation,
} from './blockchainApiSlice';
import toast from 'react-hot-toast';
import { 
  toastSettings, 
  toBigIntInWei, 
  escrowConfig, 
  parseTopicDataFromEventLog,
  convertBytesToNumber 
} from '../../utils';
import Button from '../../common/Button';
import { ToggleWagerBadge } from '../../common/ToggleWagerBadge';
import { useFormReveal } from './animations';
import { ComponentLoader } from '../../common/loaders'



export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
  gameType: AllPossibleWegaTypes;
}

export const CreateDiceGameCard = ({ 
  wagerType, 
  currencyType,
  gameType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css, 
  ...rest 
}: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  const { openConnectModal } = useConnectModal();
  const { wallet, user, network } = useWegaStore();
  const randomness = useDrand();
  const formRef = useRef<HTMLFormElement>(null);
  const detailsBlock = useRef<HTMLDivElement>(null)
  const [currentWagerType] = useState<AllPossibleWagerTypes>(wagerType);
  const [currentCurrencyType, setCurrentCurrencyType] = useState<AllPossibleCurrencyTypes>(currencyType);
  const {tokenAddress, playerAddress, playerUuid } = useCreateGameParams({ wallet, user, network, currencyType: currentCurrencyType});
  const {revealed, triggerRevealAnimation} = useFormReveal(false, formRef, detailsBlock);
  const { register, formState: { errors }, watch, handleSubmit, setValue } = useForm({ 
    mode: 'onChange', 
    resolver: joiResolver(createGameSchema('wager')) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: 1
    }
  });
  const wagerUSDValue = useTokenUSDValue(currentCurrencyType, watch('wager')); 
  
  // approval for allowance
  const isWagerApproved = (allowance: number, wagerAmount: number) => allowance >= toBigIntInWei(wagerAmount);
  const allowanceQuery = useAllowanceQuery({ 
    spender: escrowConfig.address[network?.id as keyof typeof escrowConfig.address], 
    owner: playerAddress,
    tokenAddress,
  });
  
  // get token balance of user
  const { data: userWagerBalance, isLoading: isWagerbalanceLoading } = useBalance({ 
    address: wallet?.address as HexishString,
    token: tokenAddress
  })
    
  // create game 
  const [approveERC20, approveERC20Query] = useApproveERC20Mutation();
  const [createWagerAndDeposit, createWagerAndDepositQuery] = useCreateWagerAndDepositMutation();
  
  const [ createGame, {
    isLoading: isCreateGameLoading, 
    status: createGameStatus, 
    data: createGameResponse 
  }] = useCreateGameMutation();
  
  const handleCreateGameClick = async ({ wager }: { wager: number }) => {
    try {
      if(!isWagerApproved(allowanceQuery.data, wager)) {
        await approveERC20({ spender: escrowConfig.address[network?.id as keyof typeof escrowConfig.address], wagerAsBigint: toBigIntInWei(wager), tokenAddress }).unwrap();
      }
      const receipt = await createWagerAndDeposit({ 
        tokenAddress, 
        wagerAsBigint: toBigIntInWei(wager), 
        gameType,
        randomness: [convertBytesToNumber(randomness.randomness)] 
      }).unwrap();

      const parsedTopicData = parseTopicDataFromEventLog(receipt.logs[2], ['event GameCreation(bytes32 indexed escrowHash, uint256 indexed nonce, address creator, string name)']);
      await createGame({ 
        gameType, 
        players: [ { uuid: playerUuid } ],
        creatorUuid: playerUuid,
        networkId: network?.id as number,
        transactionHash: receipt.transactionHash as HexishString,
        wager: { 
          wagerType: currentWagerType.toUpperCase() as AllPossibleWagerTypes, 
          wagerHash: parsedTopicData?.escrowHash, 
          tokenAddress,
          wagerAmount: parseEther(String(wager)).toString(), 
          wagerCurrency: currentCurrencyType,
          nonce: Number(parsedTopicData?.nonce),
        }
      }).unwrap();
      toast.success('Create game success', { ...toastSettings('success', 'top-center') as any });
    } catch (e: any){
      console.log(e);
      const message = e?.message ?? 'Create game error'
      toast.error(message, { ...toastSettings('error', 'bottom-center') as any });
    }
  }
  
  const handleWagerOptionClicked = (e: any, wagerAmount: number) => {
    e.preventDefault();
    setValue("wager", wagerAmount);
  }
  
  const navigateToGameUi = useNavigateTo()
  useEffect(() => {
    if(playerAddress && tokenAddress){
      allowanceQuery.refetch();
      if(createGameStatus === 'fulfilled' && createGameResponse) {
        navigateToGameUi(`/${gameType.toLowerCase()}/play/${createGameResponse.uuid}`, 1500, { replace: true, 
          state: { gameId: createGameResponse.id, gameUuid: createGameResponse.uuid } 
        });
      }
    }
  }, [
    watch('wager'),
    tokenAddress, 
    createGameStatus, 
    createGameResponse
  ]);
  return randomness ? (
    <form 
      tw="w-full flex flex-row justify-center" 
      onSubmit={handleSubmit(handleCreateGameClick)} 
      ref={formRef}
    >
      <CreateGameCardContainer {...rest}>
        {/* badge selection */}
        <ToggleWagerBadge currentCurrencyType={currentCurrencyType} setCurrentCurrencyType={setCurrentCurrencyType} />

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
            {/* should receive wager amount as input */}
            <NormalText tw="dark:text-shinishi">{wagerUSDValue.loading ? 'loading...' : wagerUSDValue.value} USD</NormalText> 
            <SmallText> Balance: {
              isWagerbalanceLoading ? "Retrieving balance..." : userWagerBalance ? userWagerBalance?.formatted  : String(0) 
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
        {
          (!(tokenAddress && playerAddress && playerUuid) && openConnectModal) ? <Button buttonType="primary" tw="flex" onClick={
            (e: any) => { 
              e.preventDefault();
              openConnectModal();
            }}>
            {"Start Game"}
            <StarLoaderIcon loading={false} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" />
          </Button> :
          <Button type="submit" buttonType="primary" tw="flex">
            {(
              approveERC20Query.isLoading || 
              createWagerAndDepositQuery.isLoading || 
              isCreateGameLoading
            ) ? "Loading..." : "Start game" }
            <StarLoaderIcon loading={approveERC20Query.isLoading || createWagerAndDepositQuery.isLoading || isCreateGameLoading} color="#151515" tw="h-[16px] w-[16px] ms-[5px]" />
          </Button> 
        }
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
  ) : <ComponentLoader tw="min-w-[559px]" />
}

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

