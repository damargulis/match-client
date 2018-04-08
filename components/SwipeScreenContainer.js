import { 
    fetchSwipeDeckIfNeeded, 
    getNextSwipe, 
    sendSwipe 
} from '../actions/swipeDeck';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import React from 'react';
import SwipeScreen from './SwipeScreen';

class SwipeScreenContainer extends React.Component {
    componentDidMount() {
        this.props.fetchSwipeDeck({userId: this.props.userId})
        .then(() => {
            return this.props.getNextSwipe();
        }).then(() => {
            return this.props.loadUser(this.props.nextSwipeId);
        }).then(() => {
            return this.props.getPhoto({
                photoId: this.props.nextSwipe.photos[0],
            });
        });
    }

    swipe(like) {
        console.log('here2');
        this.props.swipe({
            userId: this.props.userId,
            swipeId: this.props.nextSwipeId,
            liked: like
        }).then(() => {
            return this.props.getNextSwipe();
        }).then(() => {
            return this.props.loadUser(this.props.nextSwipeId);
        }).then(() => {
            return this.props.getPhoto({
                photoId: this.props.nextSwipe.photos[0],
            });
        });
    }

    render() {
        return (
            <SwipeScreen
                nextSwipe={this.props.nextSwipe}
                seeDetails={
                    () => Actions.userDetailScreen({
                        userId: this.props.nextSwipeId,
                    })
                }
                nextSwipePhoto={this.props.nextSwipePhoto}
                swipe={this.swipe.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const nextSwipe = state.users[state.swipeDeck.nextSwipe];
    const photoId = nextSwipe && nextSwipe.photos && nextSwipe.photos[0];
    const photo = state.photos[photoId];
    return {
        nextSwipeId: state.swipeDeck.nextSwipe,
        userId: state.auth.userId,
        nextSwipe: nextSwipe,
        nextSwipePhoto: photo && photo.data,
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSwipeDeck: (query) => dispatch(fetchSwipeDeckIfNeeded(query)),
    getNextSwipe: () => dispatch(getNextSwipe()),
    loadUser: (swipeId) => dispatch(loadUserById(swipeId)),
    getPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
    swipe: (query) => dispatch(sendSwipe(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SwipeScreenContainer);
