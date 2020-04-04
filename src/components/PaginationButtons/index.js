import React from 'react';

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
