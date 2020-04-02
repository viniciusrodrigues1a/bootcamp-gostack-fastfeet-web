import styled, { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export const HtmlBackground = createGlobalStyle`
  html {
    background-color: #7d40e7;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 5% 0;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 4rem;

  img {
    margin-bottom: 3rem;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      color: #444;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0.6rem 0;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 1rem;

      &::placeholder {
        font-size: 1.15em;
        color: #222;
      }
    }

    button {
      background-color: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 6px;
      padding: 1rem;
      margin-top: 1rem;
      font-weight: bold;
      font-size: 1.15em;
      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.04, '#7d40e7')};
      }
    }
  }
`;
