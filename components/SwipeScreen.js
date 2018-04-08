import {
    Button,
    Image,
    Text,
    View,
} from 'react-native';
import React from 'react';

class SwipeScreen extends React.Component {
    goToDetails() {
    }
    swipe() {
    }

    render() {
        const user = this.props.nextSwipe ? this.props.nextSwipe : {};
        return (
            <View>
                <View
                    style={{height: 300, width: 300}}
                >
                    <Text>{user.firstName}</Text>
                    <Text>{user.school}</Text>
                    <Image
                        stlye={{height: 290, width: 290}}
                        source={{uri: undefined }}
                    />
                </View>
                <Button
                    title='View Details'
                    onPress={() => this.goToDetails()}
                />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            disabled={false}
                            color='red'
                            title='No'
                            style={{flex: 1, backgroundColor: 'red'}}
                            onPress={() => this.swipe(false)}
                        >
                        </Button>
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            disabled={false}
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
