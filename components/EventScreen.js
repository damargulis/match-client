import React from 'react';
import { 
    Button, 
    SectionList, 
    StyleSheet, 
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
            events: []
        }
    }

    componentWillMount() {
        if(this.props.screenProps.position){
            fetch(
                GLOBAL.BASE_URL 
                + '/event?long=' 
                + this.props.screenProps.position.coords.longitude
                + '&lat=' 
                + this.props.screenProps.position.coords.latitude
            ).then((response) => response.json())
            .then((response) => {
                for(var i=0; i<response.length; i++){
                    response[i].date = new Date(response[i].startTime);
                }
                let events = response.sort((a, b) => { b.date - a.date });
                this.setState({
                    events: events
                });
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    render() {
        let sections = [];
        let events = this.state.events;
        var prevDay = null;
        var currData = []
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
