import { Actions } from 'react-native-router-flux';
import { attemptCreateAccount } from '../actions/auth';
import { connect } from 'react-redux';
import CreateAccountScreen from './CreateAccountScreen';
import React from 'react';

class CreateAccountScreenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createAccount(query) {
        this.props.createAccount(query).then(() => {
            Actions.appScreen();
        }).catch((error) => {
            this.setState({errorMessage: error.message});
        });
    }

    render() {
        return (
            <CreateAccountScreen
                createAccount={this.createAccount.bind(this)}
                cancel={() => Actions.pop()}
                errorMessage={this.state.errorMessage}
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
