import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { logout } from '../actions/auth';
import ProfileScreen from './ProfileScreen';
import React from 'react';

class ProfileScreenContainer extends React.Component {
    componentDidMount() {
        this.props.photoIds.map((photoId) => {
            this.props.fetchPhoto({
                photoId: photoId,
            });
        });
    }

    logout() {
        Actions.loginScreen();
        this.props.logout(this.props.user._id).then();
    }

    editInfo() {
        Actions.editInfoScreen();
    }

    editPhotos() {
        Actions.editPhotosScreen();
    }

    render() {
        const { user, photoDatas } = this.props;
        return (
            <ProfileScreen
                user={user}
                logout={this.logout.bind(this)}
                editInfo={this.editInfo.bind(this)}
                photos={photoDatas}
                editPhotos={this.editPhotos.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.users[state.auth.userId] || {};
    const photoIds = user.photos || [];
    const photoDatas = photoIds.map((photoId) => {
        const photo = state.photos[photoId] || {};
        return photo.data;
    });
    return {
        user: state.users[state.auth.userId] || {},
        photoIds: photoIds,
        photoDatas: photoDatas,
    };
};

const mapDispatchToProps = (dispatch) => ({
    logout: (userId) => dispatch(logout(userId)),
    fetchPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
