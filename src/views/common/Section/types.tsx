import tw, { styled } from 'twin.macro';

// TODO
 // make font size dynamic with tw

export interface SectionContainerProps {
 direction: 'row' | 'col',
 reverse?: boolean;
}

export const SectionContainer = styled.section<SectionContainerProps>(({ direction , reverse }) => {
 switch(direction) {
  case 'col': 
   return reverse ? [tw`flex flex-col-reverse`] : [tw`flex flex-col`]   
  default: 
   return reverse ? [tw`flex flex-row-reverse`] : [tw`flex flex-row`]   
 }
})

export const SectionHeader = styled.span`
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  font-family: League Spartan;
`