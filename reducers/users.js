import {
    EDIT_INFO_FAILURE,
    EDIT_INFO_REQUEST,
    EDIT_INFO_SUCCESS,
    USER_REQUEST,
    USER_SUCCESS,
} from '../actions/users';

function users(state={
}, action) {
    switch(action.type) {
    case USER_REQUEST:
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: true,
            }),
        });
    case USER_SUCCESS:
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: false,
                ...action.json,
            }),
        });
    case EDIT_INFO_REQUEST:
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: true,
            }),
        });
    case EDIT_INFO_SUCCESS:
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: false,
                ...action.json,
            }),
        });
    case EDIT_INFO_FAILURE:
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: false,
            }),
        });
    default:
        return state;
    }
}

export default users;
