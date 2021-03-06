import {receiveUser} from './users';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';
export const LOGOUT = 'LOGOUT';

const GLOBAL = require('./../Globals');

function requestLogin(query) {
    return { type: LOGIN_REQUEST, query };
}

function requestCreateAccount(query) {
    return { type: CREATE_ACCOUNT_REQUEST, query };
}

function sendLogout(userId) {
    return { type: LOGOUT, userId };
}

function loginSuccess(query, json) {
    return {
        type: LOGIN_SUCCESS,
        user: json.user,
    };
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        message: error.message,
    };
}

function createAccountSuccess(query, json) {
    return {
        type: CREATE_ACCOUNT_SUCCESS,
        user: json.user,
    };
}

function createAccountFailure(error) {
    return {
        type: CREATE_ACCOUNT_FAILURE,
        message: error.message,
    };
}

function login(query) {
    return function (dispatch) {
        dispatch(requestLogin(query));
        return fetch(GLOBAL.BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: query.username,
                password: query.password,
            }),
        }).then(response => response.json(),
        ).then((json) => {
            if(json.success) {
                dispatch(loginSuccess(query, json));
                dispatch(receiveUser(json.user._id, json.user));
            } else {
                dispatch(loginFailure(json));
                return Promise.reject(json);
            }
        });
    };
}

function createAccount(query) {
    return function (dispatch) {
        dispatch(requestCreateAccount(query));
        return fetch(GLOBAL.BASE_URL + '/auth/createAccount/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: query,
            }),
        }).then(response => response.json(),
        ).then((json) => {
            if(json.success) {
                dispatch(createAccountSuccess(query, json));
                dispatch(receiveUser(json.user._id, json.user));
            } else {
                dispatch(createAccountFailure(json));
                return Promise.reject(json);
            }
        });
    };
}

export function logout(userId) {
    return function (dispatch) {
        dispatch(sendLogout(userId));
        return fetch(GLOBAL.BASE_URL + '/auth/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    };
}

function shouldLogin(state) {
    return !state.auth.isFetching;
}

function shouldCreateAccount(state) {
    return !state.auth.isFetching;
}

export function loginIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldLogin(getState(), query)){
            return dispatch(login(query));
        } else {
            return Promise.reject();
        }
    };
}

export function attemptCreateAccount(query) {
    return (dispatch, getState) => {
        if(shouldCreateAccount(getState(), query)){
            return dispatch(createAccount(query));
        } else {
            return Promise.reject();
        }
    };
}
