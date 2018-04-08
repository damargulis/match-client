export const FETCH_SWIPE_DECK_REQUEST = 'FETCH_SWIPE_DECK_REQUEST';
export const FETCH_SWIPE_DECK_SUCCESS = 'FETCH_SWIPE_DECK_SUCCESS';
export const GET_NEXT_SWIPE = 'GET_NEXT_SWIPE';
export const SWIPE_REQUEST = 'SWIPE_REQUEST';

const GLOBAL = require('./../Globals');

function requestSwipeDeck(query) {
    return { type: FETCH_SWIPE_DECK_REQUEST, query };
}

function requestSwipe(query) {
    return { type: SWIPE_REQUEST, query };
}

function requestSwipeDeckSuccess(query, data) {
    return {
        type: FETCH_SWIPE_DECK_SUCCESS,
        query,
        data,
    };
}

function fetchSwipeDeck(query) {
    return function (dispatch) {
        dispatch(requestSwipeDeck(query));
        return fetch(GLOBAL.BASE_URL + '/swipe/possibleMatches/' + query.userId)
        .then((response) => response.json())
        .then((data) => {
            return dispatch(requestSwipeDeckSuccess(query, data));
        });
    };
}

export function sendSwipe(query) {
    return function (dispatch) {
        dispatch(requestSwipe(query));
        return fetch(GLOBAL.BASE_URL + '/swipe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: query.userId,
                swipeId: query.swipeId,
                liked: query.liked,
            }),
        });
    };
}

function shouldFetchSwipeDeck(state) {
    if(state.swipeDeck.isFetching) {
        return false;
    } else {
        return !state.swipeDeck.items.length;
    }
}

export function fetchSwipeDeckIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldFetchSwipeDeck(getState(), query)){
            return dispatch(fetchSwipeDeck(query));
        } else {
            return Promise.resolve();
        }
    };
}

function canGetSwipe(state) {
    return state.swipeDeck.items.length;
}

export function getNextSwipe() {
    return (dispatch, getState) => {
        if(canGetSwipe(getState())) {
            return dispatch({ type: GET_NEXT_SWIPE });
        }
    };
}

