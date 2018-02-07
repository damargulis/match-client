import React from 'react';
import { 
    SectionList, 
    StyleSheet, 
    View, 
    Text, 
    Button, 
    AsyncStorage 
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const GLOBAL = require('./Globals');

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
            + '/rsvp?eventId=' 
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

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount() {
        fetch(GLOBAL.BASE_URL + '/events')
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                events: response
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <SectionList
                    sections={[
                        {title: 'Today', data: this.state.events},
                    ]}
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
