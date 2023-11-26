import styled from 'twin.macro';

export const SpinnerWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 
 --offset: 187;
 --duration: 1.5s;

 > svg.spinner {
  width: 25px;
  height: 25px;
  animation: rotator var(--duration) linear infinite;
  
  .path {
    stroke-dasharray: var(--offset);
    stroke-dashoffset: 0;
    transform-origin: center;
    animation:
      dash var(--duration) ease-in-out infinite, 
      colors calc(var(--duration)*4) ease-in-out infinite;
  }
 }

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}


@keyframes colors {
	0% { stroke: #c85a1b; }
	25% { stroke: #dc631e; }
	50% { stroke: #f37a35; }
	75% { stroke: #f48647; }
  100% { stroke: #f26d21; }
}

@keyframes dash {
 0% { stroke-dashoffset: var(--offset); }
 50% {
   stroke-dashoffset: calc(var(--offset)/4);
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: var(--offset);
   transform:rotate(450deg);
 }
}

`