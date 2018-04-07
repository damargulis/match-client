import { createAccount, loginIfNeeded } from '../actions/auth';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import React from 'react';

class LoginScreenContainer extends React.Component {
    login(query) {
        const {login} = this.props;
        login(query).then(() => {
            Actions.appScreen();
        });
    }

    createAccount() {
        Actions.createAccountScreen();
    }

    render() {
        return (
            <LoginScreen
                login={this.login.bind(this)}
                createAccount={this.createAccount.bind(this)}
            />
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    login: (query) => dispatch(loginIfNeeded(query)),
    createAccount: (query) => dispatch(createAccount(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreenContainer);
