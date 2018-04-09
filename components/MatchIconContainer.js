import { connect } from 'react-redux';
import React from 'react';
import MatchIcon from './MatchIcon';

class MatchIconContainer extends React.Component {
    render() {
        return (
            <MatchIcon match={{}}/>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchIconContainer);
