import { Button, Image, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';

const GLOBAL = require('../Globals');

class EditPhotosScreen extends React.Component {
    renderPhoto(index) {
        const photos = this.props.photoData || [];
        const addedPhotos = this.props.addedPhotos || [];
        const allPhotos = photos.concat(addedPhotos);
        const photoData = allPhotos[index];
        if(photoData) {
            return (
                <View key={index}>
                    <Image
                        source={{uri: photoData}}
                        style={{width: 129, height: 129}}
                        key={index}
                    />
                    <Button title="Delete" onPress={this.props.deletePhoto} />
                </View>
            );
        } else {
            return (
                <TouchableHighlight
                    onPress={this.props.addPhoto}
                    key={index}
                    style={{width: 130, height: 130, backgroundColor: 'red'}}
                >
                    <Text tyle={{textAlign: 'center'}}>Add a photo!</Text>
                </TouchableHighlight>
            );
        }
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        width: 400,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {
                        Array(GLOBAL.MAX_PHOTOS).fill().map((_, index) => {
                            return this.renderPhoto(index);
                        })
                    }
                </View>
                <Button title="Save" onPress={this.props.save} />
                <Button title="Cancel" onPress={this.props.cancel} />
            </View>
        );
    }
}

export default EditPhotosScreen;
