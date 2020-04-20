import React from 'react';
import './index.scss';

const Details = () => {
  return (
    <main className='detailsWrapper'>
      <h3>Edit rowrmation</h3>
      <div className='detailsCard'>
        <div className='detailsCard-row'>
          <label htmlFor='author'>Author</label>
          <br />
          <input className='detailsCard-row-content' id='author' type='text' />
        </div>
        <div className='detailsCard-row'>
          <label htmlFor='content'>Content</label>
          <br />
          <input className='detailsCard-row-content' id='content' type='text' />
        </div>
        <div className='detailsCard-operation align-right'>
          <button className='confirm'>Confirm</button>
          <button className='cancel'>Cancel</button>
        </div>
      </div>
    </main>
  );
};

export default Details;
