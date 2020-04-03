import React from 'react';

import { Form } from './styles';

export default function FormWrapper(props) {
  const { children } = props;

  return <Form {...props}>{children}</Form>;
}
