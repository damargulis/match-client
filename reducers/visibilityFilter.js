import {
    EventFilters,
    SET_EVENT_FILTER,
} from '../actions';

const { SHOW_ALL } = EventFilters;
function visibilityFilter(state = SHOW_ALL, action) {
    switch(action.type) {
    case SET_EVENT_FILTER:
        return action.filter;
    default:
        return state;
    }
}

export default visibilityFilter;
