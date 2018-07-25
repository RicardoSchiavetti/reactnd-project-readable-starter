import React, {Component} from 'react'
import * as actions from '../actions';
import * as api from '../api/api';
import {connect} from 'react-redux';

class FormPost extends Component {
    state = {
        categories: []
    }

    componentDidMount() {      

        this._getAllCategories();

        let comm = null;        
             comm = {
                id: Date.now(),
                timestamp: Date.now(),
                author : '',
                body: '',
                category: '',
                voteScore: 1,
                deleted: false,
                parentId: this.props.match.params.postId,
            }
        this.setState({post: comm})
    }

    _getAllCategories = () => {        
        api.getCategories().then((res) => {
            this.setState({categories:res.categories})      
        });
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
        const {post} = this.state;        
        api.insertPost(post).then(post => this.props.addPost(post));
        this.props.history.push(`/${this.state.post.category}/${this.state.post.id}`);
    }


    render(){
        const {categories} = this.state;
        return(           

                    <main className="mdl-layout__content">
                        <div className="mdl-layout__tab-panel is-active">
                            <div className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                                <div className= "section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">                        
                                    <select onChange={this.onCategoryChange}className="mdl-textfield__input">
                                        <option value='' selected disabled>Select Category...</option>
                                        {categories.map((category) =>(
                                        <option key={category.path} value={category.path}>{category.name}</option>
                                        ))}
                                    </select>


                                    <div className="mdl-textfield mdl-js-textfield">
                                        Author: <input onChange={this.onAuthorChange} className="mdl-textfield__input" type="text" id="sample1"/>
                                    </div>

                                    <div className="mdl-textfield mdl-js-textfield">
                                        Title: <input onChange={this.onTitleChange} className="mdl-textfield__input" type="text" id="sample1"/>
                                    </div>

                                    <div className="mdl-textfield mdl-js-textfield">
                                        Post: <input type="textarea" onChange={this.onBodyChange} className="mdl-textfield__input" rows= "3" id="sample5" ></input>
                                    </div>

                                    <div className="mdl-card__actions">
                                        <button className="mdl-button" onClick={() => this.onSave()}> Save </button>
                                    </div>                  
                                </div>
                            </div>
                        </div>
                    </main>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
      addPost: (data) => dispatch(actions.createPost(data)),
    }
  }

export default connect(null, mapDispatchToProps)(FormPost);