import React from 'react';
import { deleteArticle } from '../models/articleModel.js';
import { withRouter } from 'react-router';

function RemoveNews(props) {
  function remove() {
    deleteArticle(+props.routeParams.id);
    props.router.push('/');
  };
  return (
    <div>
      Do you really wanna delete this news ?
      <button onClick={remove} className="button"> DELETE</button>
    </div>
  );
};

export default withRouter(RemoveNews);
