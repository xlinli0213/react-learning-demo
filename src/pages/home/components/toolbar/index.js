import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';
import store from '../../store';

@observer
class Toolbar extends Component {
  render() {
    const {
      currentSearchFilter,
      changeSearchFilter,
      changeCurrentSearchFilter,
      isDeleteActive,
      deleteArticle,
    } = store;

    return (
      <div className='toolbar'>
        <div className='toolbar-operation'>
          <Icon name='add' handleClick={this.addArticle} />
          <Icon
            name='delete'
            handleClick={deleteArticle}
            classes={isDeleteActive ? 'active' : ''}
          />
        </div>
        <div className='toolbar-search'>
          <input
            className='toolbar-search-input'
            type='text'
            placeholder='title/author'
            value={currentSearchFilter}
            onChange={(e) => changeCurrentSearchFilter(e.target.value)}
          />
          <Icon
            name='search'
            handleClick={() => changeSearchFilter(currentSearchFilter)}
          />
        </div>
      </div>
    );
  }

  addArticle = () => {
    const { changeDetailsModalShow, changeCurrentArticleId, cid } = store;
    changeCurrentArticleId(`article-${cid}`);
    changeDetailsModalShow(true);
  };
}

export default withRouter(Toolbar);
