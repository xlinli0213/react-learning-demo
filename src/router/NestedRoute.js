import { Route } from 'react-router-dom';
import React from 'react';

const NestedRoute = (route) => {
  return (
    <Route path={route.path} exact={route.exact} component={route.component} />
  );
};

export default NestedRoute;
