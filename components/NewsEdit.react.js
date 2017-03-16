import React from 'react';
import { browserHistory, withRouter, Link } from 'react-router';
import { getTags } from '../models/tagsModel.js';
import { addArticle, getArticleById, newId, editArticle } from '../models/articleModel.js';
import Loading from './Loading.react';
import Select from './Select.react';

class NewsEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this.getNewsInfo = this.getNewsInfo.bind(this);
    this.addNews = this.addNews.bind(this);
    this.editNews = this.editNews.bind(this);
    this.currentDate = (new Date()).toISOString().slice(0, -5).split('T').join(' ');
    this.onChangeTags = this.onChangeTags.bind(this);
  };

  validateNewsData(data) {
    const titleWithoutSpaces = data.title.replace(/\s/g, '');
    const shortDescriptionWithoutSpaces = data.description.replace(/\s/g, '');
    const descriptionWithoutSpaces = data.fullText.replace(/\s/g, '');
    if (
        data.title.length > 100 ||
        titleWithoutSpaces < 1 ||
        data.length > 5 ||
        shortDescriptionWithoutSpaces.length < 1 ||
        descriptionWithoutSpaces.length < 1
      ) {
      return false;
    }
    return true;
  };

  showTooltips() {
    this.titleInput.parentNode.classList.add('tooltip');
    this.shortDescription.parentNode.classList.add('tooltip');
    this.fullDescription.parentNode.classList.add('tooltip');
  };

  getNewsInfo() {
    const tags = this.state.tags.map((tag) => tag.value);
    const newsInfo = {
      title: this.titleInput.value,
      tags: tags,
      date: this.currentDate,
      description: this.shortDescription.value,
      fullText: this.fullDescription.value,
    };
    return newsInfo;
  };

  addNews() {
    const newsInfo = this.getNewsInfo();
    if (this.validateNewsData(newsInfo)) {
      newsInfo.id = newId();
      newsInfo.author = this.context.user;
      addArticle(newsInfo);
      this.props.router.push(`detail/${newsInfo.id}`);
    } else {
      this.showTooltips();
    }
  };

  editNews() {
    const newsInfo = this.getNewsInfo();
    const id = +this.props.routeParams.id;
    if (this.validateNewsData(newsInfo)) {
      editArticle(id ,newsInfo);
      this.props.router.push(`detail/${id}`);
    } else {
      this.showTooltips();
    }
  };

  onChangeTags(value) {
    this.setState({
      tags: value,
    });
  };

  createButton() {
    if (this.props.route.path !== '/add') {
      return (
        <button className="button add-news" onClick={this.editNews}>
          Edit news
        </button>
      );
    }
    return (
      <button className="button add-news" onClick={this.addNews}>
        Create news
      </button>
    );
  };

  componentDidMount() {
    if (this.props.routeParams.id) {
      const id = +this.props.routeParams.id;
      getArticleById(id).then((news) => {
        this.setState({
          loaded: true,
          news: news,
        });
      });
    }
  };

  render() {
    if (!this.props.routeParams.id || this.state.loaded) {
      const tagsOptions = getTags().map((tag) => {
        return {value: tag, label:tag};
      });
      return (
        <div className="news-wrapper">
          <p className="input-wrapper">
            Title:
            <span>
              <input
                placeholder="title"
                ref={(input) => this.titleInput = input}
                maxLength="100"
                defaultValue = {this.state.news && this.state.news.title}
              />
            </span>
          </p>
          <p className="input-wrapper">
            Author:
            <input
              disabled
              value={(this.state.news && this.state.news.author) || this.context.user}
            />
          </p>
          <p className="input-wrapper">
            Publish date: <input disabled value={this.currentDate} />
          </p>
            Tags: 
            <Select
              options={tagsOptions}
              multi
              className="modal-select"
              onChange={this.onChangeTags}
              value={this.state.tags}
            />
          <span>
            <textarea
              rows="10"
              cols="50"
              maxLength="200"
              placeholder="short description"
              ref={(textarea) => this.shortDescription = textarea}
              defaultValue = {this.state.news && this.state.news.description}
            />
          </span>
          <br />
          <span>
            <textarea
              rows="10"
              cols="50"
              placeholder="full description"
              ref={(textarea) => this.fullDescription = textarea}
              defaultValue = {this.state.news && this.state.news.fullText}
            />
          </span>
          <br />
          {this.createButton()}
        </div>
      );
    } else {
      return <Loading />
    }
  };
};

NewsEdit.contextTypes = {
  user: React.PropTypes.string
};

export default withRouter(NewsEdit);
