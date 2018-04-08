import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import ChatScreen from './MatchesScreen/ChatScreen';
import PersonDetailScreen from './PersonDetailScreen';
import React from 'react';
import { StackNavigator } from 'react-navigation';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMatch(match){
        const otherId = match.userIds.filter(
            (id) => id != this.props.screenProps.user._id
        )[0];
        const name = match.user ? match.user.firstName : '';
        const source = match.user ? match.user.photoData : undefined;
        return (
            <TouchableHighlight
                onPress={
                    () => this.props.navigation.navigate('Details', {
                        chat: match,
                        refreshMatches: this.props.screenProps.refreshMatches,
                    })
                }
                key={otherId}
            >
                <View>
                    <Text>{name}</Text>
                    <Image
                        style={{height: 100, width: 100}}
                        source={{uri: source}}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    hasMessages(chat){
        const messages = chat.messages.filter((message) => !message.system);
        return messages.length > 0;
    }

    render() {
        const matches = this.props.screenProps.chats.filter(
            (chat) => !this.hasMessages(chat)
        );
        const chats = this.props.screenProps.chats.filter(
            (chat) => this.hasMessages(chat)
        );
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FlatList
                    style={{flex: 1}}
                    data={matches}
                    renderItem={({item}) => this.renderMatch(item)}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                />
                <FlatList
                    style={{flex: 4}}
                    data={chats}
                    renderItem={({item}) => this.renderMatch(item)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const MatchesScreen = StackNavigator({
    Home: {
        screen: MainScreen,
        navigationOptions: {
            headerTitle: 'Matches',
        },
    },
    Details: {
        screen: ChatScreen,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Button title="<-" onPress={ () => {
                navigation.state.params.refreshMatches();
                navigation.goBack();
            }}/>,
        }),
    },
    PersonDetail: {
        screen: PersonDetailScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
});

export default MatchesScreen;