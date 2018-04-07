import { Button, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { toggleRsvp } from '../actions/events';

const picMap = {
    Concert: require('./EventScreen/concert.png'),
    Bar: require('./EventScreen/bar.png'),
    Movie: require('./EventScreen/movie.png'),
    Restaurant: require('./EventScreen/restaurant.png'),
    Play: require('./EventScreen/play.png'),
    Sports: require('./EventScreen/sports.png'),
    Museum: require('./EventScreen/museum.png'),
};

class EventDetailsScreenContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        const {event, toggleRsvp} = this.props;
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        return (
            <View>
                <Image
                    source={
                        picMap[event.type]
                    }
                    style={{
                        height: 100,
                        width: 100,
                    }}
                />
                <Text>{event.name}</Text>
                <Text>Starting: {startTime.toLocaleString()}</Text>
                <Text>Ending: {endTime.toLocaleString()}</Text>
                <Text>Number attendees: {
                    event.attendess ? event.attendees.length : 0 }</Text>
                <Text>Attending: {event.attending ? 'Yes' : 'No'}</Text>
                <Button
                    title={event.attending ? 'Cancel' : 'RSVP'}
                    onPress={toggleRsvp}
                />

            </View>
        );
    }
}

///THIS IS JUST TEMP
//(for real fix this shit)
function getEventById(events, eventId) {
    const event = events.filter((evt) => (evt._id === eventId))[0];
    return event;
}

const mapStateToProps = (state, props) => ({
    event: getEventById(state.events.items, props.eventId),
});

const mapDispatchToProps = (dispatch, props) => ({
    toggleRsvp: () => dispatch(toggleRsvp(props.eventId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventDetailsScreenContainer);
