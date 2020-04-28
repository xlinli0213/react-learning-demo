import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';
import pageStore from '../../store';
import toolbarStore from './store';

@observer
class Toolbar extends Component {
  render() {
    const { changeSearchFilter, deleteArticle } = pageStore;
    const {
      isDeleteActive,
      currentSearchFilter,
      changeCurrentSearchFilter,
    } = toolbarStore;

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
    const { changeDetailsModalStatus, changeCurrentArticleId, cid } = pageStore;
    changeCurrentArticleId(`article-${cid}`);
    changeDetailsModalStatus(true);
  };
}

export default withRouter(Toolbar);
