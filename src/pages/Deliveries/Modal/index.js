import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import {
  Container,
  Content,
  InfoContainer,
  DatesInfoContainer,
  SignatureInfoContainer,
} from './styles';

export default function Modal({ show, setShow, delivery }) {
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

  const timeZone = useCallback(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const startDate = useMemo(() => {
    if (delivery.start_date) {
      return format(
        utcToZonedTime(delivery.start_date, timeZone),
        "d'/'MM'/'y",
      );
    }

    return '';
  }, [delivery, timeZone]);

  const endDate = useMemo(() => {
    if (delivery.end_date) {
      return format(utcToZonedTime(delivery.end_date, timeZone), "d'/'MM'/'y");
    }

    return '';
  }, [delivery, timeZone]);

  return (
    <Container show={show}>
      <Content ref={ref}>
        <InfoContainer>
          <p>Informações da encomenda</p>
          <div>
            <span>
              {delivery.recipient.street}, {delivery.recipient.house_number}
            </span>
            <span>{delivery.recipient.state}</span>
            <span>{delivery.recipient.cep_code}</span>
          </div>
        </InfoContainer>
        <DatesInfoContainer>
          <p>Datas</p>
          <div>
            <span>
              <span>Retirada:</span> {startDate}
            </span>
            <span>
              <span>Entrega:</span> {endDate}
            </span>
          </div>
        </DatesInfoContainer>
        <SignatureInfoContainer>
          <p>Assinatura do destinatário</p>
          {delivery.signature && (
            <img src={delivery.signature.url_path} alt="Assinatura" />
          )}
        </SignatureInfoContainer>
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  delivery: PropTypes.objectOf(PropTypes.object).isRequired,
};
