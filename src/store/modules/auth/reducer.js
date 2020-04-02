import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  user: {},
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.user = {};
        break;
      }
      default:
    }
  });
}
