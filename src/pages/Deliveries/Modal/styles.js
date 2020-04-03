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
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;

  p {
    font-weight: bold;
    color: #444;
    margin-bottom: 0.3rem;
  }

  span {
    color: #666;
    line-height: 1.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
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

  div span span {
    font-weight: bold;
  }
`;

export const SignatureInfoContainer = styled.div`
  img {
    min-width: 3rem;
    min-height: 3rem;
    max-width: 8rem;
    max-height: 8rem;
    margin: 1rem auto;
  }
`;
