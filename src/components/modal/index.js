import React, { Component } from 'react';
import './index.scss';
import Icon from '@components/icon';

class Modal extends Component {
  render() {
    const {
      title,
      isModalShow,
      isUpdated,
      handleConfirm,
      handleCancel,
    } = this.props;
    return (
      <div className={`modalWrapper ${isModalShow ? 'active' : ''}`.trim()}>
        <div className='modal'>
          <header className='modal-header'>
            <h3 className='modal-header-title'>{title}</h3>
            <Icon name='close' handleClick={handleCancel} />
          </header>
          <main className='modal-content'>{this.props.children}</main>
          <footer className='modal-footer align-right'>
            <button
              className={`confirm${isUpdated ? ' active' : ''}`}
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button className='cancel' onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;
