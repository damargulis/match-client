import MatchesScreen from './MatchesScreen';
import React from 'react';
import { connect } from 'react-redux';

class MatchesScreenContainer extends React.Component {
    render() {
        return (
            <MatchesScreen />
        );
    }
}

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchesScreenContainer);
