import styled from 'styled-components';
import { darken, setLightness, setSaturation } from 'polished';

export const ActionButtonsFlexWrapper = styled.div`
  display: flex;

  @media (max-width: 57.5rem) {
    margin-top: 1rem;
    flex-direction: column;

    button {
      margin-left: 0;
    }
  }
`;

export const DeliverymanName = styled.td`
  span {
    background: ${props =>
      props.color
        ? setLightness(0.7, setSaturation(0.7, darken(0.04, props.color)))
        : '#777'};
    color: ${props =>
      props.color
        ? darken(
            0.35,
            setLightness(0.7, setSaturation(0.7, darken(0.04, props.color))),
          )
        : '#aaa'};
    border-radius: 50%;
    padding: 0.2rem;
    margin-right: 0.5rem;

    @media (max-width: 65rem) {
      display: none;
    }
  }
`;

const statusesColor = {
  lighterColor: {
    Pendente: '#F0F0DF',
    Entregue: '#DFF0DF',
    Retirada: '#BAD2FF',
    Cancelada: '#FAB0B0',
  },
  darkerColor: {
    Pendente: '#C1BC35',
    Entregue: '#2CA42B',
    Retirada: '#4D85EE',
    Cancelada: '#DE3B3B',
  },
};

export const DeliveryStatus = styled.td`
  span {
    font-weight: bold;
    background: ${props =>
      props.status ? statusesColor.lighterColor[props.status] : '#aaa'};
    text-transform: uppercase;
    color: ${props =>
      props.status ? statusesColor.darkerColor[props.status] : '#777'};
    border-radius: 12px;
    padding: 0.125rem 0.5rem 0.125rem 1.25rem;
    position: relative;
    font-size: 0.875rem;

    &::before {
      content: '';
      width: 0.625rem;
      height: 0.625rem;
      background-color: ${props =>
        props.status ? statusesColor.darkerColor[props.status] : '#777'};
      position: absolute;
      border-radius: 50%;
      left: 0;
      margin: 0.1875rem 0 0.1875rem 0.4rem;
    }
  }
`;

export const ModalContent = styled.div`
  p {
    color: #444;
    font-weight: bold;
  }

  span {
    display: block;
    color: #666;
  }

  p,
  span {
    line-height: 1.5rem;
  }
`;

export const InfoContainer = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

export const DatesInfoContainer = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
  div {
    display: flex;
    flex-direction: column;
  }

  div span span {
    color: #444;
    font-weight: bold;
    display: inline-block;
  }
`;

export const SignatureInfoContainer = styled.div`
  div {
    display: flex;
    justify-content: center;
  }

  img {
    min-width: 3rem;
    min-height: 3rem;
    max-width: 8rem;
    max-height: 8rem;
    margin: 1rem 0;
  }
`;
