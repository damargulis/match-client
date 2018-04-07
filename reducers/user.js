import {
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
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
    case CREATE_ACCOUNT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            profile: action.user,
        });
    case CREATE_ACCOUNT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            profile: action.user,
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
        });
    case CREATE_ACCOUNT_FAILURE:
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
