import { sendMessage, setSocketIfNeeded } from '../actions/chats';
import ChatScreen from './ChatScreen';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import React from 'react';

class ChatScreenContainer extends React.Component {
    componentDidMount(){
        this.props.loadUser(this.props.otherId);
        if(this.props.otherUser){
            this.props.getPhoto({
                photoId: this.props.otherUser.photos[0],
            });
        }
        if(this.props.chat){
            this.props.setSocket(this.props.chat._id);
        }
    }

    onSend(messages){
        this.props.sendMessage(messages, this.props.chat._id);
    }

    render() {
        return(
            <ChatScreen
                chat={this.props.chat}
                onSend={this.onSend.bind(this)}
                otherUser={this.props.otherUser}
                photo={this.props.photo}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const chat = state.chats.items && state.chats.items[props.chatId];
    const userId = state.auth.userId;
    const otherId = chat && chat.userIds.filter((id) => id != userId)[0];
    const otherUser = state.users[otherId];
    const photoId = otherUser && otherUser.photos && otherUser.photos[0];
    const photo = state.photos[photoId];
    return {
        chat: chat,
        userId: userId,
        otherUser: otherUser,
        photo: photo,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadUser: (swipeId) => dispatch(loadUserById(swipeId)),
    getPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
    sendMessage: (message, chatId) => dispatch(sendMessage(message, chatId)),
    setSocket: (chatId) => dispatch(setSocketIfNeeded(chatId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatScreenContainer);
