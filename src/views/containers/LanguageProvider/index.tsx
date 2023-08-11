import React from 'react';
import { IntlProvider } from 'react-intl';
import English from '../../../libs/react-intl/languages/en-US.json';

interface LanguageProviderProps {
 children: React.JSX.Element | React.JSX.Element[];
 locale: string;
}

// TODO 
  // add switcher for locale
  
function LanguageProvider(props: LanguageProviderProps) {
  const defaultLocale = 'en-US';
  const messages = English;
  return (
    <IntlProvider  messages={messages} locale={props.locale} defaultLocale={defaultLocale}>
      {props.children}
    </IntlProvider>
  )
}
export default LanguageProvider;