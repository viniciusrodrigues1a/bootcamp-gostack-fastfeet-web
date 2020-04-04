import React from 'react';

import { StyledTable } from './styles';

export default function Table(props) {
  const { children } = props;
  return <StyledTable {...props}>{children}</StyledTable>;
}
