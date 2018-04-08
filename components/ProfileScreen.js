import { Button, Image, Text, View } from 'react-native';
import React from 'react';

class ProfileScreen extends React.Component {
    render() {
        const { user, logout, editInfo, photo } = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={{uri: photo}}
                    style={{flex: 1, height: 400, width: 400}}
                />
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
                <Button title="Edit Info" onPress={editInfo} />
            </View>
        );
    }
}

export default ProfileScreen;
