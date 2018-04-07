import {
    RECEIVE_EVENTS,
    REQUEST_EVENTS,
    TOGGLE_RSVP,
} from '../actions/events';

function events(state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action){
    switch(action.type) {
    case TOGGLE_RSVP:
        return { items: state.items.map((event) => {
            if(event._id == action.eventId) {
                return {...event, attending: !event.attending};
            }
            return event;
        }),
        };
    case REQUEST_EVENTS:
        return Object.assign({}, state, {
            isFetching: true,
            query: action.query,
        });
    case RECEIVE_EVENTS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.events,
            lastUpdated: action.receivedAt,
            query: action.query,
        });
    default:
        return state;
    }
}

export default events;

