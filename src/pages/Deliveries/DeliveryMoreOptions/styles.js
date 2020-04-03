import styled from 'styled-components';

export const Container = styled.td`
  position: relative;

  > button {
    background: none;
    border: 0;
  }

  div {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    width: 6rem;
    z-index: 1;
    position: absolute;
    transform: translateX(-1.5rem);
    background-color: #ffffff;
    box-shadow: 0 0 2px #00000026;

    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: none;
      border: 0;
      border-bottom: 1px solid #eee;
      padding: 0.5rem;

      svg {
        margin-right: 0.3rem;
      }
    }
  }
`;
