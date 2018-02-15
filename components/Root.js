import React from 'react';
import { AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation';
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
    } 
}, {
    initialRouteName: 'Events',
});

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            mainPhoto: null,
        };
    }

    componentWillMount() {
        this.setLocation();
    }

    refreshProfile() {
        fetch(GLOBAL.BASE_URL + '/user/' + this.state.user._id)
        .then((response) => response.json())
        .then((response) => {
            this.setState({ 
                user: response, 
            });
            let mainPhotoId = response.photos[0];
            if(mainPhotoId){
                fetch(GLOBAL.BASE_URL + '/user/photo/' + mainPhotoId)
                .then((response) => response.json())
                .then((response) => {
                    var b64encode = btoa(String.fromCharCode.apply(null, response.data.data));
                    b64encode = 'data:image/jpeg;base64,' + b64encode;
                    this.setState({
                        mainPhoto: b64encode
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    setLocation() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    position: position
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
                }).catch((error) => {
                    console.log(error);
                });
            })
        });
    }

    render() {
        return (
            <RootTabs screenProps={{
                user: this.state.user, 
                position: this.state.position, 
                mainPhoto: this.state.mainPhoto,
                refreshProfile: this.refreshProfile.bind(this),
            }} />
        )
    }
}

export default Root;
