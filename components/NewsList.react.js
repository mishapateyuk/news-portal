import React from 'react';
import NewsItem from './NewsItem.react';
import Loading from './Loading.react';
import { getArticles } from '../models/articleModel.js';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
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

  render() {
    if (this.state.loaded) {
      return (
        <div className="news-wrapper clearfix">
          {this.state.articles.map((news) => <NewsItem news={news} key={news.id}/>)}
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
