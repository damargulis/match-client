import React from 'react';
import {Image, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class Title extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('PersonDetail', {user: this.props.user})}
            >
                <View>
                    <Image
                        source={{uri: this.props.user.photoData}}
                        style={{ width: 30, height: 30}}
                    />
                    <Text>{this.props.user.firstName}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(Title);
