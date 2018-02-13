import React from 'react';
import {
    AsyncStorage,
    Button,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const GLOBAL = require('./../Globals');

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showWarning: false,
        };
    }

    createAccount() {
        fetch(GLOBAL.BASE_URL + '/auth/createAccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then(async (response) => {
            if(response.success){
                try {
                    await AsyncStorage.setItem('userId', response.userId)
                } catch (error) {
                    console.log(error);
                }
                Actions.appScreen();
            } else {
                this.setState({
                    showWarning: true
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    login() {
        fetch(GLOBAL.BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then(async (response) => {
            if(response.success){
                try {
                    await AsyncStorage.setItem('userId', 
                        response.userId.toString()
                    );
                } catch (error) {
                    console.log(error);
                }
                Actions.appScreen({user: response.user});
            } else{
                this.setState({
                    showWarning: true
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    showWarning() {
        if(this.state.showWarning) {
            return ( <Text>Login Failed</Text> );
        } else{
            return null;
        }
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
                { this.showWarning() }
                <Button
                    title="Login"
                    onPress={this.login.bind(this)}
                />
                <Button
                    title="Create Account"
                    onPress={this.createAccount.bind(this)}
                />
            </View>
        )
    }
};

export default LoginScreen;
