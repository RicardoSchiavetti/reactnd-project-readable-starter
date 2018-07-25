import React, { Component } from 'react';
import * as api from '../api/api';
import moment from 'moment';
import ListComments from '../components/ListComments';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Post extends Component {

    state = {
        isEditing : false,        
        categories:[]
    }    

    componentDidMount = () => {        
        this.props.postId && this._getPostById();
    }

    _getAllCategories = () => {        
        api.getCategories().then((res) => {
            this.setState({categories:res.categories})      
        });
    }

    _getPostById = () => {        
        api.getPostById(this.props.postId)
            .then((post) => {
                this.setState({post})
        })
    }

    onEditPost = () => {
        this.setState({isEditing:true});
        this._getAllCategories();
    }

    onAuthorChange = (event) => {
        const author = event.target.value
        const { post } = this.state
        this.setState({
            post: {
                ...post,
                author
            }
        })
    }

    onCategoryChange = (event) => {
        const category = event.target.value
        const { post } = this.state
        this.setState({
            post: {
                ...post,
                category
            }
        })
    }

    onTitleChange = (event) => {
        const title = event.target.value
        const { post } = this.state
        this.setState({
            post: {
                ...post,
                title
            }
        })
    }

    onBodyChange = (event) => {
        const body = event.target.value
        const { post } = this.state
        this.setState({
            post: {
                ...post,
                body
            }
        })
    }

    onSave = () => {        
        const {post, isEditing} = this.state;
        if(isEditing){            
            api.updatePost(post).then(res => this.props.updatePost(res));
            this.setState([{...this.state, isEditing:false}]);
        }
        
    }

    render() {    
        
        const spanButtonNewStyle = {
            width:  '160.392px',
            height: '160.392px',
            transform: ' translate(-50%, -50%) translate(28px, 25px)'
        }

        const {post, isEditing, categories} = this.state;
        
        return(
            <main className="mdl-layout__content">                
                <div className="mdl-layout__tab-panel is-active">
                    {post && 
                        <form>
                            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">                        
                                <div className="mdl-card mdl-cell mdl-cell--12-col">
                                    <div className="mdl-card__supporting-text">
                                        {!isEditing &&
                                            <div>
                                                <h3>{post.title}</h3> 
                                                <h6>Category: {post.category}  <br/><p/>  Comments: {post.commentCount}  <br/><p/>  Date: {moment(post.timestamp).format('LL')}  <br/><p/>  Votes: {post.voteScore} <br/><p/> Author: {post.author}</h6>
                                                <p>{post.body}</p>
                                                <div className="mdl-card__actions">
                                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" 
                                                            onClick={() => this.onEditPost()}> Edit </button>
                                                </div>
                                            </div>                                            
                                        }

                                        {isEditing &&
                                            <div>
                                                
                                                <select onChange={this.onCategoryChange}className="mdl-textfield__input" value={this.state.post? this.state.post.category: ''}>
                                                    <option value='' disabled>Select Category...</option>
                                                    {categories.map((category) =>(
                                                    <option key={category.path} value={category.path}>{category.name}</option>
                                                    ))}
                                                </select>


                                                <div className="mdl-textfield mdl-js-textfield">
                                                    Author: <input defaultValue={this.state.post && this.state.post.author } onChange={this.onAuthorChange} className="mdl-textfield__input" type="text" id="sample1"/>
                                                </div>

                                                <div className="mdl-textfield mdl-js-textfield">
                                                    Title: <input defaultValue={this.state.post && this.state.post.title } onChange={this.onTitleChange} className="mdl-textfield__input" type="text" id="sample1"/>
                                                </div>

                                                <div className="mdl-textfield mdl-js-textfield">
                                                    Post: <input defaultValue={this.state.post && this.state.post.body } type="textarea" onChange={this.onBodyChange} className="mdl-textfield__input" rows= "3" id="sample5" ></input>
                                                </div>

                                                <div className="mdl-card__actions">
                                                    <button className="mdl-button" onClick={() => this.onSave()}> Save </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>                                                    
                            </section>
                        </form>
                    }
                   
                    {post && !isEditing &&    
                    <Link to={`/post/${post.id}/comment`} 
                            
                        className="mdl-button  mdl-button--colored mdl-shadow--4dp mdl-color--accent" 
                        id="add" 
                        data-upgraded=",MaterialButton,MaterialRipple">
                            <i className="material-icons" role="presentation">border_color</i>
                            <span className="visuallyhidden">border_color</span>
                                <span className="mdl-button__ripple-container">
                                    <span className="mdl-ripple is-animating" style={spanButtonNewStyle}></span> 
                                </span> 
                            Comment
                    </Link> 
                    }
                </div>
                <div>
                    {post && !isEditing && post.commentCount > 0 &&
                        <ListComments postId={post.id}/>
                    }
                </div>                
            </main>            
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      updatePost: (data) => dispatch(actions.modifyPost(data)),
    }
  }

export default connect(null, mapDispatchToProps)(Post);