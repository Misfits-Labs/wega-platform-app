interface  MainPropsContainerProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {};
import 'twin.macro';

const MainContainer: React.FC<MainPropsContainerProps > = ({ children, ...rest }: MainPropsContainerProps) => {
  return (
    <main tw="container w-[978px] flex flex-col justify-center gap-y-[48px] relative" {...rest} >
     {children}
    </main>
  )
}
export default MainContainer;
