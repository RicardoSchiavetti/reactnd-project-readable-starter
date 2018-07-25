import React, {Component} from 'react'
import * as actions from '../actions';
import * as api from '../api/api';
import {connect} from 'react-redux';

class FormComment extends Component {

    state = {
        comment:''
    }

    componentDidMount() {
        this._getPost(this.props.match.params.postId);

        let comm = null;
        if(!this.props.match.params.commentId) {
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
              this.setState({comment: comm, isEditing: this.props.match.params.commentId ? true: false })         
        } else {
            api.getCommentById(this.props.match.params.commentId)
                .then(data => this.setState({comment: data, isEditing: this.props.match.params.commentId ? true: false }));
        }
    }

    _getPost = (postId) => {
        api.getPostById(postId).then(res => this.setState({...this.state, post: res}))

    }

    onAuthorChange = (event) => {
        const author = event.target.value
        const { comment } = this.state
        this.setState({
            comment: {
            ...comment,
            author
          }
        })
      }
    
      onBodyChange = (event) => {
        const body = event.target.value
        const { comment } = this.state
        this.setState({
            comment: {
            ...comment,
            body
          }
        })
      }

    onSave = () => {        
        const {comment, isEditing} = this.state;        
        isEditing && api.updateComment(comment).then(res => this.props.updateComment(res));
        !isEditing && api.insertComment(comment).then(comment => this.props.addComment(comment));
        this.props.history.push(`/${this.state.post.category}/${this.state.post.id}`);
    }


    render(){
        return(

            <main className="mdl-layout__content">
                <div className="mdl-layout__tab-panel is-active">
                    <div className= "section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">                        
                            <div className="mdl-textfield mdl-js-textfield">
                                Author: <input defaultValue={this.state.comment && this.state.comment.author } onChange={this.onAuthorChange} className="mdl-textfield__input" type="text" id="sample1"/>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield">
                                Comment: <input defaultValue={this.state.comment && this.state.comment.body } type="textarea" onChange={this.onBodyChange} className="mdl-textfield__input" rows= "3" id="sample5" ></input>
                            </div>

                            <div className="mdl-card__actions">
                                <button className="mdl-button" onClick={() => this.onSave()}> Save </button>
                            </div>                        
                    </div>
                </div>
            </main>    
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
      addComment: (data) => dispatch(actions.createComment(data)),
      updateComment: (data) => dispatch(actions.modifyComment(data)),
    }
  }

export default connect(null, mapDispatchToProps)(FormComment);