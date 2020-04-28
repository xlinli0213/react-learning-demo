import React from 'react';
import { NestedRoute, routes } from '@router';
import { Switch } from 'react-router-dom';
import 'normalize.css';
import '@assets/scss/base.scss';
import svgSpriteLoader from '@plugins/svg-sprite-loader';
import Header from '@components/header';

svgSpriteLoader();

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
