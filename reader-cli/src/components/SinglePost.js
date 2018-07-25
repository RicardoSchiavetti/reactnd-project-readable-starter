import React from 'react';
import Header from '../components/Header';
import Post from '../components/Post';

const SinglePost = props => { 
    
    return (
        <div className="mdl-layout__container has-scrolling-header">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-tabs is-upgraded">
            <Header/>
            <Post postId={props.match.params.postId} 
                  isEditing={props.location.isEditing ? props.location.isEditing:false}
                  history={props.history}
                  />
          </div>      
        </div>        
    )
}

export default SinglePost;