import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function ProfileContainer({ username }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <span>{username}</span>

      <button type="button" onClick={handleSignOut}>
        Sair do sistema
      </button>
    </Container>
  );
}
