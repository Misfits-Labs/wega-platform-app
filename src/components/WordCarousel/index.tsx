import React, {useRef, useLayoutEffect} from 'react';
import { gsap, Power4 } from 'gsap';
import { 
 AnimationContainer,
 PreContainer,
 Outer,
 Carousel
} from './types';

interface WordCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
 words: string[];
 fontSize: number;
 pre: string;
}

const WordCarousel = ({ words, pre, fontSize, ...props }: WordCarouselProps) => {
  const wordsContainerRef = useRef<any>();
  
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      // const words = document.querySelectorAll('.carousel-word');
      const containerHeight = wordsContainerRef.current.getBoundingClientRect().height;
      const animationDistance = containerHeight / words.length;
      
      gsap.to(wordsContainerRef.current,  { 
        keyframes: [
        {y: `-=${animationDistance}`,  delay: 1.25, ease: Power4.easeIn, opacity: 1},
        {y: `-=${animationDistance}`,  delay: 1.25, ease: Power4.easeIn},
        {y: `-=${animationDistance}`,  delay: 1.25, ease: Power4.easeIn},
        {y: `-=${animationDistance}`,  delay: 1.25, ease: Power4.easeIn, onComplete: () => { gsap.set(wordsContainerRef.current, { y: `+=${animationDistance}`, opacity: 0}) }},
      ], repeat: -1 });
    }, wordsContainerRef);
    return () => context.revert();
  },[]);
  return (
  <Carousel fontSize={fontSize} >
    <PreContainer fontSize={fontSize}>{pre}</PreContainer>
    <Outer fontSize={fontSize}>
      <AnimationContainer {...{fontSize, ...props}} ref={wordsContainerRef}>
      {
        words.map((word , index) => <div key={`wega-word-carousel-${index}`} className="carousel-word">{word}</div> )
      }
      </AnimationContainer>
    </Outer>
  </Carousel>
 )
}
export default WordCarousel;
