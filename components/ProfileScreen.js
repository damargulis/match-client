import React from 'react';
import { 
    Slider, 
    Picker, 
    TextInput, 
    Modal, 
    AsyncStorage, 
    Button, 
    Image, 
    View, 
    Text,
    TouchableHighlight,
    CameraRoll,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

var ImagePicker = require('react-native-image-picker');

const GLOBAL = require('./../Globals');

class EditPhotosScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos.slice(),
            newPhotos: [],
            newData: null,
            showNew: false,
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

    movePhoto(){
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
                    showNew: true,
                });
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    renderPhoto(photoIndex) {
        let photos = this.state.photos.concat(this.state.newPhotos);
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

    showNew() {
        if(this.state.showNew) {
            var b64encode = btoa(String.fromCharCode.apply(null, this.state.newData));
            b64encode = 'data:imgae/jpeg;base64,' + b64encode;
            return (
                <View style={{width: 130, height: 130}} >
                    <Image 
                        source={{ uri: b64encode }}
                        style={{width: 129, height: 129}}
                    />
                </View>
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
                    { this.showNew() }
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

class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edits: Object.assign({}, this.props.original),
        };
    }

    setEdit(key, value) {
        let edits = this.state.edits;
        edits[key] = value;
        this.setState({edits: edits});
    }

    render() {
        return(
            <View>
                    <Text>Edit Info Form</Text>
                    <Text>First Name:</Text>
                    <TextInput 
                        onChangeText={(val) => this.setEdit('firstName', val)}
                    />
                    <Text>Age: {this.state.edits.age}</Text>
                    <Slider
                        step={1}
                        minimumValue={18}
                        maximumValue={99}
                        value={this.state.edits.age}
                        onValueChange={(val) => this.setEdit('age', val)}
                    />
                    <Text>Occupation:</Text>
                    <TextInput 
                        value={this.state.edits.occupation} 
                        onChangeText={(val) => this.setEdit('occupation', val)}
                    />

                    <Text>School:</Text>
                    <TextInput 
                        value={this.state.edits.school} 
                        onChangeText={(val) => this.setEdit('school', val)}
                    />
                    <Text>Gender:</Text>
                    <Picker
                        selectedValue={this.state.edits.gender}
                        onValueChange={(val)=>this.setEdit('gender', val)}
                    >
                        <Picker.Item label='Male' value='Male'/>
                        <Picker.Item label='Female' value='Female'/>
                    </Picker>
                    <Text>Interested In:</Text>
                    <Picker
                        selectedValue={this.state.edits.interestsGender}
                        onValueChange={
                            (val)=>this.setEdit('interestsGender', val)
                        }
                    >
                        <Picker.Item label='Male' value='Male'/>
                        <Picker.Item label='Female' value='Female'/>
                        <Picker.Item label='Any' value='Any'/>
                    </Picker>
                    <Text> {
                        'Maximum Distance: '
                        + this.state.edits.interestsDistance
                        + ' miles'
                    }</Text>
                    <Slider
                        step={1}
                        minimumValue={1}
                        maximumValue={300}
                        value={this.state.edits.interestsDistance}
                        onValueChange={
                            (val) => this.setEdit('interestsDistance', val)
                        }
                    />
                    <Text>Minimum Age: {this.state.edits.interestsAgeMin}</Text>
                    <Slider
                        step={1}
                        minimumValue={18}
                        maximumValue={this.state.edits.interestsAgeMax}
                        value={this.state.edits.interestsAgeMin}
                        onValueChange={
                            (val) => this.setEdit('interestsAgeMin', val)
                        }
                    />
                    <Text>Maximum Age: {this.state.edits.interestsAgeMax}</Text>
                    <Slider
                        step={1}
                        minimumValue={this.state.edits.interestsAgeMin}
                        maximumValue={99}
                        value={this.state.edits.interestsAgeMax}
                        onValueChange={
                            (val) => this.setEdit('interestsAgeMax', val)
                        }
                    />
                    <Button
                        title="Cancel"
                        onPress={() => this.props.closeModal()}
                    />
                    <Button
                        title="Save"
                        onPress={() => this.props.save(this.state.edits)}
                    />
            </View>
        )
    }
}

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
            },
            editingInfo: false,
            editingPhotos: false,
            edits: {
            },
            mainPhoto: null,
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({ userId: userId });
            fetch(GLOBAL.BASE_URL + '/user/' + userId)
            .then((response) => response.json())
            .then((response) => {
                console.log('got profile');
                console.log(response);
                this.setState({ 
                    profile: response, 
                    edits: Object.assign({}, response) 
                });
                let mainPhotoId = response.photos[0];
                if(mainPhotoId){
                    fetch(GLOBAL.BASE_URL + '/user/photo/' + mainPhotoId)
                    .then((response) => response.json())
                    .then((response) => {
                        console.log('got photo');
                        console.log(response);
                        var b64encode = btoa(String.fromCharCode.apply(null, response.data.data));
                        b64encode = 'data:image/jpeg;base64,' + b64encode;
                        this.setState({
                            mainPhoto: b64encode
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    logout() {
        fetch(GLOBAL.BASE_URL + '/logout')
        .then((response) => {
            Actions.loginScreen();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    save(edits) {
        fetch(GLOBAL.BASE_URL + '/user/' + this.state.userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: edits
            }),
        }).then(response => response.json())
        .then((resposne) => {
            if(resposne.success) {
                this.setState({
                    profile: edits
                });
            }
            this.closeModal();
        }).catch((error) => console.log(error));
    }

    savePhotos(newPhotos) {
        console.log('Saving photos:');
        console.log(newPhotos);
    }

    reloadPhoto() {
    }

    editInfo() {
        this.setState({
            editingInfo: true,
        });
    }

    editPhotos() {
        this.setState({
            editingPhotos: true,
        });
    }

    closeModal() {
        this.setState({
            editingInfo: false,
            edits: Object.assign({}, this.state.profile)
        });
    }

    closePhotoModal() {
        this.setState({
            editingPhotos: false,
        });
    }

    render() {
        return (
            <View 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <Image 
                    style={{ flex: 1, height: 400, width: 400}} 
                    source={{uri: this.state.mainPhoto}}
                />
                <View style={{flex: 1, }} >
                    <Text>Name: {this.state.profile.firstName}</Text>
                    <Text>Age: {this.state.profile.age}</Text>
                    <Text>Occupation: {this.state.profile.occupation}</Text>
                    <Text>School: {this.state.profile.school}</Text>
                    <Text>Gender: {this.state.profile.gender}</Text>
                    <Text>
                        Interested In: {this.state.profile.interestsGender}
                    </Text>
                    <Text>
                        Maximum Distance: {this.state.profile.interestsDistance}
                    </Text>
                    <Text>{
                        'Age Range: ' 
                        + this.state.profile.interestsAgeMin
                        + '-'
                        + this.state.profile.interestsAgeMax
                    }</Text>
                    <Button
                        title="Edit Photos"
                        onPress={this.editPhotos.bind(this)}
                    />
                    <Button
                        title="Edit Info"
                        onPress={this.editInfo.bind(this)}
                    />
                    <Button
                        title="Log Out"
                        onPress={this.logout.bind(this)}
                    />
                </View>
                <Modal
                    visible={this.state.editingInfo}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <EditScreen 
                        closeModal={() => this.closeModal()} 
                        original={this.state.profile}
                        save={(edits) => this.save(edits)}
                    />
                </Modal>
                <Modal
                    visible={this.state.editingPhotos}
                    animationType={'slide'}
                    onRequestClose={() => this.closePhotoModal()}
                >
                    <EditPhotosScreen 
                        closeModal={() => this.closePhotoModal()}
                        photos={this.state.profile.photos}
                        savePhotos={(newPhotos) => this.savePhotos(newPhotoos)}
                        userId={this.state.userId}
                        reloadPhoto={() => this.reloadPhoto()}
                    />
                </Modal>
            </View>
        )
    }
};

export default ProfileScreen;
