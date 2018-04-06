
export const TOGGLE_RSVP = 'RSVP';
export const SET_EVENT_FILTER = 'SET_EVENT_FILTER';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

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
    return { type: REQUEST_EVENTS, query }
}

function receiveEvents(query, json) {
    return {
        type: RECEIVE_EVENTS,
        query,
        events: json,
        receivedAt: Date.now(),
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
        ).then(
            response => response.json(),
            error => console.log(error)
        ).then(json => {
            dispatch(receiveEvents(query, json));
        });
    }
}

function shouldFetchEvents(state, query) {
    if(state.isFetching) {
        return false;
    } else if(state.events.items.length > 0){
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
    }
}
