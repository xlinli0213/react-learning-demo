import { observable, computed, action, runInAction, configure } from 'mobx';
import { getArticleList } from '@api';

configure({ enforceActions: 'always' });

class ArticleListData {
  @observable articleList = [];
  @observable searchFilter = '';
  @observable cid = 5;
  @observable currentArticleId = '';
  @observable isDetailsModalShow = false;
  @observable isManageOpen = false;
  @observable tableListAnimation = [];
  @observable cartListAnimation = [];

  constructor() {
    getArticleList().then((res) => {
      runInAction(() => {
        this.articleList = res.data.data;
      });
    });
  }

  @computed get showArticleList() {
    // let showArticleList = this.articleList;
    let showArticleList = this.articleList.filter(
      (article) => !article.selected
    );
    if (!!this.searchFilter) {
      showArticleList = showArticleList.filter((article) => {
        const regExp = new RegExp(this.searchFilter, 'ig');
        return regExp.test(article.author) || regExp.test(article.title);
      });
    }
    return showArticleList;
  }

  @computed get selectedArticleList() {
    return this.articleList.filter((article) => article.selected);
  }

  @action.bound
  changeManageStatus() {
    this.isManageOpen = !this.isManageOpen;
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
  changeArticleSelected(articleId, flag) {
    if (flag) {
      const showIndex = this.showArticleList.findIndex(
        (article) => article.id === articleId
      );
      this.changeListAnimation({
        target: 'tableListAnimation',
        list: 'showArticleList',
        animationName: 'remove',
        index: showIndex,
        interval: 0,
      });
      this.changeListAnimation({
        target: 'tableListAnimation',
        list: 'showArticleList',
        animationName: 'list-remove',
        index: showIndex,
      });
    } else {
      const selectedIndex = this.selectedArticleList.findIndex(
        (article) => article.id === articleId
      );
      // console.log('remove', selectedIndex);
      this.changeListAnimation({
        target: 'cartListAnimation',
        list: 'selectedArticleList',
        animationName: 'remove',
        index: selectedIndex,
        interval: 0,
      });
      this.changeListAnimation({
        target: 'cartListAnimation',
        list: 'selectedArticleList',
        animationName: 'list-remove',
        index: selectedIndex,
      });
    }
    this.articleList.find(
      (article) => article.id === articleId && (article.selected = flag)
    );
    if (!flag) {
      const showIndex = this.showArticleList.findIndex(
        (article) => article.id === articleId
      );
      this.changeListAnimation({
        target: 'tableListAnimation',
        list: 'showArticleList',
        animationName: 'add',
        activeAnimationName: 'add-active',
        index: showIndex,
        interval: 0,
        reverse: true,
      });
      this.changeListAnimation({
        target: 'tableListAnimation',
        list: 'showArticleList',
        animationName: 'list-add',
        activeAnimationName: 'list-add-active',
        index: showIndex,
        reverse: true,
      });
    } else {
      const selectedIndex = this.selectedArticleList.findIndex(
        (article) => article.id === articleId
      );
      // console.log('add', selectedIndex);
      this.changeListAnimation({
        target: 'cartListAnimation',
        list: 'selectedArticleList',
        animationName: 'add',
        activeAnimationName: 'add-active',
        index: selectedIndex,
        interval: 0,
        reverse: true,
      });
      this.changeListAnimation({
        target: 'cartListAnimation',
        list: 'selectedArticleList',
        animationName: 'list-add',
        activeAnimationName: 'cart-list-add-active',
        index: selectedIndex,
        reverse: true,
      });
    }
  }

  @action.bound
  changeDetailsModalStatus(isDetailsModalShow) {
    this.isDetailsModalShow = isDetailsModalShow;
  }

  @action.bound
  changeCurrentArticleId(articleId) {
    this.currentArticleId = articleId;
  }

  @action.bound
  changeListAnimation({
    target,
    list,
    animationName,
    activeAnimationName,
    index,
    interval = 500,
    reverse = false,
  }) {
    let self = this;
    let listLength = this[target].length;
    for (let i = index, l = listLength; i < l; i++) {
      (function (i) {
        setTimeout(
          () =>
            runInAction(() => {
              i < listLength && (self[target][i] = animationName);
              activeAnimationName &&
                i === index &&
                (self[target][i] = activeAnimationName);
            }),
          (reverse ? self[list].length - i - 1 : i - index) * interval
        );
      })(i);
    }
  }
}

export default new ArticleListData();
