import React from 'react';
import { 
    Modal, 
    AsyncStorage, 
    Button, 
    Image, 
    View, 
    Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import EditPhotosScreen from './ProfileScreen/EditPhotosScreen';
import EditInfoScreen from './ProfileScreen/EditInfoScreen';

const GLOBAL = require('./../Globals');

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
                this.setState({ 
                    profile: response, 
                    edits: Object.assign({}, response) 
                });
                let mainPhotoId = response.photos[0];
                if(mainPhotoId){
                    fetch(GLOBAL.BASE_URL + '/user/photo/' + mainPhotoId)
                    .then((response) => response.json())
                    .then((response) => {
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
                    <EditInfoScreen 
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
                        savePhotos={(newPhotos) => this.savePhotos(newPhotos)}
                        userId={this.state.userId}
                        reloadPhoto={() => this.reloadPhoto()}
                    />
                </Modal>
            </View>
        )
    }
};

export default ProfileScreen;
