import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'always' });

class CartData {
  @observable isCartDrawerShow = false;

  @action.bound
  changeCartDrawerShow(e, isCartDrawerShow) {
    e.stopPropagation();
    this.isCartDrawerShow = isCartDrawerShow;
  }
}

export default new CartData();
