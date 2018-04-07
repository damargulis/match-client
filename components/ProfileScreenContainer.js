import { connect } from 'react-redux';
import ProfileScreen from './ProfileScreen';
import React from 'react';

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
