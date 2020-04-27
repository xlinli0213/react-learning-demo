import HomeStore from './pages/home/store';
import DetailsStore from './pages/details/store';

const store = {
  home: new HomeStore(),
  details: new DetailsStore(),
};

export default store;
