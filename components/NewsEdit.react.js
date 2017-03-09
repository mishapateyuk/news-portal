import React from 'react';
import { browserHistory, withRouter, Link } from 'react-router';
import { getTags } from '../models/tagsModel.js';
import { addArticle, getArticleById, newId } from '../models/articleModel.js';

class NewsEdit extends React.Component {
  constructor() {
    super();
    this.createNews = this.createNews.bind(this);
    this.currentDate = (new Date()).toISOString().slice(0, -5).split('T').join(' ');
  }

  createNews(e) {
    const tags = (Array.from(this.select.selectedOptions)).map((option) => option.value);
    const newsInfo = {
      id: newId(),
      title: this.titleInput.value,
      author: "author",
      tags: tags,
      date: this.currentDate,
      description: this.shortDescription.value,
      fullText: this.fullDescription.value,
    }
    addArticle(newsInfo);
    this.props.router.push(`detail/${newsInfo.id}`);
  }

  render() {
    return (
      <div className="news-wrapper">
        <p className="input-wrapper">
          <span>Title:</span>
          <input placeholder="title" ref={(input) => this.titleInput = input} />
        </p>
        <p className="input-wrapper">
          <span>Author:</span>
          <input disabled value="author" />
        </p>
        <p className="input-wrapper">
          <span>Publish date:</span>
          <input disabled value={this.currentDate} />
        </p>
        <p className="input-wrapper">
          <span>Tags:</span>
          <select placeholder="tags" multiple ref={(select) => this.select = select}>
            {getTags().map((tag, index) => <option key={index}>{tag}</option>)}
          </select>
        </p>
        <textarea
          rows="10"
          cols="50"
          maxLength="200"
          placeholder="short description"
          ref={(textarea) => this.shortDescription = textarea}
        />
        <textarea
          rows="10"
          cols="50"
          placeholder="full description"
          ref={(textarea) => this.fullDescription = textarea}
        />
        <button className="button add-news" onClick={this.createNews} type="submit"> Create news </button>
      </div>
    )
  }
}

export default withRouter(NewsEdit);
