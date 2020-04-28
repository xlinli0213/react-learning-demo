import { configure, observable, computed, action } from 'mobx';

configure({ enforceActions: 'always' });

class ArticleData {
  @observable detailsInfo = {};
  @observable currentDetailsInfo = {};

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
  changeDetailsInfo(detailsInfo) {
    this.detailsInfo = detailsInfo;
  }

  @action.bound
  changeCurrentDetailsInfo(currentDetailsInfo) {
    this.currentDetailsInfo = currentDetailsInfo;
  }
}

export default new ArticleData();
