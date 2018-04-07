
export const TOGGLE_RSVP = 'RSVP';
export const SET_EVENT_FILTER = 'SET_EVENT_FILTER';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

export const EventFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ATTENDING: 'SHOW_ATTENDING',
};

const GLOBAL = require('./../Globals');

export function toggleRsvp(eventId) {
    return { type: TOGGLE_RSVP, eventId };
}

export function setEventFilter(filter) {
    return { type: SET_EVENT_FILTER, filter };
}

function requestEvents(query) {
    return { type: REQUEST_EVENTS, query };
}

function requestLogin(query) {
    return { type: LOGIN_REQUEST, query };
}

function requestCreateAccount(query) {
    return { type: CREATE_ACCOUNT_REQUEST, query };
}

function receiveEvents(query, json) {
    return {
        type: RECEIVE_EVENTS,
        query,
        events: json,
        receivedAt: Date.now(),
    };
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
        message: error.message
    }
}

function createAccountSuccess(query, json) {
    return {
        type: CREATE_ACCOUNT_SUCCESS,
        user: json,
    };
}

function createAccountFailure(error) {
    return {
        type: CREATE_ACCOUNT_FAILURE,
        message: error.message,
    }
}

function fetchEvents(query) {
    return function (dispatch) {
        dispatch(requestEvents(query));
        return fetch(GLOBAL.BASE_URL
            + '/event?long='
            + query.longitude
            + '&lat='
            + query.latitude
            + '&maxDist='
            + query.interestsDistance
        ).then(response => response.json())
        .then((json) => {
            dispatch(receiveEvents(query, json));
        });
    };
}


function login(query) {
    return function (dispatch) {
        console.log('login');
        console.log(query);
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
            })
        }).then(response => response.json(),
            error => dispatch(loginFailure(error)),
        ).then((json) => {
            dispatch(loginSuccess(query, json));
        })
    };
}

function createAccount(query) {
    //TODO:
    return
}

function shouldFetchEvents(state) {
    if(state.events.isFetching) {
        return false;
    } else if(state.events.items.length > 0){
        return false;
    }
    return true;
}

function shouldLogin(state) {
    console.log('shouldLogin');
    console.log(state);
    if(state.user.isFetching) {
        console.log('false');
        return false;
    } else {
        console.log('not profile');
        console.log(!state.user.profile);
        return !state.user.profile;
    }
}

export function fetchEventsIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldFetchEvents(getState(), query)){
            return dispatch(fetchEvents(query));
        } else {
            return Promise.resolve();
        }
    };
}

export function loginIfNeeded(query) {
    return (dispatch, getState) => {
        console.log('loginIfNeeded');
        if(shouldLogin(getState(), query)){
            return dispatch(login(query));
        } else {
            return Promise.resolve();
        }
    };
}
