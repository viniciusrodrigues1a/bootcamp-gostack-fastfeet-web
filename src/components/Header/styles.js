import styled, { css } from 'styled-components';

export const Container = styled.header`
  border-bottom: 1px solid #ddd;
  background: #fff;
  width: 100%;
`;

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100rem;
  padding: 1rem 2rem;
  height: 6rem;
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 18rem;
    margin-right: 1rem;
    padding-right: 1rem;
    border-right: 1px solid #ddd;

    @media (max-width: 996px) {
      border: 0;
    }

    @media (max-width: 28.75rem) {
      width: 12rem;
    }
  }
`;

const HamburguerAnimation = {
  first: css`
    transform: translateY(0.5rem) rotate(-45deg);
  `,
  second: css`
    opacity: 0;
  `,
  third: css`
    transform: translateY(-0.3rem) rotate(45deg);
  `,
};

export const HamburguerMenu = styled.button`
  background: none;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1rem;

  div {
    width: 1rem;
    height: 0.2rem;
    background-color: #222;
    transition: transform 0.3s;
  }

  div:nth-child(1) {
    ${props => (props.animate ? HamburguerAnimation.first : null)}
  }

  div:nth-child(2) {
    ${props => (props.animate ? HamburguerAnimation.second : null)}
  }

  div:nth-child(3) {
    ${props => (props.animate ? HamburguerAnimation.third : null)}
  }
`;

export const MobileNavContainer = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;

    a + a {
      margin: 1rem 0 0 !important;
    }
  }

  div {
    padding-bottom: 2rem;

    span {
      display: none;
    }
  }
`;
