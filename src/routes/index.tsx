import React from 'react';
import { Route, Switch } from 'react-router';
import Message from '../routes/Message';
import NoMatch from '../components/NoMatch';
import NavBar from '../components/NavBar';

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route path="/" component={Message} />
      <Route path="/message/:sex" component={Message} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
