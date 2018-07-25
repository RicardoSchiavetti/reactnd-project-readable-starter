import React, { Component } from 'react';
import * as api from '../api/api';
import Comment from '../components/Comment';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ListComments extends Component {

    state = {
        postId : this.props.postId,        
    }

    componentDidMount() {
        this._getComments()
    }

    _getComments = () => {
        api.getPostComments(this.state.postId)
        .then(comments => {
            this.props.getComments(comments)
        })
    }

    render(){
        const comments = this.props.comments.filter(comment => !comment.deleted)
        return(
            <div className="mdl-layout__container">
              <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-tabs is-upgraded">
                <main className="mdl-layout__content">
                    <div className="mdl-layout__tab-panel is-active">                       
                        <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">                        
                            <div className="mdl-card mdl-cell mdl-cell--12-col">
                                <div className="mdl-card__supporting-text">
                                    <h3>Comments</h3>
                                    {comments.length > 0 && comments.map(element => 
                                        <div key={element.id}> <Comment data={element}/> <br/></div>
                                    )}
                                </div>
                            </div>
                        </section>                        
                    </div>
                </main>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments || []
})

const mapDispatchToProps = (dispatch) => {
    return {
        getComments:(data) => dispatch(actions.getAllComents(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComments);