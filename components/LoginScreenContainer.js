import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginIfNeeded } from '../actions/auth';
import LoginScreen from './LoginScreen';
import React from 'react';

class LoginScreenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login(query) {
        const {login} = this.props;
        login(query).then(() => {
            Actions.appScreen();
        }).catch((error) => {
            this.setState({errorMessage: error.message})
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
                errorMessage={this.state.errorMessage}
            />
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    login: (query) => dispatch(loginIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreenContainer);
