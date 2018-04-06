
export const TOGGLE_RSVP = 'RSVP';
export const SET_EVENT_FILTER = 'SET_EVENT_FILTER';

export const EventFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ATTENDING: 'SHOW_ATTENDING',
};

export function toggleRsvp(eventId) {
    return { type: TOGGLE_RSVP, eventId };
}

export function setEventFilter(filter) {
    console.log('setEventFilter');
    console.log(filter);
    return { type: SET_EVENT_FILTER, filter };
}

