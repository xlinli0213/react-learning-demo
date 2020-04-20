import React from 'react';
import { NestedRoute, routes } from '@router';
import { Switch } from 'react-router-dom';
import Header from '@components/header';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        {routes.map((route) => (
          <NestedRoute {...route} key={route.path} />
        ))}
      </Switch>
    </>
  );
};

export default App;
