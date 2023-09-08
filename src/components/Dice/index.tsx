import { DiceContainer, DiceWrapper, DiceSides } from './types';
import { LargeText } from '../../common/CreateGameCard/types';
import DiceOneComponent from './images/DiceOne';
import DiceTwoComponent from './images/DiceTwo';
import DiceThreeComponent from './images/DiceThree';
import DiceFourComponent from './images/DiceFour';
import DiceFiveComponent from './images/DiceFive';
import DiceSixComponent from './images/DiceSix';
import "twin.macro"; 

export const Dice: React.FC<{
  gameResults: (number)[][], 
  currentRound: number, 
  rollerIndex: number,
  currentTurn: number }> = ({ gameResults, currentRound, rollerIndex, currentTurn }: { gameResults: (number)[][], currentRound: number, rollerIndex: number, currentTurn: number }) => {
  const renderDice = () => {
    let Component;
    if(currentTurn === 0) {
      Component = DICE_SIDES[currentTurn];
    } else {
      Component = DICE_SIDES[gameResults[rollerIndex === 0 ? 1 : 0][currentRound]];
    }
    return <Component />
  }

  return (
    <DiceContainer>
      <DiceWrapper tw="flex justify-center items-center">
        {renderDice()}     
      </DiceWrapper>
    </DiceContainer>
  )
}

const DiceQuestionMark = () => <LargeText tw="text-pretu">?</LargeText> 

const DICE_SIDES: any = {
  [DiceSides.MINUS_ONE]: DiceQuestionMark, 
  [DiceSides.ONE]: DiceOneComponent, 
  [DiceSides.TWO]: DiceTwoComponent, 
  [DiceSides.THREE]: DiceThreeComponent, 
  [DiceSides.FOUR]: DiceFourComponent, 
  [DiceSides.FIVE]: DiceFiveComponent, 
  [DiceSides.SIX]: DiceSixComponent, 
}