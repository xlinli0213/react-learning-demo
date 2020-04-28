import { observable, computed, action, runInAction, configure } from 'mobx';
import { getArticleList } from '@api';

configure({ enforceActions: 'always' });

class ArticleListData {
  @observable articleList = [];
  @observable searchFilter = '';
  @observable cid = 5;
  @observable currentArticleId = '';
  @observable isDetailsModalShow = false;

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

  @action.bound
  changeSearchFilter(searchFilter) {
    this.searchFilter = searchFilter;
  }

  @action.bound
  addArticle(article) {
    this.articleList.push(article);
    this.cid++;
  }

  @action.bound
  modifyArticle(articleIndex, article) {
    this.articleList[articleIndex] = article;
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
  changeDetailsModalStatus(isDetailsModalShow) {
    this.isDetailsModalShow = isDetailsModalShow;
  }

  @action.bound
  changeCurrentArticleId(articleId) {
    this.currentArticleId = articleId;
  }
}

export default new ArticleListData();
