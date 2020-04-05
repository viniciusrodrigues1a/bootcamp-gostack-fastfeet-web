import React from 'react';
import PropTypes from 'prop-types';

import { Container, LeftArrow, RightArrow } from './styles';

export default function PaginationButtons(props) {
  const { nextFunc, prevFunc, cantGoBack, cantGoForward } = props;
  return (
    <Container {...props}>
      <button type="button" onClick={prevFunc}>
        <LeftArrow disabled={cantGoBack} />
      </button>
      <div />
      <button type="button" onClick={nextFunc}>
        <RightArrow disabled={cantGoForward} />
      </button>
    </Container>
  );
}

PaginationButtons.propTypes = {
  nextFunc: PropTypes.func,
  prevFunc: PropTypes.func,
  cantGoBack: PropTypes.bool,
  cantGoForward: PropTypes.bool,
};

PaginationButtons.defaultProps = {
  nextFunc: () => {},
  prevFunc: () => {},
  cantGoBack: true,
  cantGoForward: true,
};
