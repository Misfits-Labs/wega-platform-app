import { ComponentLoaderWrapper } from './types';
import { WegaLoaderIcon } from '../../assets/icons'

export const ComponentLoader = (props: React.Attributes & React.HTMLAttributes<HTMLElement>) => {
  return (
    <ComponentLoaderWrapper { ...props }>
     <WegaLoaderIcon /> 
    </ComponentLoaderWrapper>
  )
}
