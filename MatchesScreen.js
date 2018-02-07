import React from 'react';
import { AsyncStorage, Button, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import PersonDetailScreen from './PersonDetailScreen';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({
                userId: userId
            });
            fetch('http://ec2-54-186-191-46.us-west-2.compute.amazonaws.com:3000/chats/' + userId)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    chats: response,
                });
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    renderMatch(match){
        let otherId = match.userIds.filter((id) => id != this.state.userId)[0];
        return(
            <Button  title={otherId} onPress={() => this.props.navigation.navigate('Details', {chat: match})} />
        )
    }

    renderChat(chat){
        let otherId = chat.userIds.filter((id) => id != this.state.userId)[0];
        return (
            <Button title={otherId} onPress={() => this.props.navigation.navigate('Details', {chat: chat})} />
        )
    }

    render() {
        let matches = this.state.chats.filter((chat) => chat.messages.length == 0);
        let chats = this.state.chats.filter((chat) => chat.messages.length > 0);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                    renderItem={({item}) =>  this.renderChat(item)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
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
        navigationOptions: {
            headerTitle: 'Chat',
        },
    },
    PersonDetail: {
        screen: PersonDetailScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
})

export default MatchesScreen;
