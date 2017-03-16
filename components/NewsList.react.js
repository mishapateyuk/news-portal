import React from 'react';
import NewsItem from './NewsItem.react';
import Loading from './Loading.react';
import { getArticles } from '../models/articleModel.js';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.sortArticles = this.sortArticles.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTag = this.sortByTag.bind(this);
    this.sortByAuthor = this.sortByAuthor.bind(this);
  };

  componentDidMount() {
    getArticles().then(
      (articles) => this.setState(
        {
          loaded: true,
          articles: articles,
        }
      )
    );
  };

  sortByAuthor(article, author) {
    if (!author) {
      return true;
    }
    return article.author == author ? true : false;
  };

  sortByDate(article, date) {
    if (!date) {
      return true;
    }
    return article.date.indexOf(date) !== -1 ? true : false;
  };

  sortByTag(article, tag) {
    if (!tag.length) {
      return true;
    }
    return article.tags.indexOf(tag) !== -1 ? true : false;
  };

  sortArticles() {
    this.sortedArticles = this.state.articles.filter((article) => {
      return this.sortByDate(article, this.context.sortSettings.date) &&
        this.sortByAuthor(article, this.context.sortSettings.author) &&
        this.sortByTag(article, this.context.sortSettings.tags)
    });
  };

  render() {
    if (this.state.loaded) {
      this.sortArticles();
      return (
        <div className="news-wrapper clearfix">
          <div className="buttons-wrapper">
            <span className="button add-news">
              Filters
            </span>
          </div>
          {this.sortedArticles.map((news) => <NewsItem news={news} key={news.id}/>)}
        </div>
      );
    } else {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    }
  };
};

NewsList.contextTypes = {
  sortSettings: React.PropTypes.object
};
