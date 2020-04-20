import loadable from '@loadable/component';

const routes = [
  {
    path: '/',
    component: loadable(() => import('@pages/home')),
    exact: true,
  },
  {
    path: '/details/:cid',
    component: loadable(() => import('@pages/details')),
  },
  {
    path: '*',
    component: loadable(() => import('@pages/404')),
  },
];

export default routes;
