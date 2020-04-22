import React from 'react';
import './index.scss';
import Icon from '@components/icon';

const Header = () => {
  return (
    <header className='header'>
      <h2 className='header-title'>Demo</h2>
      <div className='header-user'>
        Hello, linli
        <Icon name='dropdown' />
      </div>
    </header>
  );
};

export default Header;
