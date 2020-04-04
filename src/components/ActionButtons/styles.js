import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const ActionButtonsContainer = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 3rem auto 1rem;
`;

export const ActionButtonsFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;

  @media (max-width: 57.5rem) {
    flex-direction: column;
  }
`;

export const ActionButtonsTitle = styled.h1`
  @media (max-width: 57.5rem) {
    text-align: center;
  }
`;

export const ActionButtonsSearchInput = styled.input`
  border: 1px solid #ddd;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
`;

const ButtonStyle = css`
  text-transform: uppercase;
  background: none;
  border: 0;
  border-radius: 6px;
  padding: 0.6rem 1.7rem;
  transition: background 0.2s;

  span {
    display: flex;
    align-items: center;
    font-weight: bold;

    svg {
      margin-right: 0.3rem;
    }
  }
`;

export const ActionButtonsGoBackLink = styled.button`
  ${ButtonStyle}

  background-color: #ccc;
  color: #fff;

  &:hover {
    background-color: ${darken(0.04, '#ccc')};
  }
`;

export const ActionButtonsConfirmButton = styled.button`
  ${ButtonStyle}

  background-color: #7d40e7;
  color: #fff;
  margin-left: 1rem;

  &:hover {
    background-color: ${darken(0.04, '#7d40e7')};
  }

  @media (max-width: 57.5rem) {
    margin-top: 1rem;
  }
`;
