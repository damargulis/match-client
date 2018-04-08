import {
    EventFilters,
    fetchEventsIfNeeded,
} from '../actions/events';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EventList from './EventList';
import React from 'react';

class EventListContainer extends React.Component{
    componentDidMount() {
        //TODO: get real location tracking back
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
                gotoDetails={Actions.eventDetailScreen}
            />
        );
    }
}

const getVisibleEvents = (events, filter, userId) => {
    switch(filter) {
    case EventFilters.SHOW_ATTENDING:
        return events.filter(evt => {
            return evt.attendees.includes(userId);
        });
    case EventFilters.SHOW_ALL:
    default:
        return events;
    }
};

const getEvents = (events, filter, userId) => {
    const allEvents = events.allEvents.map((evt) => {
        return events.eventsById[evt];
    });
    return getVisibleEvents(allEvents, filter, userId);
};

const mapStateToProps = state => {
    return {events: getEvents(
        state.events,
        state.visibilityFilter,
        state.auth.userId,
    )};
};

const mapDispatchToProps = dispatch => ({
    fetchEventsIfNeeded: (query) => dispatch(fetchEventsIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListContainer);
