import { styled } from 'twin.macro';

export interface CarouselProps {
 fontSize: number;
}

export const AnimationContainer = styled.div<CarouselProps>(({ fontSize }) => [
 `
 --font-size: ${fontSize}px;
 position: relative;

 @keyframes rotate {
   
   5%, 20% {
    transform: translateY(0);
   }
   25%,45% {
    transform: translateY(calc(var(--font-size) * -1.5));
   }
   50%,70% {
    transform: translateY(calc(var(--font-size) * -3));
   }
   75%,95% {
    transform: translateY(calc(var(--font-size) * -4.5));
   }
  }
  animation: rotate 7s ease-in-out infinite;
 `
])

export const Carousel = styled.div<CarouselProps>(({ fontSize }) => [
 `
  --font-size: ${fontSize || 51}px;
  font-style: normal;
  font-weight: 600;
  line-height: 47px
  text-align: center;
  font-size: var(--font-size);
  line-height: calc(var(--font-size) * 1.5);
  height: calc(var(--font-size) * 1.5);
  display: flex;
  margin-bottom: 48px;
  justify-content: center;

 `
])

export const PreContainer = styled.div<CarouselProps>(({ fontSize }) => [
 `
  --font-size: ${fontSize}px;
		height: calc(var(--font-size) * 1.5);
 `
])

export const Outer = styled.div<CarouselProps>(({ fontSize }) => [
 `
  --font-size: ${fontSize}px;
  text-align: left;
  margin-left: 1rem;
  height: calc(var(--font-size) * 1.5);
  overflow: hidden;
 `
])
