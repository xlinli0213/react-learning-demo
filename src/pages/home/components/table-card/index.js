import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';

@inject(({ store }) => ({ store: store.home }))
@observer
class TableCard extends Component {
  render() {
    const {
      showArticleList,
      changeArticleStatus,
      setAllSelected,
      allSelected,
    } = this.props.store;

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
                  checked={allSelected}
                  onChange={(e) => setAllSelected(e)}
                />
                <label htmlFor='tableCard-row-all'></label>
              </th>
              <th className='tableCard-col'>Title</th>
              <th className='tableCard-col'>Author</th>
              <th className='tableCard-col'>Date</th>
              <th className='tableCard-col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!showArticleList.length && (
              <tr>
                <td className='tableCard-col align-left' colSpan='5'>
                  No articles satisfying the conditions
                </td>
              </tr>
            )}
            {showArticleList.map((row) => (
              <tr className='tableCard-row' key={row.id}>
                <td className='tableCard-col'>
                  <input
                    id={row.id}
                    className='tableCard-checkbox'
                    type='checkbox'
                    checked={row.checked}
                    onChange={() => changeArticleStatus(row.id)}
                  />
                  <label htmlFor={row.id}></label>
                </td>
                <td className='tableCard-col align-left'>{row.title}</td>
                <td className='tableCard-col'>{row.author}</td>
                <td className='tableCard-col'>{row.date}</td>
                <td className='tableCard-col'>
                  <Link to={`/details/${row.id}`}>
                    <button className='tableCard-edit'>
                      <Icon name='edit' />
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                className='tableCard-col tableCard-pagination align-right'
                colSpan='5'
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
  }
}

export default TableCard;
