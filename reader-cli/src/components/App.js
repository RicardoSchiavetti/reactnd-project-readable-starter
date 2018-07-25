import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AllPostsPage from './AllPostsPage';
import PostsByCategory from './PostsByCategory';
import FormComment from './FormComment';
import SinglePost from './SinglePost';
import FormPost from './FormPost';

class App extends Component {

  render() {
    return (
      <div>
          <Route key='allPosts'  exact path='/' component={AllPostsPage} />
          <Route key='NewPost' path='/new' component={FormPost}/>          
          <Route key='PostByCategory'exact path='/:category' component={PostsByCategory} />
          <Route key='SinglePost' exact path='/:category/:postId' component={SinglePost} />
          <Route key='NewComment' exact path='/post/:postId/comment' component={FormComment}/>
          <Route key='EditComment' exact path='/post/:postId/comment/:commentId' component={FormComment}/>          

      </div>
    );
  }
}

export default App;

