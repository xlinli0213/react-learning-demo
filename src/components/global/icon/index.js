import React from 'react';
import './index.scss';

const Icon = ({ name }) => {
  return (
    <svg className={`icon icon-${name}`}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
