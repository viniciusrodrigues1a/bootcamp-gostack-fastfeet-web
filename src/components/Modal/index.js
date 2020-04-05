import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({ show, setShow, children }) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [show, setShow]);

  return (
    <Container show={show}>
      <Content ref={ref}>{children}</Content>
    </Container>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Modal.defaultProps = {
  children: null,
};
