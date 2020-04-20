import React from 'react';
import './index.scss';
import Icon from '@components/global/icon';

const TableCard = () => {
  const arr = [
    {
      date: '2019-10-01',
      content: 'Gdme Gxztaoto Bowwb Xtaoquoa',
      author: 'Linda',
    },
    {
      date: '2019-11-01',
      content: 'Kup Jml Rtzgueldta Ynuoepbqko',
      author: 'Donald',
    },
    {
      date: '2019-12-01',
      content: 'Myfwmi Malqtlfmsb Nfkoxh Krrlp Mqjno',
      author: 'Karen',
    },
    {
      date: '2020-01-01',
      content: 'Aqyujluj Twqfpsj Mory Cpolsqnlf Uqectje',
      author: 'Edward',
    },
    {
      date: '2020-02-01',
      content: 'Yrefzl Noxbmfk Ycxnvxbik Pofnlvrqrg',
      author: 'Sarah',
    },
  ];

  return (
    <div className='tableCardWrapper'>
      <table className='tableCard' cellPadding='0' cellSpacing='0'>
        <thead>
          <tr>
            <th className='tableCard-col'>
              <input
                id='tableCard-row-all'
                className='tableCard-checkbox'
                type='checkbox'
              />
              <label htmlFor='tableCard-row-all'></label>
            </th>
            <th className='tableCard-col'>Content</th>
            <th className='tableCard-col'>Author</th>
            <th className='tableCard-col'>Date</th>
            <th className='tableCard-col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((row, index) => (
            <tr className='tableCard-row' key={row.content}>
              <td className='tableCard-col'>
                <input
                  id={`tableCard-row-${index}`}
                  className='tableCard-checkbox'
                  type='checkbox'
                />
                <label htmlFor={`tableCard-row-${index}`}></label>
              </td>
              <td className='tableCard-col align-left'>{row.content}</td>
              <td className='tableCard-col'>{row.author}</td>
              <td className='tableCard-col'>{row.date}</td>
              <td className='tableCard-col'>
                <button className='tableCard-edit'>
                  <Icon name='edit' />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              className='tableCard-col tableCard-pagination align-right'
              colSpan={arr.length + 2}
            >
              <Icon name='left' />
              <span>Page order: 1</span>
              <Icon name='right' />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableCard;
