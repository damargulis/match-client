import ChatScreen from './ChatScreen';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import React from 'react';

class ChatScreenContainer extends React.Component {
    componentDidMount(){
        this.props.loadUser(this.props.otherId)
        .then(() => {
            if(this.props.otherUser){
                return this.props.getPhoto({
                    photoId: this.props.otherUser.photos[0],
                });
            }
        });
    }

    onSend(){
    }

    render() {
        return(
            <ChatScreen
                chat={this.props.chat}
                onSend={this.onSend}
                otherUser={this.props.otherUser}
                photo={this.props.photo}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const chat = state.chats.items[props.chatId];
    const userId = state.auth.userId;
    const otherId = chat.userIds.filter((id) => id != userId)[0];
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatScreenContainer);
