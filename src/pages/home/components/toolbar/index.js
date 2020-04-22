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
  }

  render() {
    const { showArticleList, changeSearchFilter } = this.props;
    const isDeleteActive =
      showArticleList.filter((article) => article.checked).length > 0;

    return (
      <div className='toolbar'>
        <div className='toolbar-operation'>
          <Icon name='add' handleClick={this.addArticle} />
          <Icon
            name='delete'
            handleClick={this.deleteArticle}
            classes={isDeleteActive ? 'active' : ''}
          />
        </div>
        <div className='toolbar-search'>
          <input
            className='toolbar-search-input'
            type='text'
            placeholder='title/author'
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <Icon
            name='search'
            handleClick={() => changeSearchFilter(this.state.searchText)}
          />
        </div>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  deleteArticle = () => {
    let newArticleList = this.props.articleList.slice();
    newArticleList = newArticleList.filter((article) => !article.checked);

    this.props.changeArticleList(newArticleList);
  };

  addArticle = () => {
    this.props.history.push(`/details/article-${this.props.cid}`);
  };
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
