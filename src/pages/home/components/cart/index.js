import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reaction, when } from 'mobx';
import './index.scss';
import Icon from '@components/icon';
import cartStore from './store';
import pageStore from '../../store';

@observer
class Cart extends Component {
  constructor(props) {
    super(props);
    this.disposer = reaction(
      () => pageStore.selectedArticleList,
      (list) => (pageStore.cartListAnimation = Array(list.length).fill('show'))
    );
    when(
      () => pageStore.showArticleList.length,
      () =>
        (pageStore.cartListAnimation = Array(
          pageStore.showArticleList.length
        ).fill('show'))
    );
  }

  render() {
    const {
      selectedArticleList,
      changeArticleSelected,
      cartListAnimation,
    } = pageStore;
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
              {selectedArticleList.map((selectedArticle, index) => (
                <li
                  className={`cartDrawer-list-row ${cartListAnimation[index]}`}
                  key={selectedArticle.id}
                >
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

  componentDidMount() {
    const { changeListAnimation } = pageStore;

    setTimeout(
      () =>
        changeListAnimation({
          target: 'cartListAnimation',
          list: 'selectedArticleList',
          animationName: 'hidden',
          index: 0,
          interval: 0,
        }),
      0
    );
    setTimeout(
      () =>
        changeListAnimation({
          target: 'cartListAnimation',
          list: 'selectedArticleList',
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

export default Cart;
