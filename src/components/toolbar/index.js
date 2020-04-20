import React from 'react';
import './index.scss';
import Icon from '@components/global/icon';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <div className='toolbar-operation'>
        <Icon name='add' />
        <Icon name='delete' />
      </div>
      <div className='toolbar-search'>
        <input
          className='toolbar-search-input'
          type='text'
          placeholder='content/author:xxx'
        />
        <Icon name='search' />
      </div>
    </div>
  );
};

export default Toolbar;
