import React from 'react';
import PropTypes from 'prop-types';

import { FormWrapper, LabelWrapper, InputWrapper, RowWrapper } from './styles';
import SelectWrapper from './SelectWrapper';

function Wrapper(props) {
  const { children } = props;
  return <FormWrapper {...props}>{children}</FormWrapper>;
}

function Row(props) {
  const { children } = props;
  return <RowWrapper {...props}>{children}</RowWrapper>;
}

function Label(props) {
  const { children } = props;
  return <LabelWrapper {...props}>{children}</LabelWrapper>;
}

function Input(props) {
  return <InputWrapper {...props} />;
}

function Select(props) {
  return <SelectWrapper {...props} />;
}

const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

Wrapper.propTypes = {
  children: childrenPropTypes,
};

Wrapper.defaultProps = {
  children: null,
};

Row.propTypes = {
  children: childrenPropTypes,
};

Row.defaultProps = {
  children: null,
};

Label.propTypes = {
  children: childrenPropTypes,
};

Label.defaultProps = {
  children: null,
};

Input.propTypes = {
  children: childrenPropTypes,
};

Input.defaultProps = {
  children: null,
};

Select.propTypes = {
  children: childrenPropTypes,
};

Select.defaultProps = {
  children: null,
};

const Form = {
  Wrapper,
  Row,
  Label,
  Input,
  Select,
};

export default Form;
