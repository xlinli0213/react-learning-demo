import service from './service';

export function requestOfPost(url, data) {
  return service.post(url, data);
}

export function requestOfGet(url, data) {
  return service.get(url, data);
}
