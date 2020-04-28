import { configure, observable, computed, action } from 'mobx';
import pageStore from '../../store';

configure({ enforceActions: 'always' });

class ArticleData {
  @observable currentDetailsInfo = {};

  @computed get detailsInfo() {
    const detailsInfo = {
      author: '',
      title: '',
      content: '',
    };
    if (pageStore.isDetailsModalShow) {
      pageStore.articleList.find((article) => {
        return (
          article.id === pageStore.currentArticleId &&
          Object.keys(detailsInfo).forEach(
            (field) => (detailsInfo[field] = article[field])
          )
        );
      });
    }
    return detailsInfo;
  }

  @computed get isUpdated() {
    const checkedField = ['author', 'title', 'content'];
    return (
      checkedField.every((field) =>
        (this.currentDetailsInfo[field] || '').trim()
      ) &&
      checkedField.findIndex(
        (field) => this.currentDetailsInfo[field] !== this.detailsInfo[field]
      ) !== -1
    );
  }

  @action.bound
  changeCurrentDetailsInfo(currentDetailsInfo) {
    this.currentDetailsInfo = currentDetailsInfo;
  }
}

export default new ArticleData(pageStore);
