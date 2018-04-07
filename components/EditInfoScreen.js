import {
    Button,
    Picker,
    Slider,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import React from 'react';

class EditInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        const {
            _id,
            firstName,
            age,
            occupation,
            school,
            gender,
            interestsGender,
            interestsDistance,
            interestsAgeMin,
            interestsAgeMax,
        } = this.props.original;
        this.state = {
            edits: Object.assign({}, {
                _id,
                firstName,
                age,
                occupation,
                school,
                gender,
                interestsGender,
                interestsDistance,
                interestsAgeMin,
                interestsAgeMax,
            }),
        };
    }

    save() {
        this.props.save(this.state.edits);
    }

    setEdit(key, value) {
        const edits = this.state.edits;
        edits[key] = value;
        this.setState({edits: edits});
    }

    render() {
        return(
            <ScrollView>
                <Text>Edit Info Form</Text>
                <Text>First Name:</Text>
                <TextInput
                    value={this.state.edits.firstName}
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
                    title="Submit"
                    onPress={this.save.bind(this)}
                />
                <Button
                    title="Cancel"
                    onPress={this.props.cancel}
                />
            </ScrollView>
        );
    }
}

export default EditInfoScreen;
