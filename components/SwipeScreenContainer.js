import { loadUserById } from '../actions/users';
import { fetchSwipeDeckIfNeeded, getNextSwipe } from '../actions/swipeDeck';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import React from 'react';
import SwipeScreen from './SwipeScreen';
import { fetchPhotoIfNeeded } from '../actions/photos';

class SwipeScreenContainer extends React.Component {
    componentDidMount() {
        this.props.fetchSwipeDeck({userId: this.props.userId})
        .then(() => {
            console.log('getNextSwipe');
            return this.props.getNextSwipe();
        }).then(() => {
            return this.props.loadUser(this.props.nextSwipeId);
        }).then(() => {
            return this.props.getPhoto({photoId: this.props.nextSwipe.photos[0]});
        }).catch((error) => {
            console.log(error);
        })
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
            />
        );
    }
}

const mapStateToProps = (state) => {
    let nextSwipe = state.users[state.swipeDeck.nextSwipe];
    let photoId = nextSwipe && nextSwipe.photos && nextSwipe.photos[0]
    let photo = state.photos[photoId];
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SwipeScreenContainer);
