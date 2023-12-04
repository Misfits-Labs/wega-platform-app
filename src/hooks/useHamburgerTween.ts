import { useLayoutEffect } from 'react';
import { gsap, Power4 } from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(MorphSVGPlugin);

export function useHamburgerTween(state: number, linksContainerRef: any) {

    function toggleShowNavlinksContainer() {
        const tl = gsap.timeline();
        if(state === 1) {
            // tl.to("#nav-mobile-overlay", { display: 'none', duration: 0.1}, 'hide')
            tl.to(linksContainerRef.current, { y: "-21rem", ease: Power4.easeOut, duration: 0.5 }, 'hide');
        } else {
            
            // tl.to("#nav-mobile-overlay", { display: 'block', duration: 0.1 }, 'show')
            tl.to(linksContainerRef.current, { y: "5rem", ease: Power4.easeOut, duration: 0.5 }, 'show');
        }
    }
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            toggleShowNavlinksContainer();
        }, linksContainerRef.current)
        return () => {
            ctx.revert();
        }
    }, [state]);

    return toggleShowNavlinksContainer;
}