import {Text, View} from 'react-native';
import React from 'react';
import ProfileScreen from './ProfileScreen';
import { connect } from 'react-redux';

class ProfileScreenContainer extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <ProfileScreen user={user} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user.profile,
});

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreenContainer);
