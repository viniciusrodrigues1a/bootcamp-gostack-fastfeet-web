import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import NewDelivery from '~/pages/NewDelivery';
import EditDelivery from '~/pages/EditDelivery';

import Deliverymen from '~/pages/Deliverymen';
import NewDeliveryman from '~/pages/NewDeliveryman';
import EditDeliveryman from '~/pages/EditDeliveryman';

import Recipients from '~/pages/Recipients';
import NewRecipient from '~/pages/NewRecipient';
import EditRecipient from '~/pages/EditRecipient';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/deliveries" component={Deliveries} isPrivate />
      <Route exact path="/deliveries/new" component={NewDelivery} isPrivate />
      <Route
        exact
        path="/deliveries/edit/:id"
        component={EditDelivery}
        isPrivate
      />

      <Route exact path="/deliverymen" component={Deliverymen} isPrivate />
      <Route
        exact
        path="/deliverymen/new"
        component={NewDeliveryman}
        isPrivate
      />
      <Route
        exact
        path="/deliverymen/edit/:id"
        component={EditDeliveryman}
        isPrivate
      />

      <Route exact path="/recipients" component={Recipients} isPrivate />
      <Route exact path="/recipients/new" component={NewRecipient} isPrivate />
      <Route
        exact
        path="/recipients/edit/:id"
        component={EditRecipient}
        isPrivate
      />

      <Route exact path="/problems" component={Problems} isPrivate />
      <Route path="/" component={() => <Redirect to="/" />} />
    </Switch>
  );
}
