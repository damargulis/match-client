import { Button, Image, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';

class ProfileScreen extends React.Component {
    renderImage(photo) {
        if(photo.item) {
            return (
                <Image
                    source={{uri: photo.item}}
                    style={{flex: 1, height: 300, width: 300}}
                />
            );
        } else {
            return (
                <View style={{flex: 1, height: 300, width: 300}} >
                    <Text>Loading</Text>
                </View>
            );
        }
    }

    render() {
        const { user, logout, editInfo, photos, editPhotos } = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Carousel
                    renderItem={this.renderImage}
                    data={photos}
                    itemWidth={300}
                    sliderWidth={350}
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
                <Button title="Edit Photos" onPress={editPhotos} />
            </View>
        );
    }
}

export default ProfileScreen;
