import tw, {styled} from 'twin.macro';

export const FloatingOrbContainer = styled.div`
 ${tw`h-full w-full relative`}
`
export const FloatingOrbBlurContainer = styled.div`
  content: '';
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  ${tw`backdrop-blur-2xl`}
`