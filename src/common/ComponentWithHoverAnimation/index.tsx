import React, {useLayoutEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

// // Todo fix typing
export interface HoverableComponentProps {
 children: React.ReactElement;
 animationTl: any,
}

const ComponentWithHoverAnimation: React.FC<HoverableComponentProps> = (props: HoverableComponentProps) => {
 const scope = useRef<any>();
 // wrap element with hover
 const [hovering, setHovering] = useState<boolean | null>(null);
 
 useLayoutEffect(()=> {
  const ctx = gsap.context(() => {
   if(props.animationTl) {
    if(hovering) props.animationTl.play();
    if(!hovering) props.animationTl.reverse();
   }
  }, scope)
  return ctx.revert()
 },[hovering, props.animationTl])
 
 return <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} ref={scope} >{props.children}</div>
}

export default ComponentWithHoverAnimation;