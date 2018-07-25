import React from 'react';
import Header from '../components/Header';
import ListPosts from './ListPosts';

const PostsByCategory = props => {  
  return (
        <div className="mdl-layout__container has-scrolling-header">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-tabs is-upgraded">
            <Header/>
            <ListPosts category={props.match.params.category}/>
          </div>
        </div>
    )
}

export default PostsByCategory;
