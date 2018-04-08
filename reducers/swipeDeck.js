import {
    FETCH_SWIPE_DECK_REQUEST,
    FETCH_SWIPE_DECK_SUCCESS,
    GET_NEXT_SWIPE,
} from '../actions/swipeDeck';

function swipeDeck(state={
    isFetching: false,
    items: [],
    nextSwipe: undefined,
}, action) {
    switch(action.type) {
    case FETCH_SWIPE_DECK_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case FETCH_SWIPE_DECK_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.data.swipeDeck,
        });
    case GET_NEXT_SWIPE:
        return Object.assign({}, state, {
            items: state.items.slice(1),
            nextSwipe: state.items[0],
        });
    default:
        return state;
    }
}

export default swipeDeck;
