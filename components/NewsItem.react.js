import React from 'react';
import { Link } from 'react-router';

export default function NewsItem(props) {
    return (
      <div className="news clearfix">
        <p className="news-title">
            <b>News title: </b>{props.news.title}
        </p>
        <p className="news-author">
            <b>Author: </b>{props.news.author}
        </p>
        <p className="news-publish-date">
            <b>Publish date: </b>{props.news.date}
        </p>
        <p className="news-description">
            <b>Description: </b>{props.news.description}
        </p>
        <p className="news-tags">
            <b>Tags: </b>{props.news.tags.join(', ')}
        </p>
        <Link to={`/detail/${props.id}`} className="news-btn"> View<br/> full<br/> news</Link>
      </div>
    )
}
