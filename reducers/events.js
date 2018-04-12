import {
    RECEIVE_EVENTS,
    REQUEST_EVENTS,
    TOGGLE_RSVP_REQUEST,
    TOGGLE_RSVP_SUCCESS,
} from '../actions/events';
import {
    LOGOUT,
} from '../actions/auth';

function makeUnique(arr) {
    return arr.filter(function(item, pos) {
        return arr.indexOf(item) === pos;
    });
}

function mapEventsToId(events) {
    const map = {};
    events.map((evt) => {
        map[evt._id] = evt;
    });
    return map;
}

function events(state = {
    isFetching: false,
    didInvalidate: false,
    eventsById: {},
    allEvents: [],
}, action){
    switch(action.type) {
    case LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            allEvents: [],
        });
    case TOGGLE_RSVP_REQUEST:
        return Object.assign({}, state, {
            eventsById: Object.assign({}, state.eventsById, {
                [action.query.eventId]: Object.assign(
                    {},
                    state.eventsById[action.query.eventId],
                    {
                        isToggling: true,
                    }),
            }),
        });
    case TOGGLE_RSVP_SUCCESS:
        return Object.assign({}, state, {
            eventsById: Object.assign({}, state.eventsById, {
                [action.query.eventId]: Object.assign({},
                    state.eventsById[action.query.eventId], {
                        isToggling: false,
                    }, action.event
                ),
            }),
        });
    case REQUEST_EVENTS:
        return Object.assign({}, state, {
            isFetching: true,
            query: action.query,
        });
    case RECEIVE_EVENTS:
        return Object.assign({}, state, {
            isFetching: false,
            allEvents: makeUnique(state.allEvents.concat(
                action.events.map((evt) => evt._id)
            )),
            eventsById: Object.assign(
                {},
                state.eventsById,
                mapEventsToId(action.events)
            ),
            lastUpdated: action.receivedAt,
        });
    default:
        return state;
    }
}

export default events;

