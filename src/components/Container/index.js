import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 57.5rem) {
    width: 96%;
  }
`;

export default Container;
