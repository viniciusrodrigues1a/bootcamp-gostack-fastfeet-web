import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/" component={() => <Redirect to="/" />} />
    </Switch>
  );
}
