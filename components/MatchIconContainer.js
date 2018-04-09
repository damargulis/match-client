import { connect } from 'react-redux';
import MatchIcon from './MatchIcon';
import React from 'react';

class MatchIconContainer extends React.Component {
    render() {
        return (
            <MatchIcon match={{}}/>
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
)(MatchIconContainer);
