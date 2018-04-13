import {
    getNextSwipe,
    sendSwipe,
} from '../actions/swipeDeck';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import React from 'react';
import UserDetailScreen from './UserDetailScreen';

class UserDetailScreenContainer extends React.Component {
    componentDidMount() {
        this.props.loadUser(this.props.userId)
        .then(() => {
            this.props.photoIds.map((photoId) => {
                this.props.fetchPhoto({
                    photoId: photoId,
                });
            });
        });
    }

    swipe(like) {
        Actions.pop();
        this.props.swipe({
            userId: this.props.authUserId,
            swipeId: this.props.userId,
            liked: like,
        }).then(() => {
            return this.props.getNextSwipe();
        });
    }

    render() {
        return (
            <UserDetailScreen
                user={this.props.user}
                photos={this.props.photoDatas}
                matched={false}
                swipe={this.swipe.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const user = state.users[props.userId] || {};
    const photoIds = user.photos || [];
    const photoDatas = photoIds.map((photoId) => {
        const photo = state.photos[photoId] || {};
        return photo.data;
    });
    return {
        user: user,
        authUserId: state.auth.userId,
        photoIds: photoIds,
        photoDatas: photoDatas,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadUser: (swipeId) => dispatch(loadUserById(swipeId)),
    fetchPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
    getNextSwipe: () => dispatch(getNextSwipe()),
    swipe: (query) => dispatch(sendSwipe(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserDetailScreenContainer);
