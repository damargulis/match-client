import {
    RECEIVE_EVENTS,
    REQUEST_EVENTS,
    TOGGLE_RSVP_REQUEST,
    TOGGLE_RSVP_SUCCESS,
} from '../actions/events';

function mapEventsToId(events) {
    const map = {}
    events.map((evt) => {
        map[evt._id] = evt;
    })
    return map;
}

function events(state = {
    isFetching: false,
    didInvalidate: false,
    eventsById: {},
    allEvents: [],
}, action){
    switch(action.type) {
    case TOGGLE_RSVP_REQUEST:
        return Object.assign({}, state, {
            eventsById: Object.assign({}, state.eventsById, {
                [action.query.eventId]: Object.assign({}, state.eventsById[action.query.eventId], {
                    isToggling: true,
                })
            })
        })
    case TOGGLE_RSVP_SUCCESS:
        return Object.assign({}, state, {
            eventsById: Object.assign({}, state.eventsById, {
                [action.query.eventId]: Object.assign({}, state.eventsById[action.query.eventId], {
                    isToggling: false
                }, action.event
                )
            })
        });
    case REQUEST_EVENTS:
        return Object.assign({}, state, {
            isFetching: true,
            query: action.query,
        });
    case RECEIVE_EVENTS:
        return Object.assign({}, state, {
            isFetching: false,
            allEvents: action.events.map((evt) => evt._id),
            eventsById: mapEventsToId(action.events),
            lastUpdated: action.receivedAt,
            query: action.query,
        });
    default:
        return state;
    }
}

export default events;

