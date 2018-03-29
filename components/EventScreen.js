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
            userEvents: []
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.screenProps.position){
            if(!this.props.screenProps.position || (
                this.props.screenProps.position.coords.longitude != newProps.screenProps.position.coords.longitude
                || this.props.screenProps.position.coords.latitude != newProps.screenProps.position.coords.latitude
                || this.props.screenProps.user.interestsDistance != newProps.screenProps.user.interestsDistance)){
                this.getEvents(newProps.screenProps);
            }
        }
    };

    componentWillMount() {
        this.getEvents(this.props.screenProps);
    }

    setDates(events) {
        for(var i=0; i<events.length; i++) {
            events[i].date = new Date(events[i].startTime);
        }
        let sortedEvents = events.sort((a, b) => {b.date - a.date });
        return sortedEvents
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
                    events: this.setDates(response)
                });
            })
            .catch((error) => {
                console.error(error);
            });
        }
        fetch(GLOBAL.BASE_URL
            + '/user/'
            + props.user._id
            + '/events'
        ).then((response) => response.json())
        .then((response) => {
            this.setState({
                userEvents: this.setDates(response)
            });
        });
    }

    onToggle(){
        this.setState({
            allEvents: !this.state.allEvents
        });
    }

    render() {
        let sections = [];
        let events = this.state.allEvents ? this.state.events : this.state.userEvents;
        var prevDay = null;
        var currData = [];
        for(var i=0; i < events.length; i++){
            let event = events[i];
            if(prevDay && prevDay.getDate() == event.date.getDate()
                && prevDay.getMonth() == event.date.getMonth()
                && prevDay.getYear() == event.date.getYear()
            ){
                currData.push(event);
            }else{
                if(prevDay){
                    sections.push({
                        title: prevDay.toLocaleDateString(),
                        data: currData
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
                data: currData
            });
        }
        return (
            <View 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 30
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
                                title={item.name} 
                                onPress={
                                    () => this.props.navigation.navigate(
                                        'Details', 
                                        {event: item}
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
                />
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
      container: {
             flex: 1,
             paddingTop: 22
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
