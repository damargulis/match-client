import React from 'react';
import { Button, View, Text, TextInput, AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsScreen from './components/EventScreen';
import ProfileScreen from './components/ProfileScreen';
import MatchesScreen from './components/MatchesScreen';
import SwipeScreen from './components/SwipeScreen';
import LoginScreen from './components/LoginScreen';

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
