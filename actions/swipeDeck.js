export const FETCH_SWIPE_DECK_REQUEST = 'FETCH_SWIPE_DECK_REQUEST';
export const FETCH_SWIPE_DECK_SUCCESS = 'FETCH_SWIPE_DECK_SUCCESS';
export const GET_NEXT_SWIPE = 'GET_NEXT_SWIPE';

import { loadUserById } from './users';

const GLOBAL = require('./../Globals');

function requestSwipeDeck(query) {
    return { type: FETCH_SWIPE_DECK_REQUEST, query };
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
            console.log('here2');
            dispatch(requestSwipeDeckSuccess(query, data));
            console.log('here3');
            console.log(data.swipeDeck);
            data.swipeDeck.map((userId) => {
                dispatch(loadUserById(userId));
            });
            console.log('here4');
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
    console.log('canGetSwipe');
    console.log(state);
    return state.swipeDeck.items.length;
}

export function getNextSwipe() {
    return (dispatch, getState) => {
        console.log('getNextSwipe');
        if(canGetSwipe(getState())) {
            console.log('dispatching');
            return dispatch({ type: GET_NEXT_SWIPE });
        }
    };
}

