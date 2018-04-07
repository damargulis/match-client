import {
    AsyncStorage,
    Button,
    Modal,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateAccount from './CreateAccount';
import React from 'react';

const GLOBAL = require('./../Globals');

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showWarning: false,
            createAccount: false,
        };
    }

    closeModal() {
        this.setState({
            createAccount: false,
        });
    }

    createAccount() {
        this.setState({
            createAccount: true,
        });
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
                password: this.state.password,
            }),
        })
        .then((response) => response.json())
        .then(async (response) => {
            if(response.success){
                await AsyncStorage.setItem('userId',
                    response.userId.toString()
                );
                Actions.appScreen({user: response.user});
            } else{
                this.setState({
                    showWarning: true,
                });
            }
        });
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
                <Modal
                    visible={this.state.createAccount}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <CreateAccount
                        closeModal={() => this.closeModal()}
                    />
                </Modal>
            </View>
        );
    }
}

export default LoginScreen;
