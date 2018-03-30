import React from 'react';
import {
    AsyncStorage,
    Button,
    Image,
    Text,
    View,
} from 'react-native';

const GLOBAL = require('./../../Globals');

const picMap = {
    Concert: require('./concert.png'),
    Bar: require('./bar.png'),
    Movie: require('./movie.png'),
    Restaurant: require('./restaurant.png'), 
    Play: require('./play.png'),
    Sports: require('./sports.png'),
    Museum: require('./museum.png'),
};

class EventDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attending: false,
            eventDetails: {},
            userId: null,
        };
    }

    refreshEvent() {
        fetch(GLOBAL.BASE_URL
            + '/event/'
            + this.props.navigation.state.params.event._id
        ).then((response) => response.json())
        .then((response) => {
            this.setState({
                eventDetails: response
            });
        });
    }

    componentWillMount() {
        this.refreshEvent();
        AsyncStorage.getItem('userId')
        .then((userId) => {
            this.setState({
                userId: userId
            });
            fetch(
                GLOBAL.BASE_URL
                + '/event/rsvp?eventId='
                + this.props.navigation.state.params.event._id
                + '&userId='
                + userId
            ).then((response) => response.json())
            .then((response) => {
                this.setState({
                    attending: response.attending
                });
            });
        });
    }

    rsvp(){
        let url = GLOBAL.BASE_URL + '/event';
        if(this.state.attending){
            url = url + '/cancel';
        } else {
            url = url + '/rsvp';
        }
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.userId,
                eventId: this.state.eventDetails._id,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success){
                this.props.navigation.state.params.refreshEvents();
                this.setState({
                    attending: !this.state.attending,
                });
            }
        }).then(() => {
            this.refreshEvent();
        });
    }

    render() {
        let event = this.state.eventDetails;
        let date = new Date(event.startTime);
        return (
            <View>
                <Image 
                    source={
                        picMap[this.props.navigation.state.params.event.type]
                    } 
                    style={{
                        height: 100,
                        width: 100,
                    }}
                />
                <Text>{event.name}</Text>
                <Text>{date.toLocaleDateString()}</Text>
                <Text>{date.toLocaleTimeString()}</Text>
                <Text>Number attendees: {
                    event.attendees ? event.attendees.length : 0
                }</Text>
                <Text>Attending: {this.state.attending ? 'Yes' : 'No'}</Text>
                <Button 
                    title={this.state.attending ? 'Cancel' : 'RSVP'} 
                    onPress={this.rsvp.bind(this)}
                />
            </View>
        );
    }
}

export default EventDetailsScreen;
