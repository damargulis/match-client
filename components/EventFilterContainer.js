import { connect } from 'react-redux';
import EventFilter from './EventFilter';
import { setEventFilter } from '../actions/events';

const mapStateToProps = (state) => {
    return {
        eventFilter: state.visibilityFilter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEventFilter: (filter) => {
            return dispatch(setEventFilter(filter));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter);
