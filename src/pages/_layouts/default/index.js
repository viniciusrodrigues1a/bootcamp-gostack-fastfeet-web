import React from 'react';

import { Wrapper } from './styles';

import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
