import {
    Image,
    Text,
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';

class UserDetailScreen extends React.Component {
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

    render () {
        const { photos, user } = this.props;
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
                <Text>Name: {user.firstName}</Text>
                <Text>Age: {user.age}</Text>
                <Text>School: {user.school}</Text>
                <Text>Occupation: {user.occupation}</Text>
            </View>
        );
    }
}

export default UserDetailScreen;
