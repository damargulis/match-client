import auth from './auth';
import chats from './chats';
import { combineReducers } from 'redux';
import events from './events';
import photos from './photos';
import swipeDeck from './swipeDeck';
import users from './users';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    auth,
    chats,
    events,
    photos,
    swipeDeck,
    visibilityFilter,
    users,
});
