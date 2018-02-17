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

    savePhotos() {
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
                    source={{uri: this.props.screenProps.mainPhoto}}
                />
                <View style={{flex: 1, }} >
                    <Text>Name: {this.props.screenProps.user.firstName}</Text>
                    <Text>Age: {this.props.screenProps.user.age}</Text>
                    <Text>Occupation: {this.props.screenProps.user.occupation}</Text>
                    <Text>School: {this.props.screenProps.user.school}</Text>
                    <Text>Gender: {this.props.screenProps.user.gender}</Text>
                    <Text>
                        Interested In: {this.props.screenProps.user.interestsGender}
                    </Text>
                    <Text>
                        Maximum Distance: {this.props.screenProps.user.interestsDistance}
                    </Text>
                    <Text>{
                        'Age Range: ' 
                        + this.props.screenProps.user.interestsAgeMin
                        + '-'
                        + this.props.screenProps.user.interestsAgeMax
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
                        original={this.props.screenProps.user}
                        save={() => this.save()}
                        userId={this.props.screenProps.user._id}
                    />
                </Modal>
                <Modal
                    visible={this.state.editingPhotos}
                    animationType={'slide'}
                    onRequestClose={() => this.closePhotoModal()}
                >
                    <EditPhotosScreen 
                        closeModal={() => this.closePhotoModal()}
                        photos={this.props.screenProps.user.photos}
                        savePhotos={() => this.savePhotos()}
                        userId={this.props.screenProps.user._id}
                    />
                </Modal>
            </View>
        )
    }
};

export default ProfileScreen;
