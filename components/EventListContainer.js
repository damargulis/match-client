import { connect } from 'react-redux';
import { toggleRsvp, EventFilters } from '../actions';
import EventList from './EventList';


const getVisibleEvents = (events, filter) => {
    switch(filter) {
        case EventFilters.SHOW_ATTENDING:
            return events.filter(evt => evt.attending);
        case EventFilters.SHOW_ALL:
        default:
            return events
    }
}

const mapStateToProps = state => ({
    events: getVisibleEvents(state.events, state.filter)
});

const mapDispatchToProps = dispatch => ({
    toggleRsvp: _id => dispatch(toggleRsvp(_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList)
