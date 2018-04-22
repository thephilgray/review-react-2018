import React from 'react';

import AlbumContainer from '../containers/AlbumContainer';
import AddForm from '../containers/AddForm';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={AlbumContainer} />
    <Route exact path="/add" component={AddForm} />
    <Route path="/:id/edit" component={AddForm} />
    <Route component={PageNotFound} />
  </Switch>
);
