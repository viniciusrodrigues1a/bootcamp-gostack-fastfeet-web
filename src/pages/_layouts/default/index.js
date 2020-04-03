import React from 'react';
import PropTypes from 'prop-types';

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

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

DefaultLayout.defaultProps = {
  children: null,
};
