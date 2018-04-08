import { fetchSwipeDeckIfNeeded, getNextSwipe } from '../actions/swipeDeck';
import { connect } from 'react-redux';
import React from 'react';
import SwipeScreen from './SwipeScreen';

class SwipeScreenContainer extends React.Component {
    componentDidMount() {
        console.log('here1');
        this.props.fetchSwipeDeck({userId: this.props.userId})
        .then(() => {
            console.log('getting next swipe');
            return this.props.getNextSwipe();
        }).then(() => {
            return this.props.loadNextIfNeeded();
        });
    }

    render() {
        console.log('render swipescreen');
        console.log(this.props);
        return (
            <SwipeScreen nextSwipe={this.props.nextSwipe} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nextSwipeId: state.swipeDeck.nextSwipe,
        userId: state.auth.userId,
        nextSwipe: state.users[state.swipeDeck.nextSwipe],
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSwipeDeck: (query) => dispatch(fetchSwipeDeckIfNeeded(query)),
    getNextSwipe: () => dispatch(getNextSwipe()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SwipeScreenContainer);
