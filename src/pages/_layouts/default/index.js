import React from 'react';

import { HtmlBackground } from './styles';

import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <>
      <HtmlBackground />
      <Header />
      {children}
    </>
  );
}
