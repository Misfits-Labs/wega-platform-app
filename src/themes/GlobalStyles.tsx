// src/styles/GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'


const CustomStyles = createGlobalStyle({

  body: {
  overflowX: 'hidden',
  WebkitTapHighlightColor: theme`colors.orange`,
  ...tw`antialiased`,
  ...tw`dark:bg-pretu dark:text-blanc`,
 },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles