import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/user';
import { logout } from '../actions/auth';
import ProfileScreen from './ProfileScreen';
import React from 'react';

class ProfileScreenContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPhotoIfNeeded({
            photoId: this.props.user.photos[0],
        });
    }

    logout() {
        this.props.logout().then(() => {
            Actions.loginScreen();
        });
    }

    editInfo() {
        Actions.editInfoScreen();
    }

    render() {
        const { user } = this.props;
        return (
            <ProfileScreen
                user={user}
                logout={this.logout.bind(this)}
                editInfo={this.editInfo.bind(this)}
            />
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
