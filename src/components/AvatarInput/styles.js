import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 1.875rem;

  svg {
    width: 7.5rem;
    height: 7.5rem;
  }

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;
