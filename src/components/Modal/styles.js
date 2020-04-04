import styled from 'styled-components';

export const Container = styled.div`
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 0.625rem #00000033;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

export const Content = styled.div`
  width: 40%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
`;
