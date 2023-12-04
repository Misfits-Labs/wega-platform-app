import { useLayoutEffect, useRef } from 'react';
import { FloatingOrbContainer, FloatingOrbBlurContainer, FloatingOrbBlurContainerWithoutBackdrop, Orb } from './types';
import { gsap, Sine } from 'gsap';
import "twin.macro"

interface ReactProps extends React.AllHTMLAttributes<HTMLDivElement>, React.Attributes {}
interface FloatingOrbProps extends ReactProps {
  // eslint-disable-next-line no-unused-vars
  customFloatingOrbs?: React.ReactNode & ReactProps | null,
  animationTl?: gsap.core.Timeline;  
}
export const FloatingOrbs: React.FC<FloatingOrbProps> = ({ animationTl, customFloatingOrbs, children, ...props}: FloatingOrbProps) => {
  const orbContainerRef = useRef<any>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if(!animationTl){
        const tl = gsap.timeline();
        const orbs = orbContainerRef.current.querySelectorAll('.orb');
        const duration = 5;
        tl.repeatDelay(0.25);
        tl.fromTo(orbs[0], { scale: 1.1, rotate: '0deg', x: "-=5rem", y: "+=3rem" }, { scale: 1.05 , rotate: '180deg', x: "+=3rem", y: "-=5rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, 'start')
        tl.fromTo(orbs[1], { scale: 1.05, rotate: '0deg', x: "-=3rem", y: "+=3rem" }, { scale: 1.1 , rotate: '180deg', x: "+=3rem", y: "-=3rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, '<')
        tl.fromTo(orbs[2], { scale: 1.2, rotate: '0deg', x: "-=3rem", y: "+=3rem" }, { scale: 1 , rotate: '180deg', x: "+=3rem", y: "-=6rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, '<')
        tl.yoyo(true);
      } else {
        animationTl.play();
      }
    }, orbContainerRef.current);
    return () => context.revert(); 
  });
  return !children ? (
   <FloatingOrbContainer tw="overflow-clip" {...props}>
    <FloatingOrbBlurContainerWithoutBackdrop></FloatingOrbBlurContainerWithoutBackdrop>
    { !customFloatingOrbs ? (
      <div tw="relative flex justify-center items-center w-full sm:w-[100vw] sm:h-[100vh]" ref={orbContainerRef}>       
        <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-[#C836E0] translate-x-[5rem] translate-y-[5rem] z-[-28]"/>
        <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-[#B80D57] translate-x-[-15rem] translate-y-[5rem] z-[-27]"/>
        <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-oranjo translate-x-[15rem] translate-y-[-2.5rem] z-[-25] z-[-26]"/>
      </div> 
     ) : <div tw="absolute flex justify-center items-center w-full h-full overflow-clip rounded-[inherit]" ref={orbContainerRef}> { customFloatingOrbs } </div>     
    }   
  </FloatingOrbContainer> 
  ) : <FloatingOrbContainer tw="relative w-full h-full" {...props}>
      <FloatingOrbBlurContainer tw="rounded-[inherit]"></FloatingOrbBlurContainer>
      {
        !customFloatingOrbs ? (
          <div tw="absolute flex justify-center items-center w-full h-full overflow-clip rounded-[inherit]" ref={orbContainerRef}>
            <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-[#C836E0] translate-x-[5rem] translate-y-[5rem] z-[-28]"/>
            <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-[#B80D57] translate-x-[-15rem] translate-y-[5rem] z-[-27]"/>
            <Orb className="orb" tw="w-[350px] h-[350px] rounded-[100%] dark:bg-oranjo translate-x-[15rem] translate-y-[-2.5rem] z-[-25] z-[-26]"/>
          </div>
        ) : ( 
            <div tw="absolute flex justify-center items-center w-full h-full overflow-clip rounded-[inherit]" ref={orbContainerRef}>
              { customFloatingOrbs }
            </div>
          )
      }
      {children}
    </FloatingOrbContainer>
   }

export const CustomOrbs = (props: ReactProps): React.ReactNode | null => <>{props.children}</>
