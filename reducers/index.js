import { combineReducers } from 'redux';
import events from './events';
import user from './user';
import users from './users';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    events,
    visibilityFilter,
    user,
    users,
});
