import { 
 SectionContainer, 
 SectionContainerProps,
 SectionHeader,  
} from './types';

export interface SectionProps {
 children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
 hdr: string | React.ReactNode;
}
const Section = ({ 
 direction, 
 reverse, 
 children, 
 hdr,
 ...rest
 }: Partial<SectionContainerProps & React.AllHTMLAttributes<HTMLDivElement>> & SectionProps) => {
  if(typeof hdr === 'string') {
   return (
     <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} { ...rest}>
      <SectionHeader className='mb-[24px]'>
       {hdr}
      </SectionHeader>
      { children }
     </SectionContainer>
   )
  } else {
   const HeaderComp = () => hdr as React.ReactNode;
   return (
    <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} { ...rest}>
    <HeaderComp />
     { children }
    </SectionContainer>
   )
  }
}

export default Section;




