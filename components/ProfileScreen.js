import { Button, Image, Text, View } from 'react-native';
import React from 'react';

import GLOBAL from '../Globals.js';

class ProfileScreen extends React.Component {
    render() {
        const { user, logout } = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: user.photoData}} style={{flex: 1, height: 400, width: 400}} />
                <Text>Profile Screen</Text>
                <Text>Name: {user.firstName}</Text>
                <Text>Age: {user.age}</Text>
                <Text>Occuptation: {user.occupation}</Text>
                <Text>School: {user.school}</Text>
                <Text>Gender: {user.gender}</Text>
                <Text>Interested In: {user.interestsGender}</Text>
                <Text>Maximum Distance: {user.interestsDistance}</Text>
                <Text>Age Range: {
                    user.interestsAgeMin}-{user.interestsAgeMax
                }</Text>
                <Button title="Log Out" onPress={logout} />
            </View>
        );
    }
}

export default ProfileScreen;
