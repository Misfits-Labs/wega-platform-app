import { Helmet } from 'react-helmet-async';
import ErrorIllustration from './images/404'; 
import Section from '../../common/Section';
import { SectionHeaderTitle, SectionHeaderContainer } from '../../common/Section/types';
import MainContainer from '../../components/MainContainer';
import 'twin.macro'; 

const ErrorPage = () =>  (
  <>
    <Helmet>
    <title>Error - 404</title>
    </Helmet>
    <MainContainer tw="grow-[2] justify-center items-center gap-y-[35px]">
      <div tw="mt-[4rem] w-[175px] sm:w-[348.11px] h-[66px] sm:h-[130.99px]">
        <ErrorIllustration width="100%" height="100%" /> 
      </div>
      <Section 
      tw="mt-[1rem] items-center"
      direction='col'
      hdr={
        <SectionHeaderContainer tw='justify-center  sm:w-[60%]'>
          <SectionHeaderTitle tw="text-[38px] leading-[35px] w-full text-shinishi text-center">This page is not having a great day... Try again later {'<3'}</SectionHeaderTitle>
        </SectionHeaderContainer>
       }>
      </Section>
    </MainContainer>
  </>
 )

export default ErrorPage;

