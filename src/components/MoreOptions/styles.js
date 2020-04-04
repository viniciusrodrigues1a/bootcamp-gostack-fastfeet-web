import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  position: ${props => (props.align === 'end' ? 'static' : 'relative')};

  > button {
    background: none;
    border: 0;
  }

  div {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    z-index: 1;
    position: absolute;
    right: ${props => props.align === 'end' && 0};
    transform: ${props => props.align !== 'end' && 'translateX(-2rem)'};
    background-color: #fff;
    box-shadow: 0 0 3px #00000026;
  }
`;

export const StyledButton = styled.button`
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
`;
