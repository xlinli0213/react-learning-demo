import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from '../../store';
import './index.scss';
import Icon from '@components/icon';

class TableCard extends Component {
  constructor(props) {
    super(props);
    this.setAllSelected = this.setAllSelected.bind(this);
    this.changeArticleStatus = this.changeArticleStatus.bind(this);
  }

  render() {
    const { articleList } = this.props;
    const selectArticles = articleList.filter((article) => article.checked);
    const allSelected =
      selectArticles.length && selectArticles.length === articleList.length;

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
                  onChange={(e) => this.setAllSelected(e)}
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
            {!articleList.length && (
              <tr>
                <td className='tableCard-col align-left' colSpan='5'>
                  No articles satisfying the conditions
                </td>
              </tr>
            )}
            {articleList.map((row) => (
              <tr className='tableCard-row' key={row.id}>
                <td className='tableCard-col'>
                  <input
                    id={row.id}
                    className='tableCard-checkbox'
                    type='checkbox'
                    checked={row.checked}
                    onChange={() => this.changeArticleStatus(row.id)}
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

  componentDidMount() {
    this.props.getArticleList();
  }

  changeArticleStatus(id) {
    const newArticleList = this.props.articleList.slice();
    newArticleList.find(
      (article) => article.id === id && (article.checked = !article.checked)
    );
    this.props.changeArticleList(newArticleList);
  }

  setAllSelected(e) {
    const newArticleList = this.props.articleList.slice();
    newArticleList.map((article) => (article.checked = e.target.checked));
    this.props.changeArticleList(newArticleList);
  }
}

const mapState = (state) => ({
  articleList: state.home.showArticleList,
});

const mapDispatch = (dispatch) => ({
  getArticleList() {
    dispatch(actionCreator.getArticleList());
  },
  changeArticleList(articleList) {
    dispatch(actionCreator.changeArticleList(articleList));
  },
});

export default connect(mapState, mapDispatch)(TableCard);
