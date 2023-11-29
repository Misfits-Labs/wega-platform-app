import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

// eslint-disable-next-line no-unused-vars
type Callback = (...args: any[]) => void | null;

export function useRoll(coinRef: any) {
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
      setTimeout(() =>  setRolled(true), 2000);
    }
    const tl = gsap.timeline({ repeatDelay: 0, onComplete: callb })
    tl.to("g#all-sides", {
      repeat: 10,
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
    }, coinRef);
    return () => ctx.revert();
  }, [trigger]);
  return {
    triggerRoll,
    rolled
  }
}

