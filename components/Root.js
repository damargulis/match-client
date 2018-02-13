import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsScreen from './EventScreen';
import ProfileScreen from './ProfileScreen';
import MatchesScreen from './MatchesScreen';
import SwipeScreen from './SwipeScreen';

class Root extends React.Component {
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

export default Root;
