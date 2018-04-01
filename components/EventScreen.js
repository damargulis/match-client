import React from 'react';
import { 
    Switch,
    Text, 
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventDetailsScreen from './EventScreen/EventDetailsScreen';
import EventList from './EventScreen/EventList';

const GLOBAL = require('./../Globals');

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            allEvents: true,
            userEvents: [],
        };
    }

    componentWillReceiveProps(newProps) {
        let oldPosition = this.props.screenProps.position;
        let newPosition = newProps.screenProps.position;
        let oldInterestsDist = this.props.screenProps.user.interestsDistance;
        let newInterestsDist = newProps.screenProps.user.interestsDistance;
        if(newPosition){
            if(!oldPosition || (
                oldPosition.coords.longitude != newPosition.coords.longitude
                || oldPosition.coords.latitude != newPosition.coords.latitude
                || oldInterestsDist != newInterestsDist)){
                this.getEvents(newProps.screenProps);
            }
        }
    }

    componentWillMount() {
        this.getEvents(this.props.screenProps);
        this.getUserEvents();
    }

    setDates(events) {
        for(var i=0; i<events.length; i++) {
            events[i].date = new Date(events[i].startTime);
        }
        let sortedEvents = events.sort(function(a, b){return a.date - b.date;});
        return sortedEvents;
    }

    getUserEvents(){
        fetch(GLOBAL.BASE_URL
            + '/user/'
            + this.props.screenProps.user._id
            + '/events'
        ).then((response) => response.json())
        .then((response) => {
            this.setState({
                userEvents: this.setDates(response),
            });
        });
    }

    getEvents(props){
        if(props.position){
            fetch(
                GLOBAL.BASE_URL 
                + '/event?long=' 
                + props.position.coords.longitude
                + '&lat=' 
                + props.position.coords.latitude
                + '&maxDist='
                + props.user.interestsDistance
            ).then((response) => response.json())
            .then((response) => {
                this.setState({
                    events: this.setDates(response),
                });
            });
        }
    }

    onToggle(){
        this.setState({
            allEvents: !this.state.allEvents,
        });
    }

    onEndReached(){
        if(this.state.updating) return;
        this.setState({updating: true});
        var url = GLOBAL.BASE_URL;
        if(this.state.allEvents) {
            if(!this.state.events) return;
            if(!this.props.screenProps.position) return;
            url += '/event?long='
                + this.props.screenProps.position.coords.longitude
                + '&lat='
                + this.props.screenProps.position.coords.latitude
                + '&maxDist='
                + this.props.screenProps.user.interestsDistance
                + '&afterTime='
                + this.state.events[this.state.events.length - 1].startTime;
        } else {
            return;
        }
        fetch(url)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                events: this.state.events.concat(this.setDates(response)),
                updating: false,
            });
        });
    }

    render() {
        let events = this.state.allEvents ? 
            this.state.events : this.state.userEvents;
        return (
            <View 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 30,
                    }}
                >
                    <Text>Your Events</Text> 
                    <Switch 
                        value={this.state.allEvents}
                        onValueChange={this.onToggle.bind(this)}
                    />
                    <Text>All Events</Text>
                </View>
                <View style={{flex: 10}}>
                    <EventList 
                        events={events} 
                        onEndReached={this.onEndReached.bind(this)}
                        navigation={this.props.navigation} 
                        getUserEvents={this.getUserEvents.bind(this)}
                    />
                </View>
            </View>
        );
    }
}


const EventsScreen = StackNavigator({
    Home: {
        screen: MainScreen,
        navigationOptions: {
            headerTitle: 'Events',
        },
    },
    Details: {
        screen: EventDetailsScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
});

export default EventsScreen;
