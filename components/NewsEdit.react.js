import React from 'react';
import { Link } from 'react-router';
import { newId } from '../models/articleModel.js';
import { browserHistory } from 'react-router'


export default class NewsEdit extends React.Component {
  createNews() {
    alert(1);
  }
  render() {
    const id = newId();
    return (
      <div className="news-wrapper">
        <p className="input-wrapper">
          <span>ID:</span>
          <input id="news-id" disabled value={id} />
        </p>
        <p className="input-wrapper">
          <span>Title:</span>
          <input id="title" placeholder="title"/>
        </p>
        <p className="input-wrapper">
          <span>Author:</span>
          <input id="author" disabled value="author"/>
        </p>
        <p className="input-wrapper">
          <span>Publish date:</span>
          <input id="publish-date" disabled value={(new Date()).toISOString().slice(0, -5).split('T').join(' ')}/>
        </p>
        <p className="input-wrapper">
          <span>Tags:</span>
          <input id="tags" placeholder="tags"/>
        </p>
        <textarea id="s-descriton" rows="10" cols="50" maxLength="200" placeholder="short description"></textarea>
        <textarea id="description" rows="10" cols="50" placeholder="full description"></textarea>
        <button className="button add-news" onClick={this.createNews}> Create news </button>
      </div>
    )
  }
}
