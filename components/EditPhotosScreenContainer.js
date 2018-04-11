import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EditPhotosScreen from './EditPhotosScreen';
import React from 'react';
import { reloadUser } from '../actions/users';
import { savePhoto } from '../actions/photos';

var ImagePicker = require('react-native-image-picker');

class EditPhotosScreenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedPhotos: [],
        };
    }

    cancel() {
        Actions.pop();
    }

    save() {
        Promise.all(this.state.addedPhotos.map((photo) => {
            return this.props.savePhoto({
                userId: this.props.userId,
                photo: photo,
            });
        })).then(() => {
            return this.props.reloadUser(this.props.userId);
        }).then(() => {
            Actions.pop();
        });
    }

    deletePhoto() {
    }

    addPhoto() {
        const options = {
            title: 'Upload Photo',
        };
        ImagePicker.showImagePicker(options, (response) => {
            if(!response.didCancel && !response.error) {
                const addedPhotos = this.state.addedPhotos;
                addedPhotos.push({
                    uri: response.uri,
                    data: response.data,
                    path: response.path,
                    type: response.type,
                });
                this.setState({
                    addedPhotos: addedPhotos,
                });
            }
        });
    }

    render() {
        const addedPhotos = this.state.addedPhotos.map((photo) => photo.uri);
        return (
            <EditPhotosScreen
                deletePhoto={this.deletePhoto.bind(this)}
                cancel={this.cancel.bind(this)}
                save={this.save.bind(this)}
                addPhoto={this.addPhoto.bind(this)}
                userId={this.props.userId}
                photoIds={this.props.photoIds}
                photoData={this.props.photoData}
                addedPhotos={addedPhotos}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const userId = state.auth.userId;
    const user = state.users[userId];
    const photoIds = (user && user.photos) || [];
    const photoData = photoIds.map((photoId) => {
        const photo = state.photos[photoId] || {};
        return photo.data;
    });
    return {
        userId,
        photoIds,
        photoData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    savePhoto: (query) => dispatch(savePhoto(query)),
    reloadUser: (query) => dispatch(reloadUser(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPhotosScreenContainer);
