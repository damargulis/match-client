import React from 'react';
import {View, Text} from 'react-native';

class PersonDetailScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Picture Here</Text>
                <Text>{this.props.navigation.state.params.user.firstName}</Text>
                <Text>{this.props.navigation.state.params.user.age}</Text>
                <Text>{this.props.navigation.state.params.user.school}</Text>
                <Text>{this.props.navigation.state.params.user.occupation}</Text>
            </View>
        )
    }
}

export default PersonDetailScreen;
