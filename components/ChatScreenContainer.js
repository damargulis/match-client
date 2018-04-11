import ChatScreen from './ChatScreen';
import { connect } from 'react-redux';
import React from 'react';

class ChatScreenContainer extends React.Component {
    render() {
        return(
            <ChatScreen />
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatScreenContainer);
