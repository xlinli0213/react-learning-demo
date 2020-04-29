import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import Icon from '@components/icon';
import cartStore from './store';
import pageStore from '../../store';

@observer
class Cart extends Component {
  render() {
    const { selectedArticleList, changeArticleSelected } = pageStore;
    const { isCartDrawerShow, changeCartDrawerShow } = cartStore;
    return (
      <div
        className={`cartWrapper ${isCartDrawerShow ? 'active' : ''}`.trim()}
        onClick={(e) => changeCartDrawerShow(e, true)}
      >
        <div className='cart'>
          Cart <Icon name='cart' />
          <span className='cart-count'>{selectedArticleList.length}</span>
        </div>
        <div className='cartDrawer'>
          {!selectedArticleList.length ? (
            <p className='cartDrawer-row'>
              <Icon name='empty-cart' />
              You haven't selected an article yet. Go ahead and select it.
            </p>
          ) : (
            <ul className='cartDrawer-list'>
              {selectedArticleList.map((selectedArticle) => (
                <li className='cartDrawer-list-row' key={selectedArticle.id}>
                  <Icon
                    name='unselected'
                    handleClick={() =>
                      changeArticleSelected(selectedArticle.id, false)
                    }
                  />
                  <span className='omit'>
                    [{selectedArticle.author}] {selectedArticle.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Icon
            name='close'
            handleClick={(e) => changeCartDrawerShow(e, false)}
          />
        </div>
      </div>
    );
  }
}

export default Cart;
