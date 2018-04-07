import { combineReducers } from 'redux';
import events from './events';
import user from './user';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    events,
    visibilityFilter,
    user,
});
