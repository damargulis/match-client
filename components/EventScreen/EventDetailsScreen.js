import React from 'react';
import {
    AsyncStorage,
    Button,
    Text,
    View,
} from 'react-native';

const GLOBAL = require('./../../Globals');

class EventDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attending: false,
            eventDetails: {},
            userId: null,
        };
    }

    async componentWillMount(){
        fetch(
            GLOBAL.BASE_URL 
            + '/event/' 
            + this.props.navigation.state.params.event._id
        ).then((response) => response.json())
        .then((response) => {
            this.setState({
                eventDetails: response
            });
        })
        .catch((error) => {
            console.log(error);
        });

        var userId;
        try {
            userId = await AsyncStorage.getItem('userId')
        } catch (error) {
            console.log(error);
        }
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
            })
        })
        .catch((error) => {
            console.log(error);
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
                this.setState({
                    attending: !this.state.attending,
                });
            }
        })
    }

    render() {
        return (
            <View>
                <Text>Event Details</Text>
                <Text>{this.props.navigation.state.params.event.name}</Text>
                <Text>
                    {this.props.navigation.state.params.event.startTime}
                </Text>
                <Text>
                    {
                        ("description" in this.state.eventDetails) ? 
                        this.state.eventDetails.description : '' 
                    }
                </Text>
                <Text>Number attendees</Text>
                <Text>Attending: {this.state.attending ? 'Yes' : 'No'}</Text>
                <Button 
                    title={this.state.attending ? 'Cancel' : 'RSVP'} 
                    onPress={this.rsvp.bind(this)}
                />
            </View>
        )
    }
};

export default EventDetailsScreen;
