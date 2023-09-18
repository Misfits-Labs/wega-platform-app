import { styled } from 'twin.macro';

interface DivWrapperWithGradientBorderProps {
  border?: number;
  gradient?: string;
  radius?: string;
}

export const DivWrapperWithGradientBorder = styled.div<DivWrapperWithGradientBorderProps>(({ 
  border, gradient, radius
}) => [
` position: relative;
  z-index: 10;
  box-sizing: border-box;
  --border: ${border ?? '5px'};
  --gradient-color: ${gradient ?? 'linear-gradient(#FF9C27, #FF9B27, #FFC076, #F26D21)'};
  --radius: ${radius ?? '5px'};
  background-clip: padding-box;
  border: solid var(--border) transparent;
  border-radius: var(--radius);

  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 9;
    margin: -var(--border); 
    border-radius: inherit; 
    background: var(--gradient-color);
  }
`
])