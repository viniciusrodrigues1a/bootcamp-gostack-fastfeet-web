import styled from 'styled-components';
import { darken } from 'polished';

import FormWrapper from '~/components/Form';

export const Container = styled.div`
  main {
    width: 70%;
    max-width: 100rem;
    margin: 0 auto;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2.5rem;

      div button {
        text-transform: uppercase;
        font-weight: bold;
        background: none;
        border: 0;
        border-radius: 6px;
        padding: 0.6rem 1.7rem;
        transition: background 0.2s;

        span {
          display: flex;
          align-items: center;
        }

        &:nth-child(1) {
          background-color: #ccc;
          color: #fff;

          &:hover {
            background-color: ${darken(0.04, '#ccc')};
          }
        }

        &:nth-child(2) {
          background-color: #7d40e7;
          color: #fff;
          margin-left: 1rem;

          &:hover {
            background-color: ${darken(0.04, '#7d40e7')};
          }
        }
      }

      @media (max-width: 57.5rem) {
        flex-direction: column;
      }
    }

    @media (max-width: 43.75rem) {
      width: 96%;
    }
  }
`;

export const Form = styled(FormWrapper)`
  > div {
    display: flex;
    justify-content: space-between;

    > div {
      width: 46%;

      > div {
        margin: 0.6rem 0;
      }
    }
  }

  span,
  label {
    color: #444;
    font-weight: bold;
  }

  > input {
    padding: 0.65rem;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    margin: 0.6rem 0;
  }
`;
