import React from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableHighlight,
    CameraRoll
} from 'react-native';

var ImagePicker = require('react-native-image-picker');
const GLOBAL = require('./../../Globals');

class EditPhotosScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalPhotos: this.props.photos.slice(),
            newPhotos: [],
            newData: null,
        }
    }

    addPhoto(){
        let options = {
            title: 'Upload Photo',
        };
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel) {
                console.log('User cancelled');
            } else if(response.error) {
                console.log('Image picker error', response.error);
            } else {
                let newPhotos = this.state.newPhotos;
                let source = response.uri;
                newPhotos.push({
                    'uri': response.uri,
                    'data': response.data,
                    'path': response.path,
                    'type': response.type
                });
                this.setState({
                    newPhotos: newPhotos,
                })
            }
        });
    }

    submitPhotos(){
        let photo = this.state.newPhotos[0];
        const data = new FormData();
        data.append('photo', {
            uri: photo.uri,
            type: 'image/png',
            name: 'testName',
        });
        fetch(GLOBAL.BASE_URL + '/user/' + this.props.userId + '/photos', {
            method: 'POST',
            body: data
        }).then((response) => response.json())
        .then((response) => {
            let photoId = response.photoId
            fetch(GLOBAL.BASE_URL + '/user/photo/' + photoId)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    newData: response.data.data,
                });
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    renderPhoto(photoIndex) {
        let photos = this.state.originalPhotos.concat(this.state.newPhotos);
        let photo = photos[photoIndex];
        if(photo) {
            return (
                <View style={{width: 130, height: 130}} key={photoIndex} >
                    <Image 
                        source={{ uri: photo.uri }}
                        style={{width: 129, height: 129}}
                        key={photoIndex}
                    />
                </View>
            )
        }else {
            return (
                <TouchableHighlight
                    onPress={() => this.addPhoto()}
                    key={photoIndex} 
                    style={{width: 130, height: 130, backgroundColor: 'red'}}
                >
                    <Text style={{textAlign: 'center'}}>Add A Photo</Text>
                </TouchableHighlight>
            )
        }
    }

    render() {
        return(
            <View>
            <View>
                <Text>Photo Editing Page</Text>
                <View style={{
                    width: 400,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                    {
                        Array(GLOBAL.MAX_PHOTOS).fill().map((_, index) => {
                            return this.renderPhoto(index);
                        })
                    }
                </View>
                <Button
                    title="Submit"
                    onPress={() => this.submitPhotos()}
                />
                <Button
                    title="Cancel"
                    onPress={() => this.props.closeModal()}
                />
            </View>
            </View>
        )
    }
}

export default EditPhotosScreen;
