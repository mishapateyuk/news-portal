import React from 'react';
import { Link } from 'react-router';

class NewsItem extends React.Component {

  showAdvancedProperties() {
    if (this.context.user !== 'Guest') {
      return (
        <div className="button-box">
          <Link to={`/edit/${this.props.news.id}`} className="edit-news">Edit<br />news</Link>
          <Link to={`/remove/${this.props.news.id}`} className="remove-news">Remove<br /> news</Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="news clearfix">
        <p className="news-title">
          <b>News title: </b>{this.props.news.title}
        </p>
        <p className="news-author">
          <b>Author: </b>{this.props.news.author}
        </p>
        <p className="news-publish-date">
          <b>Publish date: </b>{this.props.news.date}
        </p>
        <p className="news-description">
          <b>Description: </b>{this.props.news.description}
        </p>
        <p className="news-tags">
          <b>Tags: </b>{this.props.news.tags.join(', ')}
        </p>
        {this.showAdvancedProperties()}
        <Link to={`/detail/${this.props.news.id}`} className="news-btn">View<br /> full<br /> news</Link>
      </div>
    );
  };
};

NewsItem.contextTypes = {
  user: React.PropTypes.string
};

export default NewsItem;