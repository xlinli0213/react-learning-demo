import React from 'react';
import './index.scss';
import Cart from './components/cart';
import Toolbar from './components/toolbar';
import TableCard from './components/table-card';

const Home = () => {
  return (
    <main className='mainWrapper'>
      <Cart />
      <Toolbar />
      <TableCard />
    </main>
  );
};

export default Home;
