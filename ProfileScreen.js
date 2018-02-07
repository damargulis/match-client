import React from 'react';
import { 
    Slider, 
    Picker, 
    TextInput, 
    Modal, 
    AsyncStorage, 
    Button, 
    Image, 
    Viee, 
    Text 
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const GLOBAL = require('./Globals');

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
            edits: {
            },
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

    editInfo() {
        this.setState({
            editingInfo: true,
        });
    }

    closeModal() {
        this.setState({
            editingInfo: false,
            edits: Object.assign({}, this.state.profile)
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
                    style={{ flex: 1, }} 
                    source={require('./profile_pic.jpg')}
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
                    <EditScreen closeModal={() => this.closeModal()} 
                        original={this.state.profile}
                        save={(edits) => this.save(edits)}
                    />
                </Modal>
            </View>
        )
    }
};

export default ProfileScreen;
