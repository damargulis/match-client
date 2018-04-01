import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation';
import io from 'socket.io-client/dist/socket.io';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsScreen from './EventScreen';
import ProfileScreen from './ProfileScreen';
import MatchesScreen from './MatchesScreen';
import SwipeScreen from './SwipeScreen';

const GLOBAL = require('./../Globals');


const RootTabs = TabNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Events: {
        screen: EventsScreen,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Swipe: {
        screen: SwipeScreen,
        navigationOptions: {
            tabBarLabel: 'Possible Dates',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Matches: {
        screen: MatchesScreen,
        navigationOptions: {
            tabBarLabel: 'Matches',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home': 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    }, 
}, {
    initialRouteName: 'Events',
});

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            mainPhoto: null,
            chats: [],
        };
    }

    componentWillMount() {
        this.getLocation();
        let mainPhotoId = this.props.user.photos[0];
        if(mainPhotoId){
            this.getMainPhoto(mainPhotoId);
        }
        this.socket = io(
            GLOBAL.BASE_URL
            + '/matchNotification'
            + '?userId='
            + this.props.user._id,
            {
                jsonp: false,
                path: '/socket.io',
            },
        );
        this.socket.on('newMatch', (data) => {
            this.refreshMatches();
            Alert.alert('You\'ve matched with ' + data.match.firstName + '!');
        });
        this.refreshMatches();
    }

    logout() {
        this.socket.disconnect();
        Actions.loginScreen();
    }

    getMainPhoto(mainPhotoId) {
        fetch(GLOBAL.BASE_URL + '/user/photo/' + mainPhotoId)
        .then((response) => response.json())
        .then((response) => {
            var b64encode = btoa(
                String.fromCharCode.apply(null, response.data.data)
            );
            b64encode = 'data:image/jpeg;base64,' + b64encode;
            this.setState({
                mainPhoto: b64encode,
            });
        });
    }

    refreshProfile() {
        fetch(GLOBAL.BASE_URL + '/user/' + this.props.user._id)
        .then((response) => response.json())
        .then((response) => {
            this.setState({ 
                user: response, 
            });
            let mainPhotoId = response.photos[0];
            if(mainPhotoId){
                this.getMainPhoto(mainPhotoId);
            }
        });
    }

    getMatchInfo(chat, index, userId) {
        let otherId = chat.userIds.filter((id) => id != userId)[0];
        fetch(GLOBAL.BASE_URL + '/user/' + otherId)
        .then((response) => response.json())
        .then((response) => {
            let chats = this.state.chats;
            chats[index].user = response;
            this.setState({
                chats: chats,
            });
            if(!response.photos[0]) return;
            fetch(GLOBAL.BASE_URL + '/user/photo/' + response.photos[0])
            .then((response) => response.json())
            .then((response) => {
                var b64encode = btoa(
                    String.fromCharCode.apply(null, response.data.data)
                );
                b64encode = 'data:image/jpeg;base64,' + b64encode;
                chats[index].user.photoData = b64encode;
                this.setState({
                    chats: chats,
                });
            });
        });
    }

    refreshMatches() {
        fetch(GLOBAL.BASE_URL + '/chat/' + this.props.user._id)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                chats: response,
            }, () => {
                this.state.chats.map((chat, index) => {
                    this.getMatchInfo(chat, index, this.props.user._id);
                });
            });
        });
    }

    setLocation(position, userId) {
        this.setState({
            position: position,
        });
        fetch(GLOBAL.BASE_URL + '/user/' + userId + '/location', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                long: position.coords.longitude,
                lat: position.coords.latitude,
            }),
        });
    }

    getLocation() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            navigator.geolocation.getCurrentPosition((position) => {
                //cheap way to cheat simulator
                position = {
                    coords: {
                        longitude: -90.295861,
                        latitude: 38.650768,
                    },
                };
                this.setLocation(position, userId);
            }, () => {
                //cheat simulator
                let position = {
                    coords: {
                        longitude: -90.295861,
                        latitude: 38.650768,
                    },
                };
                this.setLocation(position, userId);
            }, { 
                enableHighAccuracy: false,
            });
        });
    }

    render() {
        return (
            <RootTabs screenProps={{
                user: this.state.user, 
                position: this.state.position, 
                mainPhoto: this.state.mainPhoto,
                refreshProfile: this.refreshProfile.bind(this),
                chats: this.state.chats,
                logout: this.logout.bind(this),
            }} />
        );
    }
}

export default Root;
