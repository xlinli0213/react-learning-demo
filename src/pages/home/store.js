import { observable, computed, action, runInAction, configure } from 'mobx';
import { getArticleList } from '@api';

configure({ enforceActions: 'always' });

export default class ArticleListData {
  @observable articleList = [];
  @observable searchFilter = '';
  @observable currentSearchFilter = '';
  @observable cid = 5;

  constructor() {
    getArticleList().then((res) => {
      runInAction(() => {
        this.articleList = res.data.data;
      });
    });
  }

  @computed get showArticleList() {
    let showArticleList = this.articleList;
    if (!!this.searchFilter) {
      showArticleList = showArticleList.filter((article) => {
        const regExp = new RegExp(this.searchFilter, 'ig');
        return regExp.test(article.author) || regExp.test(article.title);
      });
    }
    return showArticleList;
  }

  @computed get allSelected() {
    const selectArticles = this.showArticleList.filter(
      (article) => article.checked
    );
    return (
      selectArticles.length &&
      selectArticles.length === this.showArticleList.length
    );
  }

  @computed get isDeleteActive() {
    return this.showArticleList.filter((article) => article.checked).length > 0;
  }

  @action.bound
  changeSearchFilter(searchFilter) {
    this.searchFilter = searchFilter;
  }

  @action.bound
  changeCurrentSearchFilter(currentSearchFilter) {
    this.currentSearchFilter = currentSearchFilter;
  }

  @action.bound
  changeArticleStatus(articleId) {
    this.articleList.find(
      (article) =>
        article.id === articleId && (article.checked = !article.checked)
    );
  }

  @action.bound
  setAllSelected(event) {
    this.articleList.forEach(
      (article) =>
        this.showArticleList.findIndex(
          (showArticle) => article.id === showArticle.id
        ) !== -1 && (article.checked = event.target.checked)
    );
  }

  @action.bound
  deleteArticle() {
    this.articleList = this.articleList.filter(
      (article) =>
        !(
          article.checked &&
          this.showArticleList.findIndex(
            (showArticle) => article.id === showArticle.id
          ) !== -1
        )
    );
  }

  @action.bound
  addArticle(article) {
    this.articleList.push(article);
  }

  @action.bound
  modifyArticle(articleIndex, article) {
    this.articleList[articleIndex] = article;
  }
}
