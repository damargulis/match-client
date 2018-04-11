export const CHATS_REQUEST = 'CHATS_REQUEST';
export const CHATS_SUCCESS = 'CHATS_SUCCESS';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const GLOBAL = require('./../Globals');

function requestChats(query) {
    return { type: CHATS_REQUEST, query };
}

function chatSuccess(query, json) {
    return {
        type: CHATS_SUCCESS,
        query,
        json,
    };
}

function sendMessageAction(message, chatId) {
    return {
        type: SEND_MESSAGE,
        message,
        chatId,
    };
}

function setRequestChats(query) {
    return function (dispatch) {
        dispatch(requestChats(query));
        return fetch(GLOBAL.BASE_URL + '/chat/' + query.userId)
        .then((response) => response.json())
        .then((json) => {
            dispatch(chatSuccess(query, json));
        });
    };
}

function shouldFetchChats(state) {
    if(state.chats.isFetching) {
        return false;
    }
    return !state.chats.items;
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

function emitMessage(message, chatId) {
    return function (dispatch) {
        //emit socket
        return dispatch(sendMessageAction(message, chatId));
    };
}

export function sendMessage(message, chatId) {
    return (dispatch) => {
        return dispatch(emitMessage(message, chatId));
    };
}
