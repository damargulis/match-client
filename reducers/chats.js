import {
    CHATS_REQUEST,
    CHATS_SUCCESS,
} from '../actions/chats';
import {
    LOGOUT,
} from '../actions/auth';

function mapChatsToId(chats) {
    const map = {};
    chats.map((chat) => {
        map[chat._id] = chat;
    });
    return map;
}

function chats(state = {
    isFetching: false,
    items: undefined,
    byDate: [],
}, action){
    switch(action.type) {
    case LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            items: undefined,
        });
    case CHATS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case CHATS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: mapChatsToId(action.json),
            byDate: action.json.map((chat) => (chat._id))
        });
    default:
        return state;
    }
}

export default chats;

