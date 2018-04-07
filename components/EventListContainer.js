import { EventFilters, fetchEventsIfNeeded, toggleRsvp } from '../actions';
import { connect } from 'react-redux';
import EventList from './EventList';
import React from 'react';
import { Actions } from 'react-native-router-flux';

class EventListContainer extends React.Component{
    componentDidMount() {
        const query = {
            longitude: -90.295861,
            latitude: 38.650768,
            interestsDistance: 50,
        };
        this.props.fetchEventsIfNeeded(query);
    }

    render(){
        return (
            <EventList
                events={this.props.events}
                toggleRsvp={this.props.toggleRsvp}
                gotoDetails={Actions.eventDetailScreen}
            />
        );
    }
}

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
    events: getVisibleEvents(state.events.items, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
    toggleRsvp: _id => dispatch(toggleRsvp(_id)),
    fetchEventsIfNeeded: (query) => dispatch(fetchEventsIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListContainer);
