import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';

import '~/config/ReactotronConfig';

import history from '~/services/history';
import { store, persistor } from '~/store';

import GlobalStyles from '~/styles/global';
import Routes from '~/routes';

toast.configure({
  autoClose: 3000,
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyles />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
