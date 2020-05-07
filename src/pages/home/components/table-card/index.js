import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import './index.scss';
import Icon from '@components/icon';
import AddToCart from '@components/add-to-cart';
import DetailsModal from '../details-modal';
import pageStore from '../../store';
import tableCardStore from './store';
@observer
class TableCard extends Component {
  constructor(props) {
    super(props);
    this.disposer = reaction(
      () => pageStore.showArticleList,
      (list) => (pageStore.tableListAnimation = Array(list.length).fill('show'))
    );
  }

  render() {
    const { showArticleList, isManageOpen, tableListAnimation } = pageStore;
    const {
      allSelected,
      setAllSelected,
      pointOfAddToCart,
      changeArticleStatus,
      handleArticleSelected,
    } = tableCardStore;

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
            {showArticleList.map((row, index) => (
              <tr
                className={`tableCard-row ${tableListAnimation[index]}`}
                key={row.id}
              >
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
                      handleClick={(e) =>
                        handleArticleSelected(row.id, true, e)
                      }
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
        <AddToCart point={pointOfAddToCart} cart='.cartWrapper' />
      </div>
    );
  }

  handleEdit(articleId) {
    const { changeDetailsModalStatus, changeCurrentArticleId } = pageStore;
    changeCurrentArticleId(articleId);
    changeDetailsModalStatus(true);
  }

  componentDidMount() {
    const { changeListAnimation } = pageStore;

    setTimeout(
      () =>
        changeListAnimation({
          target: 'tableListAnimation',
          list: 'showArticleList',
          animationName: 'hidden',
          index: 0,
          interval: 0,
        }),
      0
    );
    setTimeout(
      () =>
        changeListAnimation({
          target: 'tableListAnimation',
          list: 'showArticleList',
          animationName: 'list-enter',
          index: 0,
        }),
      1
    );
  }

  componentWillUnmount() {
    this.disposer();
  }
}

export default TableCard;
