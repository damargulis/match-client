import { Text, View } from 'react-native';
import React from 'react';
import CreateAccountScreen from './CreateAccountScreen';
import { attemptCreateAccount } from '../actions/auth';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class CreateAccountScreenContainer extends React.Component {
    createAccount(query) {
        this.props.createAccount(query).then((resposne) => {
            Actions.appScreen();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <CreateAccountScreen 
                createAccount={this.createAccount.bind(this)}
                cancel={() => Actions.pop()}
            />
        );
    }
}

const mapStateToProps = (state, props) => ({

});

const mapDispatchToProps = (dispatch, props) => ({
    createAccount: (query) => dispatch(attemptCreateAccount(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAccountScreenContainer);
