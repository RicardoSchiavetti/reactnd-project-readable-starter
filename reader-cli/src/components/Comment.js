import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import * as api from '../api/api';

class Comment extends Component {

    onVoteComment = (commentId, vote) => {
        api.voteComment(commentId, vote).then(comment => {
            this.props.changeVote(comment)
        })
    }

    onDeleteComment = (id) => {
        api.deleteCommentById(id).then(comment => {
            this.props.deleteComment(comment)
        })
    }

    render() {
        const {id, author, body, timeStamp, voteScore, parentId} = this.props.data
        return(
            <div className= "section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">                            
                <h5>
                    <p>Author: {author}</p>
                    <br/>
                    <p>Date: {moment(timeStamp).format('LL')}</p>
                    <br/>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--4-col">
                            <p>Score: {voteScore}</p>
                        </div>
                        <div className="mdl-cell mdl-cell--4-col mdl-grid">
                                <div className ="mdl-cell mdl-cell--6-col">
                                    <button className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.onVoteComment(id, true)}>
                                        <i className="material-icons">thumb_up_alt</i>
                                    </button>
                                </div>
                                <div className ="mdl-cell mdl-cell--6-col">
                                    <button className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.onVoteComment(id, false)}>
                                        <i className="material-icons">thumb_down_alt</i>
                                    </button>
                                </div>
                        </div>
                    </div>                    
                </h5>                
                {body}
                <div className="mdl-card__actions">
                    <Link to={`/post/${parentId}/comment/${id}`} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" > Edit </Link>
                </div>
                <div className="mdl-card__actions">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={() => this.onDeleteComment(id)}> Delete </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            changeVote:(data) => dispatch(actions.voteComment(data)),
            deleteComment: (data) => dispatch(actions.removeComment(data))
        };
}

export default connect(null, mapDispatchToProps)(Comment);