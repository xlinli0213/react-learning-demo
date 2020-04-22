import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from '@pages/home/store';
import './index.scss';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originDetailsInfo: {},
      detailsInfo: {},
      isUpdated: false,
    };
  }

  render() {
    return (
      <main className='detailsWrapper'>
        <h3>Edit rowrmation</h3>
        <div className='detailsCard'>
          {Object.keys(this.state.detailsInfo).map((field) => (
            <div className='detailsCard-row' key={field}>
              <label htmlFor={field}>
                {field.slice(0, 1).toUpperCase() + field.slice(1)}
              </label>
              <br />
              <input
                className='detailsCard-row-content'
                id={field}
                type='text'
                value={this.state.detailsInfo[field]}
                onChange={(e) => this.handleChange(e, field)}
              />
            </div>
          ))}
          <div className='detailsCard-operation align-right'>
            <button
              className={`confirm${this.state.isUpdated ? ' active' : ''}`}
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
    const originDetailsInfo =
      this.props.articleList.find(
        (article) => article.id === this.props.match.params.cid
      ) || {};
    this.setState({
      originDetailsInfo,
      detailsInfo: {
        author: originDetailsInfo.author || '',
        title: originDetailsInfo.title || '',
        content: originDetailsInfo.content || '',
      },
    });
  }

  handleChange = (e, field) => {
    const newDetailsInfo = Object.assign({}, this.state.detailsInfo);
    newDetailsInfo[field] = e.target.value;
    this.setState({ detailsInfo: newDetailsInfo }, () => {
      // check if the create button is active
      const detailsInfo = this.state.detailsInfo;
      const isUpdated =
        Object.keys(detailsInfo).every((field) => detailsInfo[field].trim()) &&
        Object.keys(detailsInfo).findIndex(
          (field) => detailsInfo[field] !== this.state.originDetailsInfo[field]
        ) !== -1;
      if (this.state.isUpdated !== isUpdated) {
        this.setState({ isUpdated });
      }
    });
  };

  setArticle = () => {
    if (this.state.isUpdated) {
      const articleIndex = this.props.articleList.findIndex(
        (article) => article.id === this.props.match.params.cid
      );
      const newArticleList = this.props.articleList.slice();
      const getDate = () => {
        const date = new Date();
        const format = (number) => (number > 9 ? number : `0${number}`);
        return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
          date.getDate()
        )}`;
      };
      if (articleIndex !== -1) {
        newArticleList[articleIndex] = {
          ...newArticleList[articleIndex],
          ...this.state.detailsInfo,
          date: getDate(),
        };
      } else {
        newArticleList.push({
          ...this.state.detailsInfo,
          id: this.props.match.params.cid,
          date: getDate(),
          checked: false,
        });
      }
      this.props.changeArticleList(newArticleList);
      this.setState({ isUpdated: false });
      this.props.history.push('/');
    }
  };
}

const mapState = (state) => ({
  articleList: state.home.articleList,
});

const mapDispatch = (dispatch) => ({
  changeArticleList(articleList) {
    dispatch(actionCreator.changeArticleList(articleList));
  },
  incrementArticleCid(cid) {
    dispatch(actionCreator.incrementArticleCid(cid));
  },
});

export default connect(mapState, mapDispatch)(Details);
