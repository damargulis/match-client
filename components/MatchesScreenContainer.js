import { connect } from 'react-redux';
import MatchesScreen from './MatchesScreen';
import React from 'react';

class MatchesScreenContainer extends React.Component {
    render() {
        return (
            <MatchesScreen />
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchesScreenContainer);
