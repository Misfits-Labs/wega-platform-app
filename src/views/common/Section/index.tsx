import { 
 SectionContainer, 
 SectionContainerProps,
 SectionHeader,  
} from './types';

export interface SectionProps {
 children: React.ReactNode | React.ReactNode[];
 title: string | React.ReactNode; 
}
const Section = ({ 
 direction, 
 reverse, 
 children, 
 title
 }: Partial<SectionContainerProps> & SectionProps) => {
  if(typeof title === 'string') {
   return (
     <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} >
      <SectionHeader>
       {title}
      </SectionHeader>
      { children }
     </SectionContainer>
   )
  } else {
   const HeaderComp = () => title as React.ReactNode;
   return (
    <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} >
     <SectionHeader>
      <HeaderComp />
     </SectionHeader>
     { children }
    </SectionContainer>
   )
  }
}

export default Section;


