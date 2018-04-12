import {
    Button,
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

    renderExtraInfo() {
        return (
            <View>
                <Text>Extra Info</Text>
            </View>
        );
    }

    renderSwipes() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Button
                        color='red'
                        title='No'
                        style={{flex: 1, backgroundColor: 'red'}}
                        onPress={() => this.swipe(false)}
                    >
                    </Button>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        color='green'
                        title='Yes'
                        style={{flex: 1, backgroundColor: 'green'}}
                        onPress={() => this.swipe(true)}
                    >
                    </Button>
                </View>
            </View>
        );
    }

    swipe(like){
        this.props.swipe(like);
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
                {
                    this.props.matched
                        ? this.renderExtraInfo()
                        : this.renderSwipes()
                }
            </View>
        );
    }
}

export default UserDetailScreen;
