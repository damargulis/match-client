import { combineReducers } from 'redux';
import events from './events';
import visibilityFilter from './visibilityFilter';
import user from './user';

export default combineReducers({
    events,
    visibilityFilter,
    user,
});
