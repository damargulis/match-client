export const FETCH_SWIPE_DECK_REQUEST = 'FETCH_SWIPE_DECK_REQUEST';
export const FETCH_SWIPE_DECK_SUCCESS = 'FETCH_SWIPE_DECK_SUCCESS';
export const GET_NEXT_SWIPE = 'GET_NEXT_SWIPE';
export const SWIPE_REQUEST = 'SWIPE_REQUEST';
export const SET_MATCH_SOCKET = 'SET_MATCH_SOCKET';
export const NEW_MATCH = 'NEW_MATCH';
import io from 'socket.io-client/dist/socket.io';
import { setRequestChats } from './chats';

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

function newMatch(data) {
    return {
        type: NEW_MATCH,
        data,
    };
}

function setSocketSuccess(query, socket) {
    return {
        type: SET_MATCH_SOCKET,
        query,
        socket,
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
        } else {
            return Promise.resolve();
        }
    };
}

function setSocket(query) {
    return function(dispatch) {
        const socket = io(
            GLOBAL.BASE_URL
            + '/matchNotification'
            + '?userId='
            + query.userId,
            {
                jsonp: false,
                path: '/socket.io',
            },
        );
        socket.on('newMatch', (data) => {
            dispatch(newMatch(data));
            dispatch(setRequestChats({userId: query.userId}));
        });
        return dispatch(setSocketSuccess(query, socket));
    };
}

function shouldSetMatchSocket(state) {
    return !state.swipeDeck.matchSocket;
}

export function setMatchSocket(query) {
    return (dispatch, getState) => {
        if(shouldSetMatchSocket(getState())){
            return dispatch(setSocket(query));
        } else {
            return Promise.resolve();
        }
    };
}
