import React from 'react';
import winnerOne from './images/dice-1-winner.png'
import winnerTwo from './images/dice-2-winner.png'
import winnerThree from './images/dice-3-winner.png'
import winnerFour from './images/dice-4-winner.png'
import winnerFive from './images/dice-5-winner.png'
import winnerSix from './images/dice-6-winner.png'

import loserOne from './images/dice-1-loser.png'
import loserTwo from './images/dice-2-loser.png'
import loserThree from './images/dice-3-loser.png'
import loserFour from './images/dice-4-loser.png'
import loserFive from './images/dice-5-loser.png'
import loserSix from './images/dice-6-loser.png'
import coinLoserHeads from './images/coinflip-heads-loser.png'
import coinLoserTails from './images/coinflip-tails-loser.png'
import coinWinnerHeads from './images/coinflip-heads-winner.png'
import coinWinnerTails from './images/coinflip-tails-winner.png'

interface DiceModalLogoProps extends React.AllHTMLAttributes<HTMLImageElement> {
 side: number; 
}
interface CoinflipModalLogoProps extends DiceModalLogoProps {}   
export const DiceWinnerLogo: React.FC<DiceModalLogoProps> = ({ side, ...rest }: DiceModalLogoProps) => { 
 const diceImages = new Map([
  [1, winnerOne],
  [2, winnerTwo],
  [3, winnerThree],
  [4, winnerFour],
  [5, winnerFive],
  [6, winnerSix],
 ]);
 return (<img src={diceImages.get(side)} alt="winner" { ...rest} />)
}


export const DiceLoserLogo: React.FC<DiceModalLogoProps> = ({ side, ...rest }: DiceModalLogoProps) => {
 const diceImages = new Map([
  [1, loserOne],
  [2, loserTwo],
  [3, loserThree],
  [4, loserFour],
  [5, loserFive],
  [6, loserSix],
 ]);
 return (<img src={diceImages.get(side)} alt="loser" {...rest} />)
}
export const CoinflipWinnerLogo: React.FC<CoinflipModalLogoProps> = ({ side, ...rest }: CoinflipModalLogoProps) => { 
 const coinImages = new Map([
  [1, coinWinnerHeads],
  [2, coinWinnerTails],
 ]);
 return (<img src={coinImages.get(side)} alt="winner" { ...rest} />)
}


export const CoinflipLoserLogo: React.FC<CoinflipModalLogoProps> = ({ side, ...rest }: CoinflipModalLogoProps) => {
 const coinImages = new Map([
  [1, coinLoserHeads],
  [2, coinLoserTails],
 ]);
 return (<img src={coinImages.get(side)} alt="loser" {...rest} />)
}