import React from 'react';
import {
    AsyncStorage,
    Button,
    Picker,
    ScrollView,
    Slider,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const GLOBAL = require('./../Globals');

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 18,
            interestsDistance: 50,
            interestsAgeMin: 18,
            interestsAgeMax: 99,
        }
    }

    createAccount() {
        fetch(GLOBAL.BASE_URL + '/auth/createAccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: this.state
            })
        }).then((response) => response.json())
        .then((response) => {
            if(response.success){
                AsyncStorage.setItem('userId', response.userId.toString())
                .then(() => {
                    Actions.appScreen({user: response.user});
                }).then(() => {
                    this.props.closeModal()
                });
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <Text>Create an account!</Text>
                <Text>Username:</Text>
                <TextInput onChangeText={(val) => this.setState({username: val})} />
                <Text>Password:</Text>
                <TextInput onChangeText={(val) => this.setState({password: val})} />
                <Text>First Name:</Text>
                <TextInput onChangeText={(val) => this.setState({firstName: val})} />
                <Text>Age: {this.state.age}</Text>
                <Slider
                    step={1}
                    minimumValue={18}
                    maximumValue={99}
                    onValueChange={(val) => this.setState({age: val})}
                />
                <Text>Occupation:</Text>
                <TextInput 
                    value={this.state.occupation} 
                    onChangeText={(val) => this.setState({occupation: val})}
                />
                <Text>School:</Text>
                <TextInput 
                    value={this.state.school} 
                    onChangeText={(val) => this.setState({school: val})}
                />
                <Text>Gender:</Text>
                <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(val)=>this.setState({gender: val})}
                >
                    <Picker.Item label='Male' value='Male'/>
                    <Picker.Item label='Female' value='Female'/>
                </Picker>
                <Text>Interested In:</Text>
                <Picker
                    selectedValue={this.state.interestsGender}
                    onValueChange={ (val)=>this.setState({interestsGender: val}) }
                >
                    <Picker.Item label='Male' value='Male'/>
                    <Picker.Item label='Female' value='Female'/>
                    <Picker.Item label='Any' value='Any'/>
                </Picker>
                <Text>Maximum Distance: { this.state.interestsDistance }</Text>
                <Slider
                    step={1}
                    minimumValue={1}
                    maximumValue={300}
                    value={this.state.interestsDistance}
                    onValueChange={ (val) => this.setState({interestsDistance: val})}
                />
                <Text>Minimum Age: {this.state.interestsAgeMin}</Text>
                <Slider
                    step={1}
                    minimumValue={18}
                    maximumValue={this.state.interestsAgeMax}
                    value={this.state.interestsAgeMin}
                    onValueChange={(val) => this.setState({interestsAgeMin: val})}
                />
                <Text>Maximum Age: {this.state.interestsAgeMax}</Text>
                <Slider
                    step={1}
                    minimumValue={this.state.interestsAgeMin}
                    maximumValue={99}
                    value={this.state.interestsAgeMax}
                    onValueChange={(val) => this.setState({interestsAgeMax: val})}
                />
                <Button
                    title="Create"
                    onPress={() => this.createAccount()}
                />
                <Button
                    title="Cancel"
                    onPress={() => this.props.closeModal()}
                />
            </ScrollView>
        )
    }
}

export default CreateAccount;
