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
            <MatchesScreen
                matches={this.props.matches}
                chats={this.props.chats}
                goToChat={() => ({})}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const chats = (state.chats.byDate || []).map(
        (chatId) => state.chats.items[chatId]
    );
    return {
        userId: state.auth.userId,
        chats: chats.filter((chat) => chat.messages.length > 1),
        matches: chats.filter((chat) => chat.messages.length <= 1),
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchChats: (query) => dispatch(fetchChatsIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchesScreenContainer);
