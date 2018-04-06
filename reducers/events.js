import {
    EventFilters,
    SET_EVENT_FILTER,
    TOGGLE_RSVP,
} from '../actions';

function events(state = [{
    '_id': 1,
    'type': 'Concert',
    'name': 'Kanye Concert',
    'attending': false,
}, {
    '_id': 2,
    'type': 'Bar',
    'name': 'Half price drinks at 3 kings',
    'attending': false,
}], action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
    case TOGGLE_RSVP:
        return state.map((event) => {
            if(event._id == action.eventId) {
                console.log('switching');
                return {...event, attending: !event.attending};
            }
            console.log('not switching');
            return event;
        });
    default:
        return state;
    }
}

export default events;
