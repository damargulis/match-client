import {
    Button,
    Image,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import React from 'react';

class SwipeScreen extends React.Component {
    swipe(like) {
        this.props.swipe(like);
    }

    renderUser(user) {
        if(this.props.hasSwipes) {
            if(user && !user.isFetching) {
                return (
                    <View>
                        <Text>{user.firstName}</Text>
                        <Text>{user.school}</Text>
                        <Image
                            style={{height: 290, width: 290}}
                            source={{uri: this.props.nextSwipePhoto }}
                        />
                    </View>
                );
            } else {
                return (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                );
            }
        } else {
            return (
                <TouchableHighlight onPress={this.props.refresh}>
                    <View
                        style={{height: 290, width: 290}}
                    >
                        <Text>{'No possible matches found. '
                    + 'Rsvp to more events to see more users.'
                    + '\nClick here to refresh.'
                        }</Text>
                    </View>
                </TouchableHighlight >
            );
        }
    }

    render() {
        const user = this.props.nextSwipe;
        return (
            <View>
                <View
                    style={{height: 300, width: 300}}
                >
                    { this.renderUser(user) }
                </View>
                <Button
                    title='View Details'
                    onPress={this.props.seeDetails}
                    disabled={!user}
                />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            disabled={!user}
                            color='red'
                            title='No'
                            style={{flex: 1, backgroundColor: 'red'}}
                            onPress={() => this.swipe(false)}
                        >
                        </Button>
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            disabled={!user}
                            color='green'
                            title='Yes'
                            style={{flex: 1, backgroundColor: 'green'}}
                            onPress={() => this.swipe(true)}
                        >
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

export default SwipeScreen;
