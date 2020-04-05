import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FiMoreHorizontal } from 'react-icons/fi';

import { ContainerWrapper, StyledButton } from './styles';

function Container(props) {
  const [show, setShow] = useState(false);
  const { children } = props;

  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    }

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [show]);

  return (
    <ContainerWrapper {...props} show={show} ref={ref}>
      <button type="button" onClick={() => setShow(!show)}>
        <FiMoreHorizontal size={22} color="#666" />
      </button>
      <div>{children}</div>
    </ContainerWrapper>
  );
}

function Button(props) {
  const { children } = props;

  return <StyledButton {...props}>{children}</StyledButton>;
}

const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

Container.propTypes = {
  children: childrenPropTypes,
};

Container.defaultProps = {
  children: null,
};

Button.propTypes = {
  children: childrenPropTypes,
};

Button.defaultProps = {
  children: null,
};

const MoreOptions = {
  Container,
  Button,
};

export default MoreOptions;
