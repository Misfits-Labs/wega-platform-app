import Joi from 'joi';
import { CreateGameCardContainer, InputBox, NormalText, SmallText, MediumText } from "./types";
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes } from "../../../models";
import { BadgeIcon, renderWagerBadge } from "../JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownIcon, StarLoaderIcon } from '../../../assets/icons';
import 'twin.macro';
import { useForm } from 'react-hook-form';
import { useWegaStore } from '../../../hooks'
import Button from '../Button';


export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
}

const CreateGameCard = ({ wagerType, currencyType, ...rest }: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  // get user usdt balance;
  // const [wager, setWager] = useGetSet<number>(0);
  const { register, setValue, formState: { errors }} = useForm({ 
    mode: 'onChange', 
    resolver: joiResolver(createGameSchema('wager')) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: 1
    }
  });
  const { account } = useWegaStore();
  
  const handleWagerOptionClicked = (wagerAmount: number) => {
    setValue("wager", wagerAmount);
  }

  return (
    <div tw="w-full flex flex-row justify-center">
      <CreateGameCardContainer {...rest} tw="dark:bg-[#282828] rounded-[10px]">
        <div tw="flex w-[fit-content] justify-center items-center gap-[10px]">
          {/* icon */}
          <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
          <span>{currencyType}</span>
        </div>
        <form >
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
            <SmallText>Balance: {account.displayBalance} </SmallText>
            {/* balance here should be token balance */}
          </div>
          {/* wager in usd */}
          {/* balance of users currency type */}
        </form>
        <div tw="flex gap-x-[16px]">
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={() => handleWagerOptionClicked(1)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>1</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={() => handleWagerOptionClicked(5)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>5</span>
          </button>
          <button 
            tw="dark:bg-[#4B4B4B] rounded-[20px] flex w-[fit-content] justify-center items-center gap-[10px] py-[5px] px-[10px] cursor-pointer dark:hover:outline-blanc hover:outline hover:outline-2 hover:outline-offset-1"
            onClick={() => handleWagerOptionClicked(10)}
          >
            {/* {wager selecetion options} */}
            <BadgeIcon><>{renderWagerBadge(wagerType, currencyType)}</></BadgeIcon>
            <span>10</span>
          </button>
        </div>
        {/* <Button buttonType="primary"><>Approve</></Button> */}
        <Button buttonType="primary" tw="flex">
          <>
            Start Game
            <StarLoaderIcon color="#000000" className="h-[16px] w-[16px] ms-[5px]" />
          </>
        </Button>
        {/* button approve */}
        {/* button start game */}
        {/* game details */}

        <div tw="flex items-center gap-x-[8px]">
          <MediumText tw="dark:text-blanc">Show game details</MediumText>
          <ArrowDownIcon className="cursor-pointer"/>
        </div>
      </CreateGameCardContainer>
    </div>
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

