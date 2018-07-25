import * as ACTIONS from './types'

export const getAllCategories = (categories) => {
    return {
        type: ACTIONS.GET_ALL_CATEGORIES,
        categories,
    }
}

export const getPostsByCategory = (posts) => {
    return {
        type: ACTIONS.GET_POSTS_BY_CATEGORY,
        posts,
    }
}

export const getAllPosts = (posts) => {
    return {
        type: ACTIONS.GET_ALL_POSTS,
        posts
    }
}

export const getSinglePost = (post) => {
    return {
        type: ACTIONS.GET_SINGLE_POST,
        post
    }
}

export const votePost = (post) => {
    return {
        type: ACTIONS.VOTE_POST,
        post
    }
}

export const createPost = (post) => {
    return {
        type: ACTIONS.CREATE_POST,
        post
    }
}

export const removePost = (post) => {
    return {
        type: ACTIONS.REMOVE_POST,
        post
    }
}

export const modifyPost = (post) => {
    return {
        type: ACTIONS.MODIFY_POST,
        post
    }
}

export const getAllComents = (comments) => {
    return {
        type: ACTIONS.GET_ALL_COMMENTS,
        comments
    }
}

export const voteComment = (comment) => {
    return {
        type: ACTIONS.VOTE_COMMENT,
        comment
    }
}

export const createComment = (comment) => {
    return {
        type: ACTIONS.CREATE_COMMENT,
        comment
    }
}

export const removeComment = (comment) => {
    return {
        type: ACTIONS.REMOVE_COMMENT,
        comment
    }
}

export const modifyComment = (comment) => {
    return {
        type: ACTIONS.MODIFY_COMMENT,
        comment
    }
}