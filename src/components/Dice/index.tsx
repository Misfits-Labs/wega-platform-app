import { DiceContainer, DiceWrapper, DiceSides } from './types';
import { LargeText } from '../CreateGameCard/types';
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
  currentTurn: number,
  isGamePlayable: boolean }> = ({ gameResults, currentRound, rollerIndex, isGamePlayable, currentTurn }: { 
    gameResults: (number)[][], currentRound: number, rollerIndex: number, currentTurn: number, isGamePlayable: boolean }) => {
    const renderDice = () => {
      let Component;
      if(!isGamePlayable && gameResults[0].length === 0) {
        Component = DICE_SIDES[DiceSides.MINUS_ONE];
      } else {
        if(currentTurn == 0) {
          Component = DICE_SIDES[0];
        } else {
          Component = DICE_SIDES[gameResults[rollerIndex === 0 ? 1 : 0][currentRound]];
        }
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

const DiceQuestionMark = () => <LargeText tw="text-blanc">?</LargeText> 

const DICE_SIDES: any = {
  [DiceSides.MINUS_ONE]: DiceQuestionMark, 
  [DiceSides.ONE]: DiceOneComponent, 
  [DiceSides.TWO]: DiceTwoComponent, 
  [DiceSides.THREE]: DiceThreeComponent, 
  [DiceSides.FOUR]: DiceFourComponent, 
  [DiceSides.FIVE]: DiceFiveComponent, 
  [DiceSides.SIX]: DiceSixComponent, 
}