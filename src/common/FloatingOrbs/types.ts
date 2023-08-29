import tw, {styled} from 'twin.macro';

export const FloatingOrbContainer = styled.div`
 ${tw`absolute top-0 right-0 w-full h-full z-[-20] flex justify-center items-center`}
`
export const FloatingOrbBlurContainer = styled.div`
  content: '';
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: z-[-21];
  ${tw`backdrop-blur-[80px]`}
`