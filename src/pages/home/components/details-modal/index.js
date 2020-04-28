import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import './index.scss';
import Modal from '@components/modal';
import detailsStore from './store';
import homeStore from '../../store';

@observer
class DetailsModal extends Component {
  constructor(props) {
    super(props);
    this.disposer = reaction(
      () => homeStore.isDetailsModalShow,
      (isDetailsModalShow) => {
        if (isDetailsModalShow) {
          this.getDetailsInfo();
        }
      }
    );
  }

  render() {
    const { currentDetailsInfo, isUpdated } = detailsStore;
    const { isDetailsModalShow } = homeStore;
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

  getDetailsInfo = () => {
    const detailsInfo = {
      author: '',
      title: '',
      content: '',
    };
    homeStore.articleList.find((article) => {
      return (
        article.id === homeStore.currentArticleId &&
        Object.keys(detailsInfo).forEach(
          (field) => (detailsInfo[field] = article[field])
        )
      );
    });
    const { changeDetailsInfo, changeCurrentDetailsInfo } = detailsStore;
    changeDetailsInfo(detailsInfo);
    changeCurrentDetailsInfo(detailsInfo);
  };

  handleChange = (e, field) => {
    const { currentDetailsInfo, changeCurrentDetailsInfo } = detailsStore;
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
      changeDetailsModalShow,
    } = homeStore;
    const { currentDetailsInfo, isUpdated, changeDetailsInfo } = detailsStore;
    if (isUpdated) {
      const articleIndex = articleList.findIndex(
        (article) => article.id === homeStore.currentArticleId
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
          id: homeStore.currentArticleId,
          date: getDate(),
          checked: false,
        });
      }
      changeDetailsInfo(currentDetailsInfo);
      changeDetailsModalShow(false);
    }
  };

  reset = () => {
    const { changeDetailsModalShow } = homeStore;
    changeDetailsModalShow(false);
  };

  componentWillUnmount() {
    this.disposer();
  }
}

export default DetailsModal;
