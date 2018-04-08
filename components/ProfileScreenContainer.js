import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { logout } from '../actions/auth';
import ProfileScreen from './ProfileScreen';
import React from 'react';

class ProfileScreenContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPhoto({
            photoId: this.props.photoId,
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
        const { user, photo } = this.props;
        return (
            <ProfileScreen
                user={user}
                logout={this.logout.bind(this)}
                editInfo={this.editInfo.bind(this)}
                photo={photo}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.users[state.auth.userId] || {};
    const photos = user.photos || [];
    const photoId = photos[0];
    const photoData = state.photos[photoId] || {};
    return {
        user: state.users[state.auth.userId] || {},
        photoId: photoId,
        photo: photoData.data,
    };
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    fetchPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
