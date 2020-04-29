import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';
import DetailsModal from '../details-modal';
import pageStore from '../../store';
import tableCardStore from './store';
@observer
class TableCard extends Component {
  render() {
    const { showArticleList, isManageOpen, changeArticleSelected } = pageStore;
    const { allSelected, setAllSelected, changeArticleStatus } = tableCardStore;

    return (
      <div className='tableCardWrapper'>
        <table className='tableCard' cellPadding='0' cellSpacing='0'>
          <thead>
            <tr>
              <th className='tableCard-col'>
                {isManageOpen && (
                  <>
                    <input
                      id='tableCard-row-all'
                      className='tableCard-checkbox'
                      type='checkbox'
                      checked={allSelected}
                      onChange={(e) => setAllSelected(e)}
                    />
                    <label htmlFor='tableCard-row-all'></label>
                  </>
                )}
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
                  {isManageOpen ? (
                    <>
                      <input
                        id={row.id}
                        className='tableCard-checkbox'
                        type='checkbox'
                        checked={row.checked}
                        onChange={() => changeArticleStatus(row.id)}
                      />
                      <label htmlFor={row.id}></label>
                    </>
                  ) : (
                    <Icon
                      name='selected'
                      handleClick={() => changeArticleSelected(row.id, true)}
                    />
                  )}
                </td>
                <td className='tableCard-col align-left'>{row.title}</td>
                <td className='tableCard-col'>{row.author}</td>
                <td className='tableCard-col'>{row.date}</td>
                <td className='tableCard-col'>
                  <button
                    className='tableCard-edit'
                    onClick={() => this.handleEdit(row.id)}
                  >
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
                colSpan='5'
              >
                <Icon name='left' />
                <span>Page order: 1</span>
                <Icon name='right' />
              </td>
            </tr>
          </tfoot>
        </table>
        <DetailsModal />
      </div>
    );
  }

  handleEdit(articleId) {
    const { changeDetailsModalStatus, changeCurrentArticleId } = pageStore;
    changeCurrentArticleId(articleId);
    changeDetailsModalStatus(true);
  }
}

export default TableCard;
