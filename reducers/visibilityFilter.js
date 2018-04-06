import {
    EventFilters,
    SET_EVENT_FILTER,
    TOGGLE_RSVP,
} from '../actions';

const { SHOW_ALL } = EventFilters;
function visibilityFilter(state = SHOW_ALL, action) {
    console.log('set visibility filter');
    console.log(state, action);
    switch(action.type) {
    case SET_EVENT_FILTER:
        return action.filter;
    default:
        return state;
    }
}

export default visibilityFilter;
