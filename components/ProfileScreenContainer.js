import { connect } from 'react-redux';
import ProfileScreen from './ProfileScreen';
import React from 'react';
import { logout } from '../actions/auth';
import { Actions } from 'react-native-router-flux';


class ProfileScreenContainer extends React.Component {
    logout() {
        this.props.logout().then(() => {
            Actions.loginScreen();
        });
    }
    render() {
        const { user } = this.props;
        return (
            <ProfileScreen user={user} logout={this.logout.bind(this)} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user.profile ? state.user.profile : {},
});

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
