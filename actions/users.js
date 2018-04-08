export const FETCH_SWIPE_DECK_REQUEST = 'FETCH_SWIPE_DECK_REQUEST';
export const FETCH_SWIPE_DECK_SUCCESS = 'FETCH_SWIPE_DECK_SUCCESS';
export const GET_NEXT_SWIPE = 'GET_NEXT_SWIPE';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';

const GLOBAL = require('../Globals');

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

function requestUser(userId) {
    return { type: USER_REQUEST, userId };
}

export function receiveUser(userId, json) {
    return {
        type: USER_SUCCESS,
        userId,
        json,
    };
}

function fetchUser(userId) {
    return function (dispatch) {
        dispatch(requestUser(userId));
        return fetch(GLOBAL.BASE_URL + '/user/' + userId)
        .then(response => response.json())
        .then((json) => {
            dispatch(receiveUser(userId, json));
        });
    };
}

function shouldLoadUser(state, userId) {
    return !state.users.usersById[userId];
}

export function loadUserById(userId) {
    return (dispatch, getState) => {
        if(shouldLoadUser(getState(), userId)){
            return dispatch(fetchUser(userId));
        } else {
            return Promise.resolve();
        }
    };
}

function fetchSwipeDeck(query) {
    return function (dispatch) {
        dispatch(requestSwipeDeck(query));
        return fetch(GLOBAL.BASE_URL + '/swipe/possibleMatches/' + query.userId)
        .then((response) => response.json())
        .then((data) => {
            dispatch(requestSwipeDeckSuccess(query, data));
            data.swipeDeck.map((userId) => {
                dispatch(loadUserById(userId));
            });
        });
    };
}

function shouldFetchSwipeDeck(state) {
    if(state.users.isFetchingSwipeDeck) {
        return false;
    } else {
        return state.swipeDeck.length === 0;
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
    return state.users.swipeDeck.length;
}

export function getNextSwipe() {
    return (dispatch, getState) => {
        if(canGetSwipe(getState())) {
            return dispatch({ type: GET_NEXT_SWIPE });
        }
    };
}
