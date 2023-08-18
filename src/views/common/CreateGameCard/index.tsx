import Joi from 'joi';
import { CreateGameCardContainer, InputBox, MediumText, SmallText } from "./types";
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes } from "../../../models";
import { BadgeIcon, renderWagerBadge } from "../JoinableGameBar";
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message'
import 'twin.macro';
import { useGetSet } from 'react-use';
import { useForm } from 'react-hook-form';
import { useWegaStore } from '../../../hooks'


export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
}

const CreateGameCard = ({ wagerType, currencyType, ...rest }: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  // get user usdt balance;
  const [wager, setWager] = useGetSet<number>(0);
  const { register, handleSubmit, formState: { errors }} = useForm({ 
    mode: 'onChange', 
    resolver: joiResolver(createGameSchema('wager')) , 
    reValidateMode: 'onChange',
    defaultValues: { 
      wager: "1"
    }
  });
  const { account } = useWegaStore();
  
  return (
    <div tw="w-full flex flex-row justify-center">
      <CreateGameCardContainer {...rest} tw="dark:bg-[#282828] rounded-[10px]">
        <div tw="flex min-w-[fit-content] justify-center items-center gap-[10px]">
          {/* icon */}
          <BadgeIcon>{renderWagerBadge(wagerType, currencyType)}</BadgeIcon>
          <span>{currencyType}</span>
        </div>
        <form>
          {/* wager */}
          <div tw="flex flex-col items-center gap-y-[16px]">
            <InputBox type="number" step="any" { ...register('wager', {
              setValueAs: (v: string) => parseInt(v), 
            }) }/>
            <ErrorMessage
              errors={errors}
              name="wager"
              render={({ message }) => <MediumText tw="text-[#E11D48]">{message}</MediumText> }
            />
            <MediumText tw="dark:text-shinishi">00,00 USD</MediumText>
            <SmallText>Balance: {account.displayBalance} </SmallText>
            {/* balance here should be token balance */}
          </div>
          {/* wager in usd */}
          {/* balance of users currency type */}
        </form>
        <div>
          {/* button approve */}
          {/* button start game */}
        </div>
        {/* show game details with dropdown button arrow thingy*/}
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

