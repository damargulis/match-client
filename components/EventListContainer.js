import React from 'react';
import { EventFilters, toggleRsvp, fetchEventsIfNeeded } from '../actions';
import { connect } from 'react-redux';
import EventList from './EventList';

class EventListContainer extends React.Component{
    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.props);
        let query = {
            longitude: -90.295861,
            latitude: 38.650768,
            interestsDistance: 50
        }
        this.props.fetchEventsIfNeeded(query);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render(){
        return (
            <EventList events={this.props.events} toggleRsvp={this.props.toggleRsvp} />
        )
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
    fetchEventsIfNeeded: (query) => dispatch(fetchEventsIfNeeded(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListContainer);
