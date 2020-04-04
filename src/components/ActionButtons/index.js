import React from 'react';
import { Link } from 'react-router-dom';

import {
  ActionButtonsContainer,
  ActionButtonsFlexContainer,
  ActionButtonsTitle,
  ActionButtonsSearchInput,
  ActionButtonsGoBackLink,
  ActionButtonsConfirmButton,
} from './styles';

function Container(props) {
  const { children } = props;
  return <ActionButtonsContainer {...props}>{children}</ActionButtonsContainer>;
}

function FlexContainer(props) {
  const { children } = props;
  return (
    <ActionButtonsFlexContainer {...props}>
      {children}
    </ActionButtonsFlexContainer>
  );
}

function Title(props) {
  const { children } = props;
  return <ActionButtonsTitle {...props}>{children}</ActionButtonsTitle>;
}

function SearchInput(props) {
  return <ActionButtonsSearchInput {...props} />;
}

function GoBackLink(props) {
  const { children, to } = props;
  return (
    <Link to={to}>
      <ActionButtonsGoBackLink {...props}>
        <span>{children}</span>
      </ActionButtonsGoBackLink>
    </Link>
  );
}

function ConfirmButton(props) {
  const { children } = props;
  return (
    <ActionButtonsConfirmButton {...props}>
      <span>{children}</span>
    </ActionButtonsConfirmButton>
  );
}

const ActionButtons = {
  Container,
  FlexContainer,
  Title,
  SearchInput,
  GoBackLink,
  ConfirmButton,
};

export default ActionButtons;
