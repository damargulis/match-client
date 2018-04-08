import { loadUserById } from '../actions/users';
import { connect } from 'react-redux';
import React from 'react';
import UserDetailScreen from './UserDetailScreen';
import { fetchPhotoIfNeeded } from '../actions/photos';

class UserDetailScreenContainer extends React.Component {
    componentDidMount() {
        this.props.loadUser(this.props.userId)
        .then(() => {
            this.props.getPhoto({photoId: this.props.user.photos[0]});
        })
    }

    render() {
        return (
            <UserDetailScreen 
                user={this.props.user}
                photo={this.props.photo}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    let user = state.users[props.userId] || {};
    let photos = user.photos || [];
    let photo = state.photos[photos[0]] || {};
    return {
        user: user,
        photo: photo.data,
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    loadUser: (swipeId) => dispatch(loadUserById(swipeId)),
    getPhoto: (query) => dispatch(fetchPhotoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserDetailScreenContainer);
