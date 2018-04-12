import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { editInfoIfNeeded } from '../actions/users';
import EditInfoScreen from './EditInfoScreen';
import React from 'react';

class EditInfoScreenContainer extends React.Component {
    save(query) {
        this.props.save(query)
        .then(() => {
            Actions.pop();
        });
    }

    render() {
        return (
            <EditInfoScreen
                original={this.props.original}
                cancel={() => Actions.pop()}
                save={(query) => this.save(query)}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    original: state.users[state.auth.userId],
});

const mapDispatchToProps = (dispatch) => ({
    save: (query) => dispatch(editInfoIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditInfoScreenContainer);
