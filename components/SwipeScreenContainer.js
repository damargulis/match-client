import { fetchSwipeDeckIfNeeded, getNextSwipe } from '../actions/users';
import { connect } from 'react-redux';
import React from 'react';
import SwipeScreen from './SwipeScreen';

class SwipeScreenContainer extends React.Component {
    componentDidMount() {
        this.props.fetchSwipeDeck({userId: this.props.userId})
        .then(() => {
            return this.props.getNextSwipe();
        }).then(() => {
            return this.props.loadNextIfNeeded();
        });
    }

    render() {
        return (
            <SwipeScreen nextSwipe={this.props.nextSwipe} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nextSwipeId: state.nextSwipe,
        userId: state.auth.userId,
        nextSwipe: state.users[state.nextSwipe],
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
