import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            // check this section of code as i have changed this
            // what was happening was whenever i clicked like or unlike
            // from screamDialog comments were getting removed from new state
            // so here i set the new state as all the properties of old state
            // see **
            // and added new properties
            // see ##
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = {
                    ...state.scream,    // **
                    ...action.payload  // ##
                }
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            let index2 = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index2, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [
                        action.payload, ...state.scream.comments
                    ]
                }
            }
        default:
            return state
    }
}