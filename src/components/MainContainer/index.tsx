type MainPropsContainerProps = { children?: React.ReactNode };
import 'twin.macro';

const MainContainer: React.FC<MainPropsContainerProps> = ({ children, ...rest }: MainPropsContainerProps) => {
  return (
    <main tw="container mt-36 w-[978px] flex flex-col justify-center gap-y-[48px] relative" {...rest} >
     {children}
    </main>
  )
}
export default MainContainer;
