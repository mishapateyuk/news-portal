import React from 'react';
import Loading from './Loading.react';
import { getArticleById } from '../models/articleModel.js';

export default class NewsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  };

  componentDidMount() {
    const id = this.props.routeParams.id;
    getArticleById(id).then(
      (article)=> this.setState(
        {
          loaded: true,
          article: article,
        }
      )
    );
  };

  render() {
  if (this.state.loaded) {
    return (
      <div className="newsWrapper">
        <p>
          <b>Title: </b>{this.state.article.title}
        </p>
        <p>
          <b>Author: </b>{this.state.article.author}
        </p>
        <p>
          <b>Date: </b>{this.state.article.title}
        </p>
        <p>
          <b>Tags: </b>{this.state.article.tags.join(', ')}
        </p>
        <p>
          <b>Description: </b>{this.state.article.fullText}
        </p>
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
