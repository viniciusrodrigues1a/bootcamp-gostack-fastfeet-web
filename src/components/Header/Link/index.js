import React from 'react';
import PropTypes from 'prop-types';

import history from '~/services/history';

import { StyledLink } from './styles';

export default function LinkWrapper({ to, children }) {
  const [, initialPathname] = to.split('/');
  const isActive = history.location.pathname.startsWith(`/${initialPathname}`);

  return (
    <StyledLink to={to} active={isActive.toString()}>
      {children}
    </StyledLink>
  );
}

LinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

LinkWrapper.defaultProps = {
  children: null,
};
