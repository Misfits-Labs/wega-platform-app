import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

export function hideForm(detailsBlock: any) {
  const duration = 0.65;
  const ease = "elastic.out(1.6, 0.4)";
  gsap.to([".details-1", ".details-2"], {
    opacity: 0,
    visibility: "hidden",
    duration,
    ease: "expo.inOut"
  })
  gsap.to(detailsBlock.current, {
   height: 0,
   ease,
   duration, 
  });
}

export function showForm(detailsBlock: any) {
  const duration = 1;
  const ease = "elastic.out(1.2, 0.4)";
  
  gsap.to(detailsBlock.current, {
   height: 115,
   ease,
   duration, 
  });
  gsap.to([".details-1", ".details-2"], {
    opacity: 1,
    visibility: "unset",
    duration,
    ease: "expo.inOut"
  })
}

export function useFormReveal(isFormCurrentlyRevealed: boolean, formRef: any, detailsBlock: any ){
  const [triggered, setStriggered] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(!isFormCurrentlyRevealed);
  const triggerRevealAnimation = () => setStriggered(s => !s);
  useLayoutEffect(()=> {
    const ctx = gsap.context(() => {
      if(revealed) {
        hideForm(detailsBlock);
        setRevealed(false);
      };
      if(!revealed) {
        showForm(detailsBlock);
        setRevealed(true);
      };
    }, formRef);
    return () => ctx.revert();
  }, [triggered]);
  return {
    triggerRevealAnimation,
    revealed,
  }
}

