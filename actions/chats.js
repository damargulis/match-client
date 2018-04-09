export const CHATS_REQUEST = 'CHATS_REQUEST';
export const CHATS_SUCCESS = 'CHATS_SUCCESS';

const GLOBAL = require('./../Globals');

function requestChats(query) {
    return { type: CHATS_REQUEST, query }
}

function chatSuccess(query, json) {
    console.log('chat5');
    return {
        type: CHATS_SUCCESS,
        query,
        json,
    };
}

function setRequestChats(query) {
    return function (dispatch) {
        dispatch(requestChats(query));
        return fetch(GLOBAL.BASE_URL + '/chat/' + query.userId)
        .then((response) => response.json())
        .then((json) => {
            console.log('here4');
            dispatch(chatSuccess(query, json));
        });
    };
}

function shouldFetchChats(state) {
    if(state.chats.isFetching) {
        return false;
    }
    return !state.chats.items
}

export function fetchChatsIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldFetchChats(getState(), query)){
            return dispatch(setRequestChats(query));
        } else {
            return Promise.resolve();
        }
    };
}
