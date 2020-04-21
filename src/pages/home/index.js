import React from 'react';
import './index.scss';
import Toolbar from './components/toolbar';
import TableCard from './components/table-card';

const Home = () => {
  return (
    <main className='mainWrapper'>
      <Toolbar />
      <TableCard />
    </main>
  );
};

export default Home;
