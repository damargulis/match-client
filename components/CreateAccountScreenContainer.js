import { Actions } from 'react-native-router-flux';
import { attemptCreateAccount } from '../actions/auth';
import { connect } from 'react-redux';
import CreateAccountScreen from './CreateAccountScreen';
import React from 'react';

class CreateAccountScreenContainer extends React.Component {
    createAccount(query) {
        this.props.createAccount(query).then(() => {
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

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
    createAccount: (query) => dispatch(attemptCreateAccount(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAccountScreenContainer);
