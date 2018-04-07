import { Button, Text, TextInput, View } from 'react-native';
import React from 'react';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    login() {
        this.props.login({
            username: this.state.username,
            password: this.state.password,
        });
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>Login Page</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                />
                <Text style={{color: 'red'}}>{this.props.errorMessage}</Text>
                <Button
                    title="Login"
                    onPress={this.login.bind(this)}
                />
                <Button
                    title="Create Account"
                    onPress={this.props.createAccount}
                />
            </View>

        );
    }
}

export default LoginScreen;
