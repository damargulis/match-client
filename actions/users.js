export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const EDIT_INFO_REQUEST = 'EDIT_INFO_REQUEST';
export const EDIT_INFO_SUCCESS = 'EDIT_INFO_SUCCESS';
export const EDIT_INFO_FAILURE = 'EDIT_INFO_FAILURE';

const GLOBAL = require('../Globals');

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
    return !state.users[userId];
}

export function loadUserById(userId) {
    return (dispatch, getState) => {
        console.log('loaduserbyid');
        if(shouldLoadUser(getState(), userId)){
            return dispatch(fetchUser(userId));
        } else {
            return Promise.resolve();
        }
    };
}

function requestEditInfo(query) {
    return { type: EDIT_INFO_REQUEST, query };
}

function editInfoSuccess(query, data) {
    return {
        type: EDIT_INFO_SUCCESS,
        userId: query._id,
        json: data.profile,
    };
}

function editInfoFailure(error) {
    return {
        type: EDIT_INFO_FAILURE,
        message: error.message,
    };
}

function editInfo(query) {
    return function (dispatch) {
        dispatch(requestEditInfo(query));
        return fetch(GLOBAL.BASE_URL + '/user/' + query._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: query,
            }),
        }).then((response) => response.json(),
            error => dispatch(editInfoFailure(error))
        ).then((response) => {
            if(response.success) {
                dispatch(editInfoSuccess(query, response));
            } else {
                dispatch(editInfoFailure(response));
            }
        });
    };
}

function shouldEditInfo(state, query) {
    const user = state.users[query._id] || {};
    return !user.isFetching;
}

export function editInfoIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldEditInfo(getState(), query)){
            return dispatch(editInfo(query));
        } else {
            return Promise.resolve();
        }
    };
}
