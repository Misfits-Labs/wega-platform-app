import { DiceContainer, DiceWrapper } from './types';
import { LargeText } from '../../common/CreateGameCard/types'
import "twin.macro"; 

export const Dice = () => {
  return (
    <DiceContainer>
      <DiceWrapper tw="flex justify-center items-center">
        <LargeText tw="text-pretu">?</LargeText>
      </DiceWrapper>
    </DiceContainer>
  )
}
