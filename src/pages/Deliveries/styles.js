import styled from 'styled-components';
import { darken, setLightness, setSaturation } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  main {
    width: 70%;
    max-width: 100rem;
    margin-top: 3.5rem;

    > div {
      display: flex;
      justify-content: space-between;
      margin-top: 2.25rem;

      input {
        border: 1px solid #ddd;
        background: #fff;
        padding: 0.8rem 1.8rem;
        border-radius: 6px;
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #7d40e7;
        border: 0;
        border-radius: 6px;
        padding: 0.4rem 1.4rem;

        span {
          text-transform: uppercase;
          font-weight: bold;
          color: #fff;
          margin-left: 0.5rem;
        }

        &:hover {
          background: ${darken(0.04, '#7d40e7')};
        }
      }
    }

    @media (max-width: 65rem) {
      width: 96%;
    }
  }
`;

export const DeliveriesTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody tr {
    background-color: #fff;
  }

  th {
    text-align: start;
    color: #444;
  }

  td {
    color: #666;
  }

  td,
  th {
    padding: 1.25rem;
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
