import {
    CHATS_REQUEST,
    CHATS_SUCCESS,
    SEND_MESSAGE,
    SET_SOCKET,
} from '../actions/chats';
import { GiftedChat } from 'react-native-gifted-chat';
import { LOGOUT } from '../actions/auth';
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
            byDate: action.json.map((chat) => (chat._id)),
        });
    case SEND_MESSAGE:
        return Object.assign({}, state, {
            items: Object.assign({}, state.items, {
                [action.chatId]: Object.assign({}, state.items[action.chatId], {
                    messages: GiftedChat.append(
                        state.items[action.chatId].messages, action.message),
                }),
            }),
        });
    case SET_SOCKET:
        return Object.assign({}, state, {
            items: Object.assign({}, state.items, {
                [action.chatId]: Object.assign({}, state.items[action.chatId], {
                    socket: action.socket,
                }),
            }),
        });
    default:
        return state;
    }
}

export default chats;

