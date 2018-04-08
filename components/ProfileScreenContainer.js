import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import ProfileScreen from './ProfileScreen';
import React from 'react';
import { fetchPhotoIfNeeded } from '../actions/photos';

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
    let user = state.users[state.auth.userId] || {};
    let photos = user.photos || [];
    let photoId = photos[0];
    let photoData = state.photos[photoId] || {};
    return {
        user: state.users[state.auth.userId] || {},
        photoId: photoId,
        photo: photoData.data,
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    fetchPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
