import {
    EventFilters,
    fetchEventsIfNeeded,
} from '../actions/events';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EventList from './EventList';
import React from 'react';
import { setLocation } from '../actions/users';

class EventListContainer extends React.Component{
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            //cheat simulator
            const query = {
                longitude: -90.295861,
                latitude: 38.650768,
                interestsDistance: 50,
            };
            this.props.fetchEventsIfNeeded(query);
            this.props.setLocation(position, this.props.userId);
        }, () => {
            //cheat simulator
            const position = {
                coords: {
                    longitude: -90.295861,
                    latitude: 38.650768,
                },
            };
            const query = {
                longitude: -90.295861,
                latitude: 38.650768,
                interestsDistance: 50,
            };
            this.props.fetchEventsIfNeeded(query);
            this.props.setLocation(position, this.props.userId);
        });
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
    ), userId: state.auth.userId};
};

const mapDispatchToProps = dispatch => ({
    fetchEventsIfNeeded: (query) => dispatch(fetchEventsIfNeeded(query)),
    setLocation: (query, userId) => dispatch(setLocation(query, userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListContainer);
