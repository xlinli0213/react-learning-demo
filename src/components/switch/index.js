import React from 'react';
import './index.scss';

const Switch = (props) => {
  const { swicthId, switchValue, handleChange } = props;
  return (
    <span className='switch'>
      <input
        type='checkbox'
        id={swicthId}
        className='switch-input'
        checked={switchValue}
        onChange={handleChange}
      />
      <label htmlFor={swicthId} className='switch-label'>
        Toggle
      </label>
    </span>
  );
};

export default Switch;
