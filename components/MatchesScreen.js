import React from 'react';
import { 
    AsyncStorage, 
    Button,
    FlatList,
    Image,
    TouchableHighlight,
    Text,
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import PersonDetailScreen from './PersonDetailScreen';

const GLOBAL = require('./../Globals');

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    getInfo(chat, index, userId) {
        let otherId = chat.userIds.filter((id) => id != userId)[0];
        fetch(GLOBAL.BASE_URL + '/user/' + otherId)
        .then((response) => response.json())
        .then((response) => {
            let chats = this.state.chats;
            chats[index].firstName = response.firstName;
            chats[index].photoId = response.photos[0];
            this.setState({
                chats: chats
            });
            if(!resposne.photos[0]) return;
            fetch(GLOBAL.BASE_URL + '/user/photo/' + response.photos[0])
            .then((response) => response.json())
            .then((response) => {
                var b64encode = btoa(String.fromCharCode.apply(null, response.data.data));
                b64encode = 'data:image/jpeg;base64,' + b64encode;
                chats[index].photoData = b64encode;
                this.setState({
                    chats: chats
                });
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    componentWillMount() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({
                userId: userId
            });
            fetch(GLOBAL.BASE_URL + '/chat/' + userId)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    chats: response,
                }, () => {
                    this.state.chats.map((chat, index) => {
                        this.getInfo(chat, index, userId)
                    });
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
        let name = match.firstName ? match.firstName : '';
        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Details', {chat: match})}
                key={otherId}
            >
                <View>
                    <Text>{name}</Text>
                    <Image
                        style={{height: 200, width: 200}}
                        source={{uri: match.photoData}}
                    />
                </View>
            </TouchableHighlight>
        )
        //return(
        //    <Button 
        //        title={name} 
        //        onPress={
        //            () => this.props.navigation.navigate(
        //                'Details', 
        //                {chat: match}
        //            )
        //        }
        //    />
        //)
    }

    renderChat(chat){
        let otherId = chat.userIds.filter((id) => id != this.state.userId)[0];
        let name = chat.firstName ? chat.firstName : '';
        return (
            <Button 
                title={name} 
                onPress={
                    () => this.props.navigation.navigate(
                        'Details', 
                        {chat: chat})
                }
            />
        )
    }

    render() {
        let matches = this.state.chats.filter(
            (chat) => chat.messages.length == 0
        );
        let chats = this.state.chats.filter((chat) => chat.messages.length > 0);
        return (
            <View 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
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
