import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GoEye, GoPencil, GoTrashcan } from 'react-icons/go';

import { Container } from './styles';

export default function DeliveryMoreOptions({ onClickView }) {
  const [show, setShow] = useState(false);

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

  const closeOptionsAndExecute = useCallback(func => {
    setShow(false);
    func();
  }, []);

  return (
    <Container show={show} ref={ref}>
      <button type="button" onClick={() => setShow(!show)}>
        <FiMoreHorizontal size={22} color="#666" />
      </button>
      <div>
        <button
          type="button"
          onClick={() => closeOptionsAndExecute(onClickView)}
        >
          <GoEye size={18} color="#8E5BE8" /> Visualizar
        </button>
        <button type="button">
          <GoPencil size={18} color="#4D85EE" /> Editar
        </button>
        <button type="button">
          <GoTrashcan size={18} color="#DE3B3B" /> Excluir
        </button>
      </div>
    </Container>
  );
}

DeliveryMoreOptions.propTypes = {
  onClickView: PropTypes.func.isRequired,
};
