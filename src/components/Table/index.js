import React from 'react';
import PropTypes from 'prop-types';

import { StyledTable } from './styles';

export default function Table(props) {
  const { children } = props;
  return <StyledTable {...props}>{children}</StyledTable>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Table.defaultProps = {
  children: null,
};
