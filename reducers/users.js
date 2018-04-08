import {
    FETCH_SWIPE_DECK_REQUEST,
    FETCH_SWIPE_DECK_SUCCESS,
    GET_NEXT_SWIPE,
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
        console.log('user success');
        console.log(state, action);
        return Object.assign({}, state, {
            [action.userId]: Object.assign({}, state[action.userId], {
                isFetching: false,
                ...action.json
            }),
        });
    default:
        return state;
    }
}

export default users;
