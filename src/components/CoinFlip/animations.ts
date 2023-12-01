import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

// eslint-disable-next-line no-unused-vars
type Callback = (...args: any[]) => void | null;

export function useRoll(coinRef: any, gameOver: boolean) {
  const [trigger, setStrigger] = useState<boolean>(false);
  const [rolled, setRolled] = useState<boolean>(false);
  const [animationTarget, setAnimationTarget] = useState<string | undefined>(undefined);
  
  function roll(to: string) {
    const callb: Callback = () => {
      gsap.set("g#all-sides", { y: "0" })
      gsap.fromTo("g#all-sides", {
        ease: "power4.inOut",
        duration: 0.5,
        y: "0",
      }, {y: to})
    }
    const tl = gsap.timeline({ repeatDelay: 0, onComplete: callb })
    tl.to("g#all-sides", {
      repeat: 5,
      ease: "none",
      y: "300",
    })
  }
  const triggerRoll = (rollDestination: number) => {
   setAnimationTarget(String(rollDestination * 100));
   setStrigger(s => !s);
  };

  useLayoutEffect(()=> {
   const ctx = gsap.context(() => {
    if(animationTarget) {
       roll(animationTarget);
     }
     if(gameOver) {
      setTimeout(() =>  setRolled(true), 4000);
     }
    }, coinRef);
    return () => ctx.revert();
  }, [trigger, gameOver]);
  return {
    triggerRoll,
    rolled,
  }
}

