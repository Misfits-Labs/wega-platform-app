interface  MainPropsContainerProps extends React.Attributes, React.AllHTMLAttributes<HTMLDivElement> {};
import 'twin.macro';

const MainContainer: React.FC<MainPropsContainerProps > = ({ children, ...rest }: MainPropsContainerProps) => {
  return (
    <main tw="flex flex-col justify-center relative" {...rest} >
     <div tw="container md:w-[978px] mt-[10rem]">
      {children}
     </div>
    </main>
  )
}
export default MainContainer;
