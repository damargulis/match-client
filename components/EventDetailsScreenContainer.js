import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { toggleRsvpIfNeeded } from '../actions/events';

class EventDetailsScreenContainer extends React.Component {
    toggleRsvp() {
        this.props.toggleRsvp({
            userId: this.props.userId,
            eventId: this.props.event._id,
        });
    }

    render() {
        const { event } = this.props;
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        return (
            <View>
                <Text>{event.name}</Text>
                <Text>Starting: {startTime.toLocaleString()}</Text>
                <Text>Ending: {endTime.toLocaleString()}</Text>
                <Text>Number attendees: {
                    event.attendees ? event.attendees.length : 0 }</Text>
                <Text>Attending: {event.attending ? 'Yes' : 'No'}</Text>
                <Button
                    title={event.attending ? 'Cancel' : 'RSVP'}
                    onPress={this.toggleRsvp.bind(this)}
                />

            </View>
        );
    }
}

const mapStateToProps = (state, props) => ({
    event: state.events.eventsById[props.eventId],
    userId: state.user.profile._id,
});

const mapDispatchToProps = (dispatch) => ({
    toggleRsvp: (query) => dispatch(toggleRsvpIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventDetailsScreenContainer);
