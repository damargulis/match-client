export const SET_EVENT_FILTER = 'SET_EVENT_FILTER';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const TOGGLE_RSVP_REQUEST = 'RSVP_REQUEST';
export const TOGGLE_RSVP_SUCCESS = 'RSVP_SUCCESS';

export const EventFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ATTENDING: 'SHOW_ATTENDING',
};

const GLOBAL = require('./../Globals');

export function setEventFilter(filter) {
    return { type: SET_EVENT_FILTER, filter };
}

function requestEvents(query) {
    return { type: REQUEST_EVENTS, query };
}

function requestToggleRsvp(query) {
    return { type: TOGGLE_RSVP_REQUEST, query };
}

function receiveEvents(query, json) {
    return {
        type: RECEIVE_EVENTS,
        query,
        events: json,
        receivedAt: Date.now(),
    };
}

function toggleRsvpSuccess(query, json) {
    return {
        type: TOGGLE_RSVP_SUCCESS,
        query,
        event: json.event,
        profile: json.profile,
    };
}

function fetchEvents(query) {
    return function (dispatch) {
        dispatch(requestEvents(query));
        let queryString = '?long=' + query.longitude
            + '&lat='
            + query.latitude
            + '&maxDist='
            + query.interestsDistance;
        queryString += query.afterTime ? '&afterTime=' + query.afterTime : '';
        return fetch(GLOBAL.BASE_URL + '/event' + queryString)
        .then(response => response.json())
        .then((json) => {
            dispatch(receiveEvents(query, json));
        });
    };
}

function toggleRsvp(query) {
    return function (dispatch) {
        dispatch(requestToggleRsvp(query));
        const rsvp = query.attending ? 'cancel' : 'rsvp';
        return fetch(GLOBAL.BASE_URL + '/event/' + rsvp, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: query.eventId,
                userId: query.userId,
            }),
        }
        ).then(response => response.json())
        .then((json) => {
            dispatch(toggleRsvpSuccess(query, json));
        });
    };
}

function shouldFetchEvents(state, query) {
    if(state.events.isFetching) {
        return false;
    }
    if(query.afterTime) {
        const lastQuery = state.events.query;
        const afterTime = lastQuery && lastQuery.afterTime;
        if(afterTime === query.afterTime){
            return false;
        }
        return true;
    } else {
        return true;
    }
}

function shouldToggleRsvp(state, query) {
    const event = state.events.eventsById[query.eventId];
    if (!event) {
        return false;
    } else if(event.isToggling){
        return false;
    }
    return true;
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

export function toggleRsvpIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldToggleRsvp(getState(), query)){
            return dispatch(toggleRsvp(query));
        } else {
            return Promise.resolve();
        }
    };
}

