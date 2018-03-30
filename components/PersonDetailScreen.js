import React from 'react';
import {Image, View, Text} from 'react-native';

class PersonDetailScreen extends React.Component {
    render() {
        return (
            <View>
                <Image
                    style={{ height: 300, width: 300}}
                    source={{
                        uri: this.props.navigation.state.params.user.photoData
                    }}
                />
                <Text>{this.props.navigation.state.params.user.firstName}</Text>
                <Text>{this.props.navigation.state.params.user.age}</Text>
                <Text>{this.props.navigation.state.params.user.school}</Text>
                <Text>
                    {this.props.navigation.state.params.user.occupation}
                </Text>
            </View>
        );
    }
}

export default PersonDetailScreen;
