/* eslint-disable @typescript-eslint/no-unused-vars */
import { FloatingOrbContainer, FloatingOrbBlurContainer } from './types';
import "twin.macro"

// interface FloatingOrbsProps {} 

export const FloatingOrbs = () => (
   <FloatingOrbContainer>
    <FloatingOrbBlurContainer></FloatingOrbBlurContainer>
    <div tw="relative flex justify-center items-center w-full h-full">
      <div 
      tw="
      dark:bg-[#C836E0] 
      pointer-events-none 
      absolute w-[350px] h-[350px] 
      rounded-[100%]
      translate-x-[5rem] translate-y-[5rem] z-[-27]"
      ></div>
      <div tw="
      dark:bg-[#B80D57] 
      pointer-events-none 
      absolute 
      w-[350px] 
      h-[350px] 
      rounded-[100%]
      translate-x-[-15rem] translate-y-[5rem] z-[-26]
      "></div>
      <div tw="
      dark:bg-oranjo 
      pointer-events-none 
      absolute w-[350px] h-[350px] rounded-[100%] 
      translate-x-[15rem] translate-y-[-2.5rem] z-[-25]"></div>
    </div>
   </FloatingOrbContainer>
  )

