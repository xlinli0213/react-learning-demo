import * as constants from './constants';

const defaultState = {
  articleList: [],
  showArticleList: [],
  searchFilter: null,
  cid: 5,
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
    searchFilter: action.searchFilter,
    showArticleList: getShowArticleList(state.articleList, action.searchFilter),
  };
};

const incrementArticleCid = (state, action) => {
  return {
    ...state,
    cid: state.cid + 1,
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_ARTICLE_LIST:
      return changeArticleList(state, action);
    case constants.CHANGE_SEARCH_FILTER:
      return changeSearchFilter(state, action);
    case constants.INCREMENT_ARTICLE_CID:
      return incrementArticleCid(state, action);
    default:
      return state;
  }
};
