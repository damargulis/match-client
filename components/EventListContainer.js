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
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            //cheat simulator
            const query = {
                longitude: -90.295861,
                latitude: 38.650768,
                interestsDistance: this.props.interestsDistance,
            };
            this.setState({location: position.coords});
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
                interestsDistance: this.props.interestsDistance,
            };
            this.setState({location: position.coords});
            this.props.fetchEventsIfNeeded(query);
            this.props.setLocation(position, this.props.userId);
        });
    }

    onEndReached() {
        if(this.props.events.length) {
            this.props.fetchEventsIfNeeded({
                longitude: this.state.location.longitude,
                latitude: this.state.location.latitude,
                interestsDistance: this.props.interestsDistance,
                afterTime: this.props.events[
                this.props.events.length - 1
                ].startTime,
            });
        }
    }

    render(){
        return (
            <EventList
                events={this.props.events}
                gotoDetails={Actions.eventDetailScreen}
                onEndReached={this.onEndReached.bind(this)}
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
    const events = getEvents(
        state.events,
        state.visibilityFilter,
        state.auth.userId
    );
    const userId = state.auth.userId;
    const user = state.users[userId];
    const interestsDistance = user && user.interestsDistance;
    return {
        events: events,
        userId: userId,
        interestsDistance: interestsDistance,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEventsIfNeeded: (query) => dispatch(fetchEventsIfNeeded(query)),
    setLocation: (query, userId) => dispatch(setLocation(query, userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListContainer);
