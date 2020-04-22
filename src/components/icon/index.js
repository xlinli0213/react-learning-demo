import React from 'react';
import './index.scss';

const Icon = (props) => {
  const { name, classes = '', handleClick = () => {} } = props;
  return (
    <svg
      className={`icon icon-${name} ${classes}`.trim()}
      onClick={handleClick}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
