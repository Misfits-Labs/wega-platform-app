import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

// eslint-disable-next-line no-unused-vars
type Callback = (...args: any[]) => void | null;

export function useRoll(diceRef: any, onBegin?: Callback, onEnd?: Callback) {
  const [trigger, setStrigger] = useState<boolean>(false);
  const [rolled, setRolled] = useState<boolean>(false);
  const [animationTarget, setAnimationTarget] = useState<string | undefined>(undefined);

  
  function roll(to: string) {
    if(onBegin) onBegin();
    const callb = () => {
     gsap.fromTo("g#all-sides", {
      duration: 0.5,
      ease: "power4.inOut",
      y: "0",
     }, {y: to})
     if(onEnd) onEnd();
    }
    gsap.set("g#all-sides", {y: "0"})
   const tl = gsap.timeline({ onComplete: callb })
    tl.to("g#all-sides", {
      repeat: 4,
      ease: "none",
      y: "600",
    })
  }

  const triggerRoll = (rollDestination: number, isGameOver: boolean) => {
   setAnimationTarget(String(rollDestination * 100));
   setStrigger(s => !s); 
   if(isGameOver) {
    setTimeout(() => setRolled(true), 3000);
   }
  };

  useLayoutEffect(()=> {
   const ctx = gsap.context(() => {
    if(animationTarget) {
       roll(animationTarget);
     }
    }, diceRef);
    return () => ctx.revert();
  }, [trigger, animationTarget]);
  return {
    triggerRoll,
    rolled,
    trigger
  }
}

