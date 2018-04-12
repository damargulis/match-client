import {Image, Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';

class ChatScreen extends React.Component {
    title() {
        const photo = this.props.photo && this.props.photo.data;
        return (
            <View>
                <Text>
                    {this.props.otherUser ? this.props.otherUser.firstName : ''}
                </Text>
                <Image
                    style={{height: 50, width: 50}}
                    source={{uri: photo}}
                />
            </View>
        );
    }

    componentDidMount() {
        const title = this.props.otherUser && this.props.otherUser.firstName;
        Actions.refresh({title: title, renderTitle: this.title.bind(this) });
    }

    render() {
        const { chat, userId } = this.props;
        return (
            <GiftedChat
                messages={chat && chat.messages}
                onSend={messages => this.props.onSend(messages)}
                user={{_id: userId}}
                keyboardShouldPersistTaps="never"
            />
        );
    }
}

export default ChatScreen;
