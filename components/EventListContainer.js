import { EventFilters, toggleRsvp } from '../actions';
import { connect } from 'react-redux';
import EventList from './EventList';

const getVisibleEvents = (events, filter) => {
    switch(filter) {
    case EventFilters.SHOW_ATTENDING:
        return events.filter(evt => evt.attending);
    case EventFilters.SHOW_ALL:
    default:
        return events;
    }
};

const mapStateToProps = state => ({
    events: getVisibleEvents(state.events, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
    toggleRsvp: _id => dispatch(toggleRsvp(_id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList);
