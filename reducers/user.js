import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../actions/auth';

function user(state = {
    isFetching: false,
}, action) {
    switch(action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            profile: action.user,
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
        });
    case LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            profile: undefined,
        });
    default:
        return state;
    }
}

export default user;
