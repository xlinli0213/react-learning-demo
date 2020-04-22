import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreator } from '../../store';
import './index.scss';
import Icon from '@components/icon';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.addArticle = this.addArticle.bind(this);
  }

  render() {
    const isDeleteActive =
      this.props.showArticleList.filter((article) => article.checked).length >
      0;

    return (
      <div className='toolbar'>
        <div className='toolbar-operation'>
          <Icon name='add' />
          <Icon name='delete' classes={isDeleteActive ? 'active' : ''} />
        </div>
        <div className='toolbar-search'>
          <input
            className='toolbar-search-input'
            type='text'
            placeholder='title/author'
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <Icon name='search' />
        </div>
      </div>
    );
  }

  componentDidMount() {
    document
      .querySelector('.icon-delete')
      .addEventListener('click', this.deleteArticle, false);
    document
      .querySelector('.icon-add')
      .addEventListener('click', this.addArticle, false);
    document
      .querySelector('.icon-search')
      .addEventListener(
        'click',
        () => this.props.changeSearchFilter(this.state.searchText),
        false
      );
  }

  componentWillUnmount() {
    document
      .querySelector('.icon-delete')
      .removeEventListener('click', this.deleteArticle, false);
    document
      .querySelector('.icon-add')
      .removeEventListener('click', this.addArticle, false);
    document
      .querySelector('.icon-search')
      .removeEventListener(
        'click',
        () => this.props.changeSearchFilter(this.state.searchText),
        false
      );
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value });
  }

  deleteArticle() {
    let newArticleList = this.props.articleList.slice();
    let shouldDeleteArticles = this.props.showArticleList
      .filter((article) => article.checked)
      .map((article) => article.id);
    newArticleList = newArticleList.filter(
      (article) => shouldDeleteArticles.indexOf(article.id) === -1
    );

    this.props.changeArticleList(newArticleList);
  }

  addArticle() {
    this.props.history.push(`/details/article-${this.props.cid}`);
  }
}

const mapState = (state) => ({
  articleList: state.home.articleList,
  showArticleList: state.home.showArticleList,
  cid: state.home.cid,
});

const mapDispatch = (dispatch) => ({
  changeArticleList(articleList) {
    dispatch(actionCreator.changeArticleList(articleList));
  },
  changeSearchFilter(searchFilter) {
    dispatch(actionCreator.changeSearchFilter(searchFilter));
  },
});

export default withRouter(connect(mapState, mapDispatch)(Toolbar));
