import React from 'react';
import { Button, View, Text, TextInput, AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsScreen from './components/EventScreen';
import ProfileScreen from './components/ProfileScreen';
import MatchesScreen from './components/MatchesScreen';
import SwipeScreen from './components/SwipeScreen';

import { Router, Scene, Actions } from 'react-native-router-flux';

const GLOBAL = require('./Globals');

class RootTabs extends React.Component {
    render() {
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
        return (
            <RootTabs />
        )
    }
}

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showWarning: false,
        };
    }

    createAccount() {
        fetch(GLOBAL.BASE_URL + '/auth/createAccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then(async (response) => {
            if(response.success){
                try {
                    await AsyncStorage.setItem('userId', response.userId)
                } catch (error) {
                    console.log(error);
                }
                Actions.appScreen();
            } else {
                this.setState({
                    showWarning: true
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    login() {
        fetch(GLOBAL.BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then(async (response) => {
            if(response.success){
                try {
                    await AsyncStorage.setItem('userId', 
                        response.userId.toString()
                    );
                } catch (error) {
                    console.log(error);
                }
                Actions.appScreen();
            } else{
                this.setState({
                    showWarning: true
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    showWarning() {
        if(this.state.showWarning) {
            return ( <Text>Login Failed</Text> );
        } else{
            return null;
        }
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>Login Page</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                />
                { this.showWarning() }
                <Button
                    title="Login"
                    onPress={this.login.bind(this)}
                />
                <Button
                    title="Create Account"
                    onPress={this.createAccount.bind(this)}
                />
            </View>
        )
    }
};

class MainPage extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="loginScreen"
                        component={LoginScreen}
                        animation='fade'
                        hideNavBar={true}
                        initiail={true}
                    />
                    <Scene key="appScreen"
                        component={RootTabs}
                        animation='fade'
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
                
        )
    }
}

export default MainPage;
