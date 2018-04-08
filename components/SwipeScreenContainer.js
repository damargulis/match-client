import React from 'react';
import SwipeScreen from './SwipeScreen';
import { connect } from 'react-redux';
import { fetchSwipeDeckIfNeeded, getNextSwipe } from '../actions/users';

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
        console.log('render here');
        console.log(this.props);
        return (
            <SwipeScreen />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        nextSwipeId: state.users.nextSwipe,
        userId: state.user && state.user.profile && state.user.profile._id,
        nextSwipe: state.users.usersById[state.users.nextSwipe],
    }
};


const mapDispatchToProps = (dispatch, props) => ({
    fetchSwipeDeck: (query) => dispatch(fetchSwipeDeckIfNeeded(query)),
    getNextSwipe: () => dispatch(getNextSwipe()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SwipeScreenContainer);
