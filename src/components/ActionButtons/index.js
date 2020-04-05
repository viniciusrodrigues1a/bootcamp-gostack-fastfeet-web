import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

Container.propTypes = {
  children: childrenPropTypes,
};

Container.defaultProps = {
  children: null,
};

FlexContainer.propTypes = {
  children: childrenPropTypes,
};

FlexContainer.defaultProps = {
  children: null,
};

Title.propTypes = {
  children: childrenPropTypes,
};

Title.defaultProps = {
  children: null,
};

SearchInput.propTypes = {
  children: childrenPropTypes,
};

SearchInput.defaultProps = {
  children: null,
};

GoBackLink.propTypes = {
  children: childrenPropTypes,
  to: PropTypes.string.isRequired,
};

GoBackLink.defaultProps = {
  children: null,
};

ConfirmButton.propTypes = {
  children: childrenPropTypes,
};

ConfirmButton.defaultProps = {
  children: null,
};

const ActionButtons = {
  Container,
  FlexContainer,
  Title,
  SearchInput,
  GoBackLink,
  ConfirmButton,
};

export default ActionButtons;
