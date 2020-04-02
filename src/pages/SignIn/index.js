import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import { HtmlBackground, Container, Content } from './styles';
import logo from '~/assets/images/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <HtmlBackground />
      <Container>
        <Content>
          <img src={logo} alt="FastFeet" />

          <Form onSubmit={handleSubmit}>
            <label htmlFor="email">Seu e-mail</label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="exemplo@email.com"
            />

            <label htmlFor="password">Sua senha</label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="***********"
            />

            <button type="submit">Entrar no sistema</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
