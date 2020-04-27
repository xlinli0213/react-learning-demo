import { requestOfGet, url } from '../request';

export function getArticleList(params) {
  return requestOfGet(url.getArticleList, params);
}
