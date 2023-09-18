import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

export function roll(to: string) {
  const callb = () => {
   gsap.to(document.querySelector("#coinflip g#all_sides"), {
    ease: "power4.inOut",
    duration: 0.5,
    y: to,
   })
  }
  const tl = gsap.timeline({ repeatDelay: 0, onComplete: callb })  
  tl.to(document.querySelector("#coinflip g#all_sides"), {
    repeat: 5,
    duration: 0.2,
    ease: "none",
    y: "200",
  })
}
export function useRoll(coinRef: any) {
  const [trigger, setStrigger] = useState<boolean>(false);
  const [rolled, setRolled] = useState<boolean>(false);
  const [animationTarget, setAnimationTarget] = useState<string | undefined>(undefined);
  
  const triggerRoll = (rollDestination: number) => {
   setAnimationTarget(String(rollDestination * 100));
   setStrigger(s => !s);
  };

  useLayoutEffect(()=> {
   const ctx = gsap.context(() => {
    if(animationTarget) {
       roll(animationTarget);
       setTimeout(() => setRolled(true), 2000);
     }
    }, coinRef);
    return () => ctx.revert();
  }, [trigger]);
  return {
    triggerRoll,
    rolled
  }
}

