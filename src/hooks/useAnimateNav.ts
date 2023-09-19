import { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { useScrollDirection } from 'react-use-scroll-direction';

export function useAnimateNav() {
 const { isScrollingUp, isScrollingDown, isScrolling } = useScrollDirection();
 const [navEl, setNavEl] = useState<any>(null)
 const [bodyEl, setBodyEl] = useState<any>(null)
 const [hideNav, setHideNav] = useState<boolean>()

 const windowScroll = useWindowScroll()

 useEffect(() => {
  if (!navEl) {
   setNavEl(document.querySelector("nav"))
  }
  if (!bodyEl) {
   setBodyEl(document.querySelector("body"))
  }
 }, [setNavEl, setBodyEl, navEl, bodyEl])

 useEffect(() => {
  if (isScrollingDown) {
   setHideNav(true)
  } else if (isScrollingUp || !isScrolling) {
   setHideNav(false)
  }
 }, [windowScroll])

 useEffect(() => {
  if (!hideNav) {
   navEl?.classList.add("nav-show")
   navEl?.classList.remove("nav-hide")
  } else {
   navEl?.classList.add("nav-hide")
   navEl?.classList.remove("nav-show")
  }
 }, [hideNav])

 return hideNav
}
