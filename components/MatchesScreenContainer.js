import { connect } from 'react-redux';
import MatchesScreen from './MatchesScreen';
import React from 'react';
import { fetchChatsIfNeeded } from '../actions/chats';

class MatchesScreenContainer extends React.Component {
    componentDidMount() {
        console.log('here3');
        this.props.fetchChats({userId: this.props.userId});
    }

    render() {
        return (
            <MatchesScreen />
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
    fetchChats: (query) => dispatch(fetchChatsIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchesScreenContainer);
