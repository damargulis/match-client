import {
    Button,
    Picker,
    Slider,
    Text,
    TextInput,
    View,
} from 'react-native';
import React from 'react';

const GLOBAL = require('./../../Globals');

class EditInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edits: Object.assign({}, this.props.original),
        };
    }

    setEdit(key, value) {
        const edits = this.state.edits;
        edits[key] = value;
        this.setState({edits: edits});
    }

    save() {
        fetch(GLOBAL.BASE_URL + '/user/' + this.props.userId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: this.state.edits,
            }),
        }).then(response => response.json())
        .then((response) => {
            if(response.success) {
                this.props.save();
            }
        });
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
                    onPress={() => this.save()}
                />
            </View>
        );
    }
}

export default EditInfoScreen;
