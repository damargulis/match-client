import React from 'react';
import LoginScreen from './LoginScreen';
import { connect } from 'react-redux';
import { loginIfNeeded, createAccount } from '../actions';
import { Actions } from 'react-native-router-flux';

class LoginScreenContainer extends React.Component {
    login(query) {
        const {login} = this.props;
        login(query).then(() => {
            Actions.appScreen();
        });
    }

    render() {
        return (
           <LoginScreen login={this.login.bind(this)}/> 
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    login: (query) => dispatch(loginIfNeeded(query)),
    createAccount: (query) => dispatch(createAccount(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreenContainer);
