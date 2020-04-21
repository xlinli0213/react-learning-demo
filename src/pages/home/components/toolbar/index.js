import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  render() {
    const isDeleteActive =
      this.props.articleList.filter((article) => article.checked).length > 0;

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
    newArticleList = newArticleList.filter((article) => !article.checked);
    this.props.changeArticleList(newArticleList);
  }
}

const mapState = (state) => ({
  articleList: state.home.showArticleList,
});

const mapDispatch = (dispatch) => ({
  changeArticleList(articleList) {
    dispatch(actionCreator.changeArticleList(articleList));
  },
  changeSearchFilter(searchFilter) {
    dispatch(actionCreator.changeSearchFilter(searchFilter));
  },
});

export default connect(mapState, mapDispatch)(Toolbar);
