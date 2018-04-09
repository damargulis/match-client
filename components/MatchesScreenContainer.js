import { connect } from 'react-redux';
import { fetchChatsIfNeeded } from '../actions/chats';
import MatchesScreen from './MatchesScreen';
import React from 'react';

class MatchesScreenContainer extends React.Component {
    componentDidMount() {
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
