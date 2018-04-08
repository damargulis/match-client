import { combineReducers } from 'redux';
import auth from './auth';
import events from './events';
import photos from './photos';
import swipeDeck from './swipeDeck';
import users from './users';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    auth,
    events,
    photos,
    swipeDeck,
    visibilityFilter,
    users,
});
