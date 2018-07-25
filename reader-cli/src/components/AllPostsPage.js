import React from 'react';
import Header from '../components/Header';
import ListPosts from './ListPosts';

const AllPostsPage = () => {
  return (
        <div className="mdl-layout__container has-scrolling-header">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-tabs is-upgraded">
            <Header/>
            <ListPosts/>
          </div>      
        </div>        
  )
}

export default AllPostsPage;
