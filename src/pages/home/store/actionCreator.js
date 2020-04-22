import * as constants from './constants';
import axios from 'axios';

export const changeArticleList = (articleList) => ({
  type: constants.CHANGE_ARTICLE_LIST,
  articleList,
});

export const changeSearchFilter = (searchFilter) => ({
  type: constants.CHANGE_SEARCH_FILTER,
  searchFilter,
});

export const incrementArticleCid = () => ({
  type: constants.INCREMENT_ARTICLE_CID,
});

export const getArticleList = () => {
  return (dispatch) => {
    axios
      .get('/api/articleList.json')
      .then((res) => {
        const result = res.data.data;
        dispatch(changeArticleList(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
