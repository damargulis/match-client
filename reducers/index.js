import { combineReducers } from 'redux'
import events from './events';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    events,
    visibilityFilter
});
