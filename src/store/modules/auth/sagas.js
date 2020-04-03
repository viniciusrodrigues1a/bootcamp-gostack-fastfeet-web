import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signInFailure } from './actions';

function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', { email, password });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user, token));

    history.push('/deliveries');
  } catch (err) {
    yield put(signInFailure());
    toast.error(
      'Falha ao tentar fazer login, verifique as informações inseridas.',
      { className: 'toast-custom-background toast-custom-background-error' },
    );
  }
}

function signOut() {
  history.push('/');
}

function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
