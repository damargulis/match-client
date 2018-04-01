import React from 'react';
import { 
    FlatList,
    Image,
    TouchableHighlight,
    Text,
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './MatchesScreen/ChatScreen';
import PersonDetailScreen from './PersonDetailScreen';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMatch(match){

        let otherId = match.userIds.filter(
            (id) => id != this.props.screenProps.user._id
        )[0];
        let name = match.user ? match.user.firstName : '';
        let source = match.user ? match.user.photoData : undefined;
        return (
            <TouchableHighlight
                onPress={
                    () => this.props.navigation.navigate(
                        'Details', 
                        {chat: match}
                    )
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
        let messages = chat.messages.filter((message) => !message.system);
        return messages.length > 0;
    }

    render() {
        let matches = this.props.screenProps.chats.filter(
            (chat) => !this.hasMessages(chat) 
        );
        let chats = this.props.screenProps.chats.filter(
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
                    renderItem={({item}) =>  this.renderMatch(item)}
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
    },
    PersonDetail: {
        screen: PersonDetailScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
});

export default MatchesScreen;
