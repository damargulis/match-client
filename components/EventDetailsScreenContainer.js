import { Button, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { toggleRsvpIfNeeded } from '../actions/events';

//const picMap = {
//    Concert: require('./EventScreen/concert.png'),
//    Bar: require('./EventScreen/bar.png'),
//    Movie: require('./EventScreen/movie.png'),
//    Restaurant: require('./EventScreen/restaurant.png'),
//    Play: require('./EventScreen/play.png'),
//    Sports: require('./EventScreen/sports.png'),
//    Museum: require('./EventScreen/museum.png'),
//};

class EventDetailsScreenContainer extends React.Component {
    toggleRsvp() {
        this.props.toggleRsvp({
            userId: this.props.userId,
            eventId: this.props.event._id,
        });
    }

    render() {
        const {event, toggleRsvp} = this.props;
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        console.log("RENDERHERE!!");
        console.log(event);
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
                //<Image
                //    source={
                //        picMap[event.type]
                //    }
                //    style={{
                //        height: 100,
                //        width: 100,
                //    }}
                ///>

///THIS IS JUST TEMP
//(for real fix this shit)
function getEventById(events, eventId) {
    const event = events.filter((evt) => (evt._id === eventId))[0];
    return event;
}

const mapStateToProps = (state, props) => ({
    event: state.events.eventsById[props.eventId],
    userId: state.user.profile._id
});

const mapDispatchToProps = (dispatch, props) => ({
    toggleRsvp: (query) => dispatch(toggleRsvpIfNeeded(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventDetailsScreenContainer);
