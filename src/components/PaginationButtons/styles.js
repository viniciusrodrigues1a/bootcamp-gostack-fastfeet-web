import styled from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  margin: 1.5rem 0 1rem 0;

  button {
    border: 0;
    background: none;

    svg {
      width: 4rem;
      height: 4rem;
      cursor: pointer;
    }
  }

  div {
    width: 1rem;
    height: 1rem;
    background-color: #aaa;
    border-radius: 50%;
  }
`;

export const LeftArrow = styled(MdChevronLeft)`
  color: ${props => (!props.disabled ? '#7D40E7' : '#aaa')};
`;

export const RightArrow = styled(MdChevronRight)`
  color: ${props => (!props.disabled ? '#7D40E7' : '#aaa')};
`;
