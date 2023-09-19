import { DiceContainer } from './types';
import WegaDice from './images/WegaDice'; 
import "twin.macro";

export const Dice: React.FC<{ diceRef: any }> = ({ diceRef }: { diceRef: any }) => {
  return (
    <DiceContainer>
      <WegaDice ref={diceRef} />
    </DiceContainer>
  )
}

