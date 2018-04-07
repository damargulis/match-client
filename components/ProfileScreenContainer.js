import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import ProfileScreen from './ProfileScreen';
import React from 'react';

import { fetchPhotoIfNeeded } from '../actions/user';

class ProfileScreenContainer extends React.Component {
    componentDidMount() {
        console.log('fetching from mount');
        console.log(this.props.user);
        this.props.fetchPhotoIfNeeded({
            photoId: this.props.user.photos[0]
        });
    }

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

const mapStateToProps = (state) => ({
    user: state.user.profile ? state.user.profile : {},
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    fetchPhotoIfNeeded: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
