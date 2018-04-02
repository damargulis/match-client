import {
    Button,
    SectionList,
    StyleSheet,
    Text,
} from 'react-native';
import React from 'react';

class EventList extends React.Component {
    render() {
        const sections = [];
        var prevDay = null;
        var currData = [];

        const events = this.props.events;
        const currentDay = Date.now();
        for(var i=0; i < events.length; i++){
            const event = events[i];
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
                                        refreshEvents: this.props.getUserEvents,
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
                onEndReached={this.props.onEndReached}
            />
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

export default EventList;
