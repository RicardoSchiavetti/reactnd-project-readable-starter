import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import sortBy from 'sort-by'; 
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import * as api from '../api/api';

class ListPosts extends Component {
    state={
        category: this.props.category,
        postModalOpen: false,
        sortField : 'timestamp'
    }
        
    //Life-cicle methods
    componentDidMount = () => {
        this._getPosts();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.category !== this.props.category) {
          this._getPosts()
        }
      }

   //Private methods
    _limit(str,l) {
        if(str.lenght > l){
            var nova=``;
            for(let i=0;i<l;i++) {
                nova+=str.substr(i,1);
            }
            return nova;
        } else {
            return str;
        }        
    }
    
    _getPosts = () =>{
        if(!this.props.category) {
            api.getPosts().then((posts) => {
                this.props.getPosts(posts);
              })
        }else {
            api.getPostsByCategory(this.props.category)
                .then((posts) => {
                this.props.getPostsCategory(posts);
            })
        }        
    }

    onVotePost = (postId, vote) => {
        api.votePost(postId, vote).then(post =>{
            this.props.changeVote(post)
        })
    }

    onDeletePost = (id) => {
        api.deletePostById(id).then(post =>{
            this.props.excludePost(post)
        })
    }

    onChangeOrder = () => {
        if(this.state.sortField==='timestamp') {
            this.setState({sortField:'-timestamp'})
        }else{
            this.setState({sortField:'timestamp'})
        }
    }
    

    //Here the magic happenns
    render() {        
        const CHAR_LIMIT = 50;
        const { sortField } = this.state;
        const posts = this.props.posts.filter(post => !post.deleted).sort(sortBy( sortField ));

        const spanButtonNewStyle = {
            width:  '160.392px',
            height: '160.392px',
            transform: ' translate(-50%, -50%) translate(28px, 25px)'
        }

        const spanButtonOrderStyle = {
            width:  '160.392px',
            height: '160.392px',
            transform: ' translate(-50%, -50%) translate(28px, 25px)'
        }

        return(            
            <main className="mdl-layout__content">
                <Link className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" 
                        to="/new" id="add" data-upgraded=",MaterialButton,MaterialRipple">
                        <i className="material-icons" role="presentation">add</i>
                        <span className="visuallyhidden">Add</span>
                            <span className="mdl-button__ripple-container">
                                <span className="mdl-ripple is-animating" style={spanButtonNewStyle}></span>
                            </span>
                </Link>

                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" 
                            id="order" data-upgraded=",MaterialButton,MaterialRipple" onClick={() => this.onChangeOrder()}>
                        <i className="material-icons" role="presentation"> filter_list </i>
                        <span className="visuallyhidden"> filter_list </span>
                            <span className="mdl-button__ripple-container">
                                <span className="mdl-ripple is-animating" style={spanButtonOrderStyle}></span>
                            </span>
                </button>
                {posts && posts.map(post =>(

                    <div key={post.id} className="mdl-layout__tab-panel is-active">
                        <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                            <header className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
                                <i className="material-icons">notes</i>
                            </header>
                            <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                                <div className="mdl-card__supporting-text">
                                <div className="mdl-grid">
                                    <div className="mdl-cell mdl-cell--10-col">
                                        <h4>{post.title}</h4>
                                    </div>
                                    
                                    <div className="mdl-cell mdl-cell--2-col mdl-grid">
                                        <div className ="mdl-cell mdl-cell--6-col">
                                            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.onVotePost(post.id, true)}>
                                                <i className="material-icons">thumb_up_alt</i>
                                            </button>
                                        </div>
                                        <div className ="mdl-cell mdl-cell--6-col">
                                            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.onVotePost(post.id, false)}>
                                                <i className="material-icons">thumb_down_alt</i>
                                            </button>
                                        </div>                                    
                                    </div>
                                </div>                                 
                                    
                                <div className="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                                    <h5>Category: {post.category} <br/><p/>   Comments: {post.commentCount}  <br/><p/>  Date: {moment(post.timestamp).format('LL')}  <br/><p/>  Votes: {post.voteScore} <br/><p/> Author: {post.author}</h5>
                                    {this._limit(post.body, CHAR_LIMIT)}
                                </div>                                
                                </div>
                                <div className="mdl-card__actions">
                                        <Link className="mdl-button" key="toPost" to={`/${post.category}/${post.id}`}> Details </Link>
                                </div>
                                <div className="mdl-card__actions">
                                    <button className="mdl-button" onClick={() => this.onDeletePost(post.id)}> Delete </button>
                                </div>
                            </div>                                                    
                        </section>                        
                    </div>                    
                ))}                            
            </main>
                
        )
    }

}


//Special guests to make my life easier
const mapStateToProps = (state) => ({
    posts: state.posts || []
})

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts:(data) => dispatch(actions.getAllPosts(data)),
        getPostsCategory: (data) => dispatch(actions.getPostsByCategory(data)),
        changeVote:(data) => dispatch(actions.votePost(data)),
        excludePost:(data) => dispatch(actions.removePost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);