import styled from 'styled-components';
import { darken, setLightness, setSaturation } from 'polished';

export const DeliverymanPhoto = styled.td`
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }

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
