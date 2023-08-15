import React from 'react';
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
 return (
  <Carousel fontSize={fontSize} >
    <PreContainer fontSize={fontSize}>{pre}</PreContainer>
    <Outer fontSize={fontSize}>
      <AnimationContainer {...{fontSize, ...props}}>
      {
       words.map((word , index) => <div key={`wega-word-carousel-${index}`}>{word}</div>)
      }
     </AnimationContainer>
   </Outer>
  </Carousel>
 )
}
export default WordCarousel;
