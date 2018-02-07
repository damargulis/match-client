import React from 'react';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import './UserAgent';

import io from 'socket.io-client/dist/socket.io';

const GLOBAL = require('./Globals');

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.navigation.state.params.chat.messages
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({
                userId: userId
            });
        });
        this.socket = io(
            GLOBAL.BASE_URL 
            + '/?chatId=' 
            + this.props.navigation.state.params.chat._id, 
            {jsonp: false}
        );
        this.socket.on('receiveMessage', (data) => {
            this.setState(previousState => ({
                messages: GiftedChat.append(
                    previousState.messages, 
                    data.message.message
                ),
            }))
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    onSend(messages = []) {
        this.socket.emit('sendMessage', {message: messages});
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{_id: this.state.userId}}
                keyboardShouldPersistTaps='never'
                onPressAvatar={ 
                    () => this.props.navigation.navigate('PersonDetail')
                }
                isAnimated={true}
            />
        )
    }
}

export default ChatScreen;
