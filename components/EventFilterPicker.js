import { connect } from 'react-redux';
import { setEventFilter, EventFilters } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    value: state.filter === EventFilters.SHOW_ALL,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setEventFilter(ownProps.value));
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Something)
