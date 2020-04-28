import { observable, computed, action, configure } from 'mobx';
import pageStore from '../../store';

configure({ enforceActions: 'always' });

class ToolbarData {
  @observable currentSearchFilter = '';

  @computed get isDeleteActive() {
    return (
      pageStore.showArticleList.filter((article) => article.checked).length > 0
    );
  }

  @action.bound
  changeCurrentSearchFilter(currentSearchFilter) {
    this.currentSearchFilter = currentSearchFilter;
  }
}

export default new ToolbarData();
