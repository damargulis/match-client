import React from 'react';
import { AsyncStorage, Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PersonDetailScreen from './PersonDetailScreen';

const GLOBAL = require('./../Globals');

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeDeck: [],
            nextSwipe: {},
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({
                userId: userId
            });
            fetch(GLOBAL.BASE_URL + '/possibleMatches/' + userId)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    swipeDeck: response.swipeDeck,
                }, this.getNextSwipeOption);
            }).catch((error) => {
                console.log(error);
            });
        })
    }

    getNextSwipeOption() {
        let userId = this.state.swipeDeck.pop();
        if(! userId) {
            this.setState({
                nextSwipe: {},
            });
            return;
        }
        fetch(GLOBAL.BASE_URL + '/user/' + userId)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                nextSwipe: response
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    swipe(like) {
        fetch(GLOBAL.BASE_URL + '/swipe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.userId,
                swipeId: this.state.nextSwipe._id,
                liked: like,
            }),
        }).then(response => response.json())
        .then(response => {
            if(response.success) {
                this.getNextSwipeOption();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let name = this.state.nextSwipe ? this.state.nextSwipe.firstName : '';
        let school = this.state.nextSwipe ? this.state.nextSwipe.school : '';
        return (
            <View style={{backgroundColor: 'blue'}}>
                <Text style={{height: 200}}>{name}</Text>
                <Text>{school}</Text>
                <Button 
                    title='View Details' 
                    onPress={
                        () => this.props.navigation.navigate(
                            'Details', 
                            {user: this.state.nextSwipe}
                        )
                    }
                />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                    <Button 
                        disabled={!this.state.nextSwipe} 
                        color='red' 
                        title='No' 
                        style={{flex: 1, backgroundColor: 'red'}} 
                        onPress={() => this.swipe(false)}
                    >
                    </Button>
                    </View>
                    <View style={{flex: 1}}>
                    <Button 
                        disabled={!this.state.nextSwipe} 
                        color='green' 
                        title='Yes' 
                        style={{flex: 1, backgroundColor: 'green'}} 
                        onPress={() => this.swipe(true)}
                    >
                    </Button>
                    </View>
                </View>
            </View>
        )
    }
};

const SwipeScreen = StackNavigator({
    Home: {
        screen: MainScreen,
        navigationOptions: {
            headerTitle: 'Swipe'
        },
    },
    Details: {
        screen: PersonDetailScreen,
        navigationOptions: {
            headerTitle: 'Name',
        },
    },
});

export default SwipeScreen;
