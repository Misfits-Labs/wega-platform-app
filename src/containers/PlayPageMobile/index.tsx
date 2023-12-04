import Section from "../../common/Section"
import { FloatingOrbs, CustomOrbs } from '../../common/FloatingOrbs';
import { Orb } from '../../common/FloatingOrbs/types';
import { LogoDarkWo } from '../../assets/images';
import internetIcon from './images/internet-icon.png';
import { Link } from "react-router-dom";
import { 
  SectionHeaderContainer, 
  SectionHeaderTitle, 
} from "../../common/Section/types"
import { LargeText, ExtraLargeText } from '../../components/CreateGameCard/types'
import heroIllustration from './images/mobile-hero-illustration.png';
import { Brand, BrandContainer } from '../Navigation/types';

import { gsap, Sine } from 'gsap';
import 'twin.macro';
const LandingPageHeroSectionMobile = () => {
  const animationTl = gsap.timeline({ paused: true }),
        orbs = document.querySelectorAll('.orb'),
        duration = 5;
  // animation
  animationTl.repeatDelay(0.25);
  animationTl.fromTo(orbs[0], { scale: 1.1, rotate: '0deg', x: "-=0.5rem", y: "+=1rem" }, { scale: 1.05 , rotate: '360deg', x: "+=0.5rem", y: "-=1rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, 'start')
  animationTl.fromTo(orbs[1], { scale: 1.05, rotate: '0deg', x: "-=0.5rem", y: "-=1rem" }, { scale: 1.1 , rotate: '360deg', x: "-=0.5rem", y: "+=1rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, '<')
  animationTl.fromTo(orbs[2], { scale: 1.2, rotate: '0deg', x: "-=1rem", y: "+=1rem" }, { scale: 1 , rotate: '360deg', x: "+=1rem", y: "-=1rem", repeat: -1, yoyo: true,  duration, ease: Sine.easeInOut }, '<')
  animationTl.yoyo(true);

  return (
    <>
      <FloatingOrbs 
        tw="translate-y-[-40%] flex justify-center items-center overflow-x-hidden" 
        customFloatingOrbs={<CustomOrbs>
          <Orb 
            className="orb" 
            blur={35} 
            tw="rounded-[100%] w-[150px] h-[150px] dark:bg-[#C836E0] z-[-26] translate-x-[14rem] translate-y-[4rem]" 
          />
          <Orb 
            className="orb" 
            blur={35} 
            tw="rounded-[100%] w-[150px] h-[150px] dark:bg-[#B80D57] z-[-26] translate-x-[15rem] translate-y-[4rem]" 
          />
          <Orb 
            className="orb" 
            blur={35} 
            tw="rounded-[100%] w-[150px] h-[150px] dark:bg-oranjo z-[-28] translate-x-[10rem] translate-y-[3rem]"  
          />
        </CustomOrbs>
        }
        animationTl={animationTl}/>
        <Section
        direction='col'
        tw="relative w-full"
        hdr={
          <SectionHeaderContainer tw="flex-col items-center gap-y-[32px] mb-[unset]">
            <img src={heroIllustration} alt="rocket-illustration" tw="mt-[3rem]"/>
            <SectionHeaderTitle tw="text-[51px] text-center font-primary leading-[68px] pb-[unset]"> Mobile version coming soon! </SectionHeaderTitle>
            <div tw="flex flex-col justify-center items-center gap-y-[24px]">
              <LargeText tw="font-primary font-normal text-center text-[21px] text-shinishi">Meanwhile,</LargeText>
              <div tw="flex items-center gap-x-[8px]">
                <LargeText tw="font-primary font-normal text-center text-[21px] text-shinishi">experience,</LargeText>
                <BrandContainer tw="items-center">
                  <LogoDarkWo tw="mr-2" width="15px" height="18px"/>
                  <Brand tw="text-[16px]">Wega</Brand>
                </BrandContainer>
                <LargeText tw="font-primary font-normal text-center text-[21px] text-shinishi">on desktop.</LargeText>
              </div>
              <Link to="https://wega.fun" tw="flex gap-x-[10px]">
                <img src={internetIcon}   alt="internet-icon" />
                <ExtraLargeText>wega.fun</ExtraLargeText>
              </Link>
            </div>
          </SectionHeaderContainer>
        }>
      </Section>
    </>
 )
}
export default LandingPageHeroSectionMobile;