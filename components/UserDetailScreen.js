import {
    Image,
    Text,
    View,
} from 'react-native';
import React from 'react';

class UserDetailScreen extends React.Component {
    render () {
        const { photo, user } = this.props;
        return (
            <View>
                <Image
                    style={{ height: 300, width: 300 }}
                    source={{ uri: photo}}
                />
                <Text>Name: {user.firstName}</Text>
                <Text>Age: {user.age}</Text>
                <Text>School: {user.school}</Text>
                <Text>Occupation: {user.occupation}</Text>
            </View>
        );
    }
}

export default UserDetailScreen;
