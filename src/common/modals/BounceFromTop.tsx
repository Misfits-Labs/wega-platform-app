import React, { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import "twin.macro"

interface IBounceFromTop {
 children: React.ReactNode | React.ReactNode[]
}
const BounceFromTop: React.FC<IBounceFromTop> = ({ children }) => {
 const wrapperRef = useRef<any>(null)
 useLayoutEffect(() => {
  const context = gsap.context(() => {
   gsap.from(wrapperRef.current, { y: "100%", ease: "elastic.out(1.2, 0.4)" })
  }, wrapperRef)

  return () => context.revert();
 }, [])
 return (
  <div tw="w-[max-content] h-[max-content]" ref={wrapperRef}>
   {children}
  </div>
 )
}
export default BounceFromTop
