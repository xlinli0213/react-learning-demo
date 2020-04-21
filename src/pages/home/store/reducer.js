import * as constants from './constants';

const defaultState = {
  articleList: [],
  showArticleList: [],
  searchFilter: null,
};

const getShowArticleList = (articleList, searchFilter) => {
  let showArticleList = articleList.slice();
  if (!!searchFilter) {
    showArticleList = showArticleList.filter((article) => {
      const regExp = new RegExp(searchFilter, 'ig');
      return regExp.test(article.author) || regExp.test(article.title);
    });
  }
  return showArticleList;
};

const changeArticleList = (state, action) => {
  return {
    ...state,
    articleList: action.articleList,
    showArticleList: getShowArticleList(action.articleList, state.searchFilter),
  };
};

const changeSearchFilter = (state, action) => {
  return {
    ...state,
    showArticleList: getShowArticleList(state.articleList, action.searchFilter),
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_ARTICLE_LIST:
      return changeArticleList(state, action);
    case constants.CHANGE_SEARCH_FILTER:
      return changeSearchFilter(state, action);
    default:
      return state;
  }
};
