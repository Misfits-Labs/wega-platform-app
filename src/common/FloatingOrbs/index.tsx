/* eslint-disable @typescript-eslint/no-unused-vars */
import { FloatingOrbContainer, FloatingOrbBlurContainer } from './types';
import "twin.macro"

// interface FloatingOrbsProps {} 

export const FloatingOrbs = () => (
   <FloatingOrbContainer>
   <FloatingOrbBlurContainer></FloatingOrbBlurContainer>
    <div tw="
     dark:bg-oranjo 
     pointer-events-none 
     absolute w-[350px] h-[350px] rounded-[100%] 
     translate-x-[15%] translate-y-[5%]"></div>
    <div 
     tw="
     dark:bg-[#C836E0] 
     pointer-events-none 
     absolute w-[350px] h-[350px] 
     rounded-[100%]
     translate-x-[100%] translate-y-[5%]"
     ></div>
    <div tw="
     dark:bg-[#B80D57] 
     pointer-events-none 
     absolute 
     w-[350px] 
     h-[350px] 
     rounded-[100%]
     translate-x-[50%] translate-y-[15%]
     "></div>
   </FloatingOrbContainer>
  )

