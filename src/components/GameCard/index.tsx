import { useRef, useEffect, useState } from 'react';
import {
 GameCardContainer,
 GameCardHeader,
 GameCardBody,
 GameCardTitle,
 GameCardDescription,
} from './types';
import  { 
 DiceIcon, 
 CoinFlipIcon, 
 RaffleIcon, 
} from '../../assets/icons';
import  { GameCardOrb } from '../../assets/images';
import Button from '../../common/Button';
import { gsap } from 'gsap'; 
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { useWegaStore } from '../../hooks';
import { Link } from "react-router-dom";
import { WegaTypes, WegaTypesEnum } from '../../models';

export const DiceGameCard = () => {
  const iconRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<SVGSVGElement>(null);
  const [hovering, setHovering] = useState<boolean>();
  const { openConnectModal } = useConnectModal();
  const { wallet } = useWegaStore();
  
  useEffect(() => {    
    const ctx = gsap.context(() => {
      const duration = 0.65;
      const ease = "elastic.out(1.6, 0.4)";
      const orbAnimation = gsap.to(orbRef.current, { 
        scaleX: 1.115, 
        scaleY: 1.115, 
        y: '-=12.5px',
        ease,
        duration, 
 
      });
      const diceAnimation = gsap.to(iconRef.current, {
        rotate: '360deg',
        ease,
        duration 
      })
      if(hovering){
        orbAnimation.play();
        diceAnimation.play();
      } else {
        orbAnimation.reverse(.2);
        diceAnimation.reverse(.2)
      }
    });
    return () => {
      ctx.revert();
    }
  }, [hovering])
    

  return (
    <GameCardContainer onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} >
      <GameCardHeader className="flex justify-center items-center">
      <DiceIcon ref={iconRef} width="120px" height="90.7px" />
      <GameCardOrb
        ref={orbRef}
        width='269px'
        height='269px'
        filter="blur(15px)"
        fill= "#C836E0"
        className="card-orb absolute inset-0 z-40 translate-y-[-1.125rem]" 
      />
      </GameCardHeader>
      <GameCardBody className="position-inherit">
      <GameCardTitle>Dice</GameCardTitle>
      <GameCardDescription>
        Roll the dice, the player with the highest number wins.
      </GameCardDescription>
      {
        (!wallet && openConnectModal) ?
        <Button buttonType="primary" content='Play' className="w-[75%]" onClick={()=> openConnectModal() } />
        : <Link to="/dice/create" className="w-[75%]" state={ { gameType: WegaTypes[WegaTypesEnum.DICE] }}><Button buttonType="primary" content='Play' className="w-[100%]"/></Link>
      }
      </GameCardBody>
    </GameCardContainer>
  )
}

export const CoinFlipGameCard = () => {
  const iconRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<SVGSVGElement>(null);
  const [hovering, setHovering] = useState<boolean>();
  const { openConnectModal } = useConnectModal();
  const { wallet } = useWegaStore();
  
  useEffect(() => {    
    const ctx = gsap.context(() => {
      const duration = 0.65;
      const ease = "elastic.out(1.6, 0.4)";
      const orbAnimation = gsap.to(orbRef.current, { 
        scaleX: 1.115, 
        scaleY: 1.115, 
        y: '-=12.5px',
        ease,
        duration, 
      });
      const iconAnimation = gsap.to(iconRef.current, {
        y: '-=15px',
        ease,
        duration 
      })

      if(hovering){
        orbAnimation.play();
        iconAnimation.play();
      } else {
        orbAnimation.reverse(.2);
        iconAnimation.reverse(0.2)
      }
    });
    return () => {
      ctx.revert();
    }
  }, [hovering])

  return (
   <GameCardContainer onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} >
    <GameCardHeader className="flex justify-center items-center relative">
     <CoinFlipIcon width="83.002px" height="110.513px" ref={iconRef} className="translate-y-[1rem]"/>
     <GameCardOrb 
      ref={orbRef}
      width='269px'
      height='269px'
      filter="blur(15px)"
      className="card-orb fill-oranjo absolute inset-0 z-40 translate-y-[-1.125rem]" 
     />
    </GameCardHeader>
    <GameCardBody>
     <GameCardTitle>Coin Flip</GameCardTitle>
     <GameCardDescription>
      Flip the coin, the player that receives their side wins.
     </GameCardDescription>

     {
      (!wallet && openConnectModal) ?
        <Button buttonType="primary" content='Play' className="w-[75%]" onClick={()=> openConnectModal() } /> :
        <Link to="/coinflip/create" className="w-[75%]" state={ { gameType: WegaTypes[WegaTypesEnum.COINFLIP] } } ><Button buttonType="primary" content='Play' className="w-[100%]" /></Link>
     }
    </GameCardBody>
   </GameCardContainer>
  )
 }
 
 export const RaffleGameCard = () => {
  const iconRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<SVGSVGElement>(null);
  const [hovering, setHovering] = useState<boolean>();

  useEffect(() => {    
    const ctx = gsap.context(() => {
      const duration = 0.65;
      const ease = "elastic.out(1.6, 0.4)";
      const orbAnimation = gsap.to(orbRef.current, { 
        scaleX: 1.115, 
        scaleY: 1.115, 
        y: '-=12.5px',
        ease,
        duration, 
      });
      const iconAnimation = gsap.to(iconRef.current, {
        y: '-=15px',
        rotate: "-=25deg",
        ease,
        duration 
      })

      if(hovering){
        orbAnimation.play();
        iconAnimation.play();
      } else {
        orbAnimation.reverse(.2);
        iconAnimation.reverse(0.2)
      }
    });
    return () => {
      ctx.revert();
    }
  }, [hovering]);

  return (
   <GameCardContainer onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
    <GameCardHeader className="flex justify-center items-center relative">
     <RaffleIcon width="120px" height="143px" ref={iconRef} className="rotate-[25deg] translate-y-[1.125rem]" />
     <GameCardOrb
      ref={orbRef}
      width='269px'
      height='269px'
      filter="blur(15px)"
      fill="#B80D57"
      className="card-orb absolute inset-0 z-40 translate-y-[-1.125rem]"  
     />
    </GameCardHeader>
    <GameCardBody>
     <GameCardTitle>NFT Raffle</GameCardTitle>
     <GameCardDescription>
      Free Entry and infinite NFTs to win!
     </GameCardDescription>
     <Button 
      buttonType="primary" 
      disabled={true}
      content='Coming soon' 
      className="w-[75%] dark:bg-gradient-to-r from-oranjo-blanc to-oranjo"/>
    </GameCardBody>
   </GameCardContainer>
  )
}

