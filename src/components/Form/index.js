import React from 'react';

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

const Form = {
  Wrapper,
  Row,
  Label,
  Input,
  Select,
};

export default Form;
