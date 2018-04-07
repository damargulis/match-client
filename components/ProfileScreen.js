import React from 'react';
import { Button, Text, View } from 'react-native';

class ProfileScreen extends React.Component {
    render() {
        const { user, logout } = this.props;
        return (
            <View>
                <Text>Profile Screen</Text>
                <Text>Name: {user.firstName}</Text>
                <Text>Age: {user.age}</Text>
                <Text>Occuptation: {user.occupation}</Text>
                <Text>School: {user.school}</Text>
                <Text>Gender: {user.gender}</Text>
                <Text>Interested In: {user.interestsGender}</Text>
                <Text>Maximum Distance: {user.interestsDistance}</Text>
                <Text>Age Range: {user.interestsAgeMin}-{user.interestsAgeMax}</Text>
                <Button title="Log Out" onClick={logout} />
            </View>
        );
    }
}

export default ProfileScreen;
