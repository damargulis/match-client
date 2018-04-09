import {
    EventFilters,
    SET_EVENT_FILTER,
} from '../actions/events';
import {
    LOGOUT
} from '../actions/auth';

const { SHOW_ALL } = EventFilters;
function visibilityFilter(state = SHOW_ALL, action) {
    switch(action.type) {
    case LOGOUT:
        return SHOW_ALL;
    case SET_EVENT_FILTER:
        return action.filter;
    default:
        return state;
    }
}

export default visibilityFilter;
