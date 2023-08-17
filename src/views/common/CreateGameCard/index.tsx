import { CreateGameCardContainer } from "./types";
import { AllPossibleCurrencyTypes, AllPossibleWagerTypes } from "../../../models";
import { BadgeIcon, renderWagerBadge } from "../JoinableGameBar";
import 'twin.macro';

export interface CreateGameCardInterface {
  wagerType: AllPossibleWagerTypes;
  currencyType: AllPossibleCurrencyTypes;
}

const CreateGameCard = ({ wagerType, currencyType, ...rest }: CreateGameCardInterface & React.Attributes & React.AllHTMLAttributes<HTMLDivElement> ) => {
  // get user usdt balance;

  return (
    <CreateGameCardContainer {...rest} tw="dark:bg-[#282828] rounded-[10px]">
      <div tw="flex min-w-[fit-content] justify-center items-center gap-[10px]">
        {/* icon */}
        <BadgeIcon>{renderWagerBadge(wagerType, currencyType)}</BadgeIcon>
        <span>{currencyType}</span>
        {/* symbol */}
      </div>
      <div>
        {/* wager */}
        {/* wager in usd */}
        {/* balance of users currency type */}
      </div>
      <div>
        {/* button approve */}
        {/* button start game */}
      </div>
      {/* show game details with dropdown button arrow thingy*/}
    </CreateGameCardContainer>
  )
}
export default CreateGameCard;
