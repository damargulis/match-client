import React from 'react';
import { 
    AsyncStorage, 
    Button, 
    Image, 
    Modal, 
    Text,
    View, 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import EditInfoScreen from './ProfileScreen/EditInfoScreen';
import EditPhotosScreen from './ProfileScreen/EditPhotosScreen';

const GLOBAL = require('./../Globals');

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.screenProps.user,
            editingInfo: false,
            editingPhotos: false,
            mainPhoto: this.props.screenProps.mainPhoto,
        }
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

    save() {
        this.props.screenProps.refreshProfile();
        this.closeModal();
    }

    savePhotos(newPhotos) {
        this.props.screenProps.refreshProfile();
        this.closePhotoModal();
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
                        save={() => this.save()}
                        userId={this.state.profile._id}
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
                        savePhotos={(newPhotos) => this.savePhotos()}
                        userId={this.state.profile._id}
                    />
                </Modal>
            </View>
        )
    }
};

export default ProfileScreen;
