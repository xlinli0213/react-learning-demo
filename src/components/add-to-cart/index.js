import React, { PureComponent } from 'react';
import './index.scss';

class AddToCart extends PureComponent {
  render() {
    this.showAddToCartAnimation();
    return (
      <div id='points'>
        {Array(5)
          .fill('')
          .map((status, index) => (
            <div key={`ponint-${index}`} className='point-outer inactive'>
              <div className='point-inner'></div>
            </div>
          ))}
      </div>
    );
  }

  showAddToCartAnimation = () => {
    if (!this.props.point) return;
    const getPosition = (dom) => dom && dom.getBoundingClientRect();
    const cartDom = document.querySelector(this.props.cart);
    const pointOuter = document.querySelector('.point-outer.inactive');
    if (!pointOuter) return;
    const pointInner = pointOuter.querySelector('.point-inner');
    const { x: left, y: top } = getPosition(this.props.point);
    const { x: endLeft, y: endTop } = getPosition(cartDom);
    pointOuter.className = pointOuter.className
      .split(' ')
      .filter((name) => name !== 'inactive')
      .join(' ');
    pointOuter.style.left = left + 'px';
    pointOuter.style.top = top + 'px';
    const { offsetWidth: cartWidth, offsetHeight: cartHeight } = cartDom;
    const { offsetWidth: pointWidth, offsetHeight: pointHeight } = pointOuter;
    setTimeout(function () {
      const transformLeft = endLeft - left + (cartWidth - pointWidth) / 2;
      const transformTop = endTop - top - (cartHeight - pointHeight) / 2;
      pointOuter.style.transform = 'translate3d(0,' + transformTop + 'px,0)';
      pointInner.style.transform = 'translate3d(' + transformLeft + 'px,0,0)';
      setTimeout(function () {
        pointOuter.className = pointOuter.className + ' inactive';
        pointOuter.style = {};
        pointInner.style = {};
      }, 500);
    }, 0);
  };
}

export default AddToCart;
