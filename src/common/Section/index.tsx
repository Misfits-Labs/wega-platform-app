import { 
 SectionContainer, 
 SectionContainerProps,
 SectionHeader,  
} from './types';
import 'twin.macro';


export interface CustomHeaderProps<T = void | HTMLDivElement> extends React.Attributes, React.AllHTMLAttributes<T> {}

export interface SectionProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {
 hdr: CustomHeaderProps | string;
}
const Section: React.FC<SectionProps & Partial<SectionContainerProps>> = ({ 
 direction, 
 reverse, 
 children, 
 hdr,
 ...rest
 }: Partial<SectionContainerProps> & SectionProps) => {
  if(typeof hdr === 'string') {
   return (
     <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} { ...rest}>
      <SectionHeader tw='mb-[24px]'>
       {hdr}
      </SectionHeader>
      { children }
     </SectionContainer>
   )
  } else {
    const HeaderComp: React.FC<CustomHeaderProps> = (props: CustomHeaderProps) => {
      const Comp = () => hdr as React.ReactNode;
      if(props.children){
        return (<Comp>
          {children}
        </Comp>)
      } else {
        return (<Comp { ...props } /> )
      }
    };
    // const CustomHeaderComp:  = (props: CustomHeaderType) => <HeaderComp { ...props} />;
   return (
    <SectionContainer direction={!direction ? 'row' : direction } reverse={reverse} { ...rest}>
    <HeaderComp />
     { children }
    </SectionContainer>
   )
  }
}

export default Section;



