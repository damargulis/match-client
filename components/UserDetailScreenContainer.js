import { connect } from 'react-redux';
import { fetchPhotoIfNeeded } from '../actions/photos';
import { loadUserById } from '../actions/users';
import React from 'react';
import UserDetailScreen from './UserDetailScreen';

class UserDetailScreenContainer extends React.Component {
    componentDidMount() {
        this.props.loadUser(this.props.userId)
        .then(() => {
            this.props.getPhoto({photoId: this.props.user.photos[0]});
        });
    }

    render() {
        return (
            <UserDetailScreen
                user={this.props.user}
                photo={this.props.photo}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const user = state.users[props.userId] || {};
    const photos = user.photos || [];
    const photo = state.photos[photos[0]] || {};
    return {
        user: user,
        photo: photo.data,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadUser: (swipeId) => dispatch(loadUserById(swipeId)),
    getPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserDetailScreenContainer);
