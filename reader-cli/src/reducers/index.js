import * as ACTIONS from '../actions/types'
import {
    combineReducers
} from 'redux'

function posts(state = [], action) {
    switch (action.type) {
        case ACTIONS.CREATE_POST:
            return [...state, action.post]

        case ACTIONS.GET_ALL_POSTS:
        case ACTIONS.GET_POSTS_BY_CATEGORY:
            return action.posts

        case ACTIONS.GET_SINGLE_POST:
            return action.post

        case ACTIONS.MODIFY_POST:
        case ACTIONS.REMOVE_POST:
        case ACTIONS.VOTE_POST:
            return state.map(post => {
                return post.id === action.post.id ? action.post : post //replace modified post
            })

        default:
            return state;
    }
}

function comments(state = [], action) {
    switch (action.type) {
        case ACTIONS.CREATE_COMMENT:
            return [...state, action.comment]
        case ACTIONS.GET_ALL_COMMENTS:
            return action.comments
        case ACTIONS.VOTE_COMMENT:
        case ACTIONS.REMOVE_COMMENT:
        case ACTIONS.MODIFY_COMMENT:
            return state.map(comment => {
                return comment.id === action.comment.id ? action.comment : comment //replace modified comment
            })
        default:
            return state;

    }
}

function categories(state = [], action) {
    switch (action.type) {
        case ACTIONS.GET_ALL_CATEGORIES:
            return action.categories.categories

        default:
            return state;
    }
}

export default combineReducers({
    posts,
    comments,
    categories
});