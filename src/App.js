import React from 'react';
import { NestedRoute, routes } from '@router';
import { Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from './store';
import 'normalize.css';
import '@assets/scss/base.scss';
import svgSpriteLoader from '@plugins/svg-sprite-loader';
import Header from '@components/header';

svgSpriteLoader();

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Switch>
        {routes.map((route) => (
          <NestedRoute {...route} key={route.path} />
        ))}
      </Switch>
    </Provider>
  );
};

export default App;
