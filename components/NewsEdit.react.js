import React from 'react';
import { browserHistory, withRouter, Link } from 'react-router';
import { getTags } from '../models/tagsModel.js';
import { addArticle, getArticleById, newId } from '../models/articleModel.js';
import Loading from './Loading.react';

class NewsEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this.createNews = this.createNews.bind(this);
    this.currentDate = (new Date()).toISOString().slice(0, -5).split('T').join(' ');
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

  createNews(e) {
    const tags = (Array.from(this.select.selectedOptions)).map((option) => option.value);
    const newsInfo = {
      title: this.titleInput.value,
      tags: tags,
      date: this.currentDate,
      description: this.shortDescription.value,
      fullText: this.fullDescription.value,
    }
    if (this.validateNewsData(newsInfo)) {
      newsInfo.id = newId();
      addArticle(newsInfo);
      this.props.router.push(`detail/${newsInfo.id}`);
    } else {
      this.showTooltips();
    }
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
      return (
        <div className="news-wrapper">
          <p className="input-wrapper">
            Title:
            <span>
              <input
                placeholder="title"
                ref={(input) => this.titleInput = input}
                maxLength="100"
                value = {this.state.news && this.state.news.title}
              />
            </span>
          </p>
          <p className="input-wrapper">
            Author: <input disabled value={this.context.user} />
          </p>
          <p className="input-wrapper">
            Publish date: <input disabled value={this.currentDate} />
          </p>
          <p className="input-wrapper">
            Tags: 
            <select placeholder="tags" multiple ref={(select) => this.select = select}>
              {getTags().map((tag, index) => <option key={index}>{tag}</option>)}
            </select>
          </p>
          <span>
            <textarea
              rows="10"
              cols="50"
              maxLength="200"
              placeholder="short description"
              ref={(textarea) => this.shortDescription = textarea}
            />
          </span>
          <br />
          <span>
            <textarea
              rows="10"
              cols="50"
              placeholder="full description"
              ref={(textarea) => this.fullDescription = textarea}
            />
          </span>
          <br />
          <button className="button add-news" onClick={this.createNews} type="submit"> Create news </button>
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
