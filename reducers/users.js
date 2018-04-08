import {
    FETCH_SWIPE_DECK_REQUEST,
    FETCH_SWIPE_DECK_SUCCESS,
    GET_NEXT_SWIPE,
    USER_REQUEST,
    USER_SUCCESS,
} from '../actions/users';

function mapUserToId(users) {
    const map = {}
    users.map((user) => {
        map[user._id] = user;
    });
    return map;
}

function users(state={
    swipeDeck: [],
    usersById: {},
    isFetching: false
}, action) {
    switch(action.type) {
    case FETCH_SWIPE_DECK_REQUEST:
        return Object.assign({}, state, {
            isFetchingSwipeDeck: true,
        });
    case FETCH_SWIPE_DECK_SUCCESS:
        return Object.assign({}, state, {
            isFetchingSwipeDeck: false,
            swipeDeck: action.data.swipeDeck,
        });
    case GET_NEXT_SWIPE:
        console.log('get next swipe');
        console.log(state);
        let swipeDeck = state.swipeDeck.slice();
        let nextSwipe = swipeDeck.shift();
        return Object.assign({}, state, {
            nextSwipe: nextSwipe,
            swipeDeck: swipeDeck
        });
    case USER_REQUEST:
        return state
    case USER_SUCCESS:
        return Object.assign({}, state, {
            usersById: Object.assign({}, state.usersById, {
                [action.userId]: action.json,
            }),
        });
    default:
        return state
    }
}

export default users;
