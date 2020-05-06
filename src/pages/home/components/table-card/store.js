import { observable, computed, action, configure } from 'mobx';
import pageStore from '../../store';

configure({ enforceActions: 'always' });

class TableCardData {
  @observable pointOfAddToCart = null;

  @computed get allSelected() {
    return (
      pageStore.showArticleList.length &&
      pageStore.showArticleList.every((article) => article.checked)
    );
  }

  @action.bound
  changeArticleStatus(articleId) {
    pageStore.showArticleList.find(
      (article) =>
        article.id === articleId && (article.checked = !article.checked)
    );
  }

  @action.bound
  setAllSelected(event) {
    pageStore.showArticleList.forEach(
      (showArticle) => (showArticle.checked = event.target.checked)
    );
  }

  @action.bound
  handleArticleSelected(articleId, flag, event) {
    this.pointOfAddToCart = event.currentTarget;
    pageStore.changeArticleSelected(articleId, flag);
  }
}

export default new TableCardData();
