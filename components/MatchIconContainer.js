import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import MatchIcon from './MatchIcon';
import React from 'react';

class MatchIconContainer extends React.Component {
    componentDidMount() {
        this.props.loadUser(this.props.otherId)
        .then(() => {
            if(this.props.otherUser){
                return this.props.getPhoto({
                    photoId: this.props.otherUser.photos[0],
                });
            }
        });
    }

    render() {
        return (
            <MatchIcon
                chat={this.props.chat}
                match={this.props.otherUser}
                photo={this.props.photo}
                gotoChat={Actions.chatScreen}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const chat = state.chats.items[props.matchId];
    const userId = state.auth.userId;
    const otherId = chat.userIds.filter((id) => id != userId)[0];
    const otherUser = state.users[otherId];
    const photoId = otherUser && otherUser.photos && otherUser.photos[0];
    const photo = state.photos[photoId];
    return {
        chat: state.chats.items[props.matchId],
        otherId: otherId,
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
)(MatchIconContainer);
