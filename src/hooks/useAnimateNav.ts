import { useEffect, useState } from "react"
import { useWindowScroll } from "react-use"

export function useAnimateNav() {
 const [navEl, setNavEl] = useState<any>(null)
 const [bodyEl, setBodyEl] = useState<any>(null)
 const [currentScrollTop, setCurrentScrollTop] = useState<number>(0)
 const [hideNav, setHideNav] = useState<boolean>()
 const [a, setA] = useState<number>(0)
 const [b, setB] = useState<number>(0)
 const [c, setC] = useState<number>(0)

 const windowScroll = useWindowScroll()

 useEffect(() => {
  if (!navEl) {
   setNavEl(document.querySelector("nav"))
  }
  if (!bodyEl) {
   setBodyEl(document.querySelector("body"))
  }
 }, [navEl, bodyEl])

 useEffect(() => {
  setA(bodyEl?.parentNode.scrollTop)
  setB(navEl?.offsetHeight)
  setCurrentScrollTop(a)
  if (c < currentScrollTop && a > b + b) {
   setHideNav(true)
  } else if (c > currentScrollTop && !(a <= b)) {
   setHideNav(false)
  }
  setC(currentScrollTop)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [windowScroll])

 useEffect(() => {
  if (!hideNav) {
   navEl?.classList.add("nav-show")
   navEl?.classList.remove("nav-hide")
  } else {
   navEl?.classList.add("nav-hide")
   navEl?.classList.remove("nav-show")
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [hideNav])

 return hideNav
}
