import {
    TOGGLE_RSVP,
    SET_EVENT_FILTER,
    EventFilters
} from '../actions';


function events(state = [{
    '_id': 1,
    'type': 'Concert',
    'name': 'Kanye Concert',
    'attending': false
}, {
    '_id': 2,
    'type': 'Bar',
    'name': 'Half price drinks at 3 kings',
    'attending': false
}], action) {
    switch(action.type) {
       case TOGGLE_RSVP:
            return state.map((event) => {
                if(event._id == action._id) {
                    return {...event, attending: !event.attending}
                }
                return todo
            })
        default:
            return state
    }
}

export default events;

