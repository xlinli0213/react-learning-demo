import React from 'react';
import './index.scss';

const Icon = (props) => {
  const { name, classes = '' } = props;
  return (
    <svg className={`icon icon-${name} ${classes}`.trim()}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
