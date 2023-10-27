import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

export function useRoll(coinRef: any) {
  const [trigger, setStrigger] = useState<boolean>(false);
  const [rolled, setRolled] = useState<boolean>(false);
  const [animationTarget, setAnimationTarget] = useState<string | undefined>(undefined);
  
  function roll(to: string) {
    const callb = () => {
     gsap.fromTo("g#all-sides", {
      ease: "power4.inOut",
      duration: 0.5,
      y: "0",
     }, {y: to})
    }
    gsap.set("g#all-sides", {y: "0"})
    const tl = gsap.timeline({ repeatDelay: 0, onComplete: callb })
    tl.to("g#all-sides", {
      repeat: 10,
      ease: "none",
      y: "300",
    })
  }
  const triggerRoll = (rollDestination: number, isGameOver: boolean) => {
   setAnimationTarget(String(rollDestination * 100));
   setStrigger(s => !s);
   if(isGameOver){
    setTimeout(() => setRolled(true), 4000);
   }
  };

  useLayoutEffect(()=> {
   const ctx = gsap.context(() => {
    if(animationTarget) {
       roll(animationTarget);
     }
    }, coinRef);
    return () => ctx.revert();
  }, [trigger]);
  return {
    triggerRoll,
    rolled
  }
}

