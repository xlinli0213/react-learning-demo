import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './index.scss';
import detailsStore from './store';
import homeStore from '@pages/home/store';
@observer
class Details extends Component {
  render() {
    const { currentDetailsInfo, isUpdated } = detailsStore;
    return (
      <main className='detailsWrapper'>
        <h3>Edit rowrmation</h3>
        <div className='detailsCard'>
          {Object.keys(currentDetailsInfo).map((field) => (
            <div className='detailsCard-row' key={field}>
              <label htmlFor={field}>
                {field.slice(0, 1).toUpperCase() + field.slice(1)}
              </label>
              <br />
              <input
                className='detailsCard-row-content'
                id={field}
                type='text'
                value={currentDetailsInfo[field]}
                onChange={(e) => this.handleChange(e, field)}
              />
            </div>
          ))}
          <div className='detailsCard-operation align-right'>
            <button
              className={`confirm${isUpdated ? ' active' : ''}`}
              onClick={this.setArticle}
            >
              Confirm
            </button>
            <Link to='/'>
              <button className='cancel'>Cancel</button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  componentDidMount() {
    const detailsInfo = {
      author: '',
      title: '',
      content: '',
    };
    homeStore.articleList.find(
      (article) =>
        article.id === this.props.match.params.cid &&
        Object.keys(detailsInfo).forEach(
          (field) => (detailsInfo[field] = article[field])
        )
    );
    const { changeDetailsInfo, changeCurrentDetailsInfo } = detailsStore;
    changeDetailsInfo(detailsInfo);
    changeCurrentDetailsInfo(detailsInfo);
  }

  handleChange = (e, field) => {
    const { currentDetailsInfo, changeCurrentDetailsInfo } = detailsStore;
    changeCurrentDetailsInfo({
      ...currentDetailsInfo,
      [field]: e.target.value,
    });
  };

  setArticle = () => {
    const { articleList, addArticle, modifyArticle } = homeStore;
    const { currentDetailsInfo, isUpdated, changeDetailsInfo } = detailsStore;
    if (isUpdated) {
      const articleIndex = articleList.findIndex(
        (article) => article.id === this.props.match.params.cid
      );
      const getDate = () => {
        const date = new Date();
        const format = (number) => (number > 9 ? number : `0${number}`);
        return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
          date.getDate()
        )}`;
      };
      if (articleIndex !== -1) {
        modifyArticle(articleIndex, {
          ...articleList[articleIndex],
          ...currentDetailsInfo,
          date: getDate(),
        });
      } else {
        addArticle({
          ...currentDetailsInfo,
          id: this.props.match.params.cid,
          date: getDate(),
          checked: false,
        });
      }
      changeDetailsInfo(currentDetailsInfo);
      this.props.history.push('/');
    }
  };
}

export default Details;
