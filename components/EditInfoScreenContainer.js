import {Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EditInfoScreen from './EditInfoScreen';
import React from 'react';

import { editInfoIfNeeded } from '../actions/user';

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
        )
    }
}

const mapStateToProps = (state) => ({
    original: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
    save: (query) => dispatch(editInfoIfNeeded(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditInfoScreenContainer);
