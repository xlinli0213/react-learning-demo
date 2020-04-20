import React from 'react';
import './index.scss';

const NoMatch = () => {
  return (
    <div className='notMatch'>
      <h1 className='errorCode'>404</h1>
      <p className='errorInfo'>Sorry the page not found.</p>
    </div>
  );
};

export default NoMatch;
