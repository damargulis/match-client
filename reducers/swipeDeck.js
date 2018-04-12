import {
    FETCH_SWIPE_DECK_REQUEST,
    FETCH_SWIPE_DECK_SUCCESS,
    GET_NEXT_SWIPE,
    NEW_MATCH,
    SET_MATCH_SOCKET,
    SWIPE_REQUEST,
} from '../actions/swipeDeck';
import { Alert } from 'react-native';
import {
    LOGOUT,
} from '../actions/auth';

function swipeDeck(state={
    isFetching: false,
    items: [],
    nextSwipe: undefined,
}, action) {
    switch(action.type) {
    case LOGOUT:
        return {
            isFetching: false,
            items: [],
            nextSwipe: undefined,
        };
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
    case SWIPE_REQUEST:
        return Object.assign({}, state, {
            nextSwipe: undefined,
        });
    case SET_MATCH_SOCKET:
        return Object.assign({}, state, {
            matchSocket: action.socket,
        });
    case NEW_MATCH:
        Alert.alert(
            'You\'ve matched with ' + action.data.match.firstName + '!'
        );
        return state;
    default:
        return state;
    }
}

export default swipeDeck;
