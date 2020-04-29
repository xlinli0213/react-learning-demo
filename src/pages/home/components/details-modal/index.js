import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import './index.scss';
import Modal from '@components/modal';
import modalStore from './store';
import pageStore from '../../store';

@observer
class DetailsModal extends Component {
  constructor(props) {
    super(props);
    this.disposer = reaction(
      () => modalStore.detailsInfo,
      (detailsInfo) => modalStore.changeCurrentDetailsInfo(detailsInfo)
    );
  }

  render() {
    const { currentDetailsInfo, isUpdated } = modalStore;
    const { isDetailsModalShow } = pageStore;
    return (
      <Modal
        title='Edit information'
        isModalShow={isDetailsModalShow}
        isUpdated={isUpdated}
        handleConfirm={this.setArticle}
        handleCancel={this.reset}
      >
        {Object.keys(currentDetailsInfo).map((field) => (
          <div className='detailsCard-row' key={field}>
            <label htmlFor={field}>
              {field.slice(0, 1).toUpperCase() + field.slice(1)}
            </label>
            <br />
            <input
              className='detailsCard-row-content'
              id={field}
              type='text'
              value={currentDetailsInfo[field]}
              onChange={(e) => this.handleChange(e, field)}
            />
          </div>
        ))}
      </Modal>
    );
  }

  handleChange = (e, field) => {
    const { currentDetailsInfo, changeCurrentDetailsInfo } = modalStore;
    changeCurrentDetailsInfo({
      ...currentDetailsInfo,
      [field]: e.target.value,
    });
  };

  setArticle = () => {
    const {
      articleList,
      addArticle,
      modifyArticle,
      changeDetailsModalStatus,
    } = pageStore;
    const { currentDetailsInfo, isUpdated } = modalStore;
    if (isUpdated) {
      const articleIndex = articleList.findIndex(
        (article) => article.id === pageStore.currentArticleId
      );
      const getDate = () => {
        const date = new Date();
        const format = (number) => (number > 9 ? number : `0${number}`);
        return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
          date.getDate()
        )}`;
      };
      if (articleIndex !== -1) {
        modifyArticle(articleIndex, {
          ...articleList[articleIndex],
          ...currentDetailsInfo,
          date: getDate(),
        });
      } else {
        addArticle({
          ...currentDetailsInfo,
          id: pageStore.currentArticleId,
          date: getDate(),
          checked: false,
          selected: false,
        });
      }
      changeDetailsModalStatus(false);
    }
  };

  reset = () => {
    const { changeDetailsModalStatus } = pageStore;
    changeDetailsModalStatus(false);
  };

  componentWillUnmount() {
    this.disposer();
  }
}

export default DetailsModal;
