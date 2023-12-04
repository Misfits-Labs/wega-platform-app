import { windowIsCurrentlyMobileQuery } from '../models/constants'
import { useMedia } from 'react-use'

export function useMediaQuery() {
 const windowIsCurrentlyMobile = useMedia(windowIsCurrentlyMobileQuery);
 return { windowIsCurrentlyMobile }
} 

