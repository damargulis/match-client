export const CHATS_REQUEST = 'CHATS_REQUEST';
export const CHATS_SUCCESS = 'CHATS_SUCCESS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SET_SOCKET = 'SET_SOCKET';
import io from 'socket.io-client/dist/socket.io';

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

function setSocketSuccess(chatId, socket) {
    return {
        type: SET_SOCKET,
        chatId,
        socket,
    };
}

function receiveMessage(chatId, data) {
    return {
        type: RECEIVE_MESSAGE,
        chatId,
        data,
    };
}

function sendMessageAction(message, chatId) {
    return {
        type: SEND_MESSAGE,
        message,
        chatId,
    };
}

export function setRequestChats(query) {
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

function emitMessage(message, chatId, state) {
    return function (dispatch) {
        state.chats.items[chatId].socket.emit('sendMessage',
            { message: message }
        );
        return dispatch(sendMessageAction(message, chatId));
    };
}

export function sendMessage(message, chatId) {
    return (dispatch, getState) => {
        return dispatch(emitMessage(message, chatId, getState()));
    };
}

function setSocket(chatId) {
    return function(dispatch) {
        const socket = io(
            GLOBAL.BASE_URL
            + '/chatNotification'
            + '?chatId='
            + chatId,
            {
                jsonp: false,
                path: '/socket.io',
            },
        );
        socket.on('receiveMessage', (data) => {
            dispatch(receiveMessage(chatId, data));
        });
        return dispatch(setSocketSuccess(chatId, socket));
    };
}

function shouldSetSocket(state, chatId) {
    const chat = state.chats.items[chatId];
    return !chat.socket;
}

export function setSocketIfNeeded(chatId) {
    return (dispatch, getState) => {
        if(shouldSetSocket(getState(), chatId)){
            return dispatch(setSocket(chatId));
        } else {
            return Promise.resolve();
        }
    };
}
