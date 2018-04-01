import React from 'react';
import { 
    Button, 
    SectionList, 
    StyleSheet, 
    Switch,
    Text, 
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventDetailsScreen from './EventScreen/EventDetailsScreen';

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
            });
        });
    }

    render() {
        let sections = [];
        let events = this.state.allEvents ? 
            this.state.events : this.state.userEvents;
        var prevDay = null;
        var currData = [];

        let currentDay = Date.now();
        for(var i=0; i < events.length; i++){
            let event = events[i];
            if(event.date < currentDay) {
                currData.push(event);
            } else if(prevDay && prevDay.getDate() == event.date.getDate()
                && prevDay.getMonth() == event.date.getMonth()
                && prevDay.getYear() == event.date.getYear()
            ){
                currData.push(event);
            }else{
                if(prevDay){
                    sections.push({
                        title: prevDay.toLocaleDateString(),
                        data: currData,
                    });
                } else {
                    sections.push({
                        title: 'Ongoing',
                        data: currData,
                    });
                }
                currData = [];
                currData.push(event);
                prevDay = event.date;
            }
        }
        if(prevDay){
            sections.push({
                title: prevDay.toLocaleDateString(),
                data: currData,
            });
        }
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
                    <SectionList
                        sections={sections}
                        renderItem={
                            ({item}) => (
                                <Button 
                                    style={styles.item} 
                                    title={item.type + ': ' + item.name} 
                                    onPress={
                                        () => this.props.navigation.navigate(
                                            'Details', 
                                            {
                                                event: item,
                                                refreshEvents: 
                                                    this.getUserEvents
                                                    .bind(this),
                                            }
                                        )
                                    } 
                                />
                            )
                        }
                        renderSectionHeader={
                            ({section}) => (
                                <Text style={styles.sectionHeader}>
                                    {section.title}
                                </Text>
                            )
                        }
                        keyExtractor={(item, index) => index}
                        onEndReached={this.onEndReached.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

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
