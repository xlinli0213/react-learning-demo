import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';

@inject(({ store }) => ({ store: store.home }))
@observer
class Toolbar extends Component {
  render() {
    const {
      currentSearchFilter,
      changeSearchFilter,
      changeCurrentSearchFilter,
      isDeleteActive,
      deleteArticle,
    } = this.props.store;

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
    this.props.history.push(`/details/article-${this.props.store.cid}`);
  };
}

export default withRouter(Toolbar);
