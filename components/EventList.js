import { SectionList, Text, View } from 'react-native';
import EventListItem from './EventListItem';
import React from 'react';

class EventList extends React.Component {
    render() {
        const sections = [];
        var prevDay = null;
        var currentData = [];
        const events = this.props.events;
        const currentDay = Date.now();
        for(var i=0; i<events.length; i++){
            const event = events[i];
            const date = new Date(event.startTime);
            if(date < currentDay) {
                currentData.push(event);
            } else if (prevDay && prevDay.getDate() == date.getDate()
                && prevDay.getMonth() == date.getMonth()
                && prevDay.getYear() == date.getYear()
            ) {
                currentData.push(event);
            } else {
                if(prevDay) {
                    sections.push({
                        title: prevDay.toLocaleDateString(),
                        data: currentData,
                    });
                } else {
                    sections.push({
                        title: 'Ongoing',
                        data: currentData,
                    });
                }
                currentData = [];
                currentData.push(event);
                prevDay = date;
            }
        }
        if(prevDay) {
            sections.push({
                title: prevDay.toLocaleDateString(),
                data: currentData,
            });
        }
        return (
            <View style={{flex: 10}} >
                <SectionList
                    sections={sections}
                    renderItem={
                        ({item}) => {
                            return(
                                <EventListItem
                                    {...item}
                                    onClick={
                                        () => this.props.gotoDetails(
                                            {eventId: item._id}
                                        )
                                    }
                                />
                            );
                        }
                    }
                    renderSectionHeader={
                        ({section}) => (
                            <Text>
                                {section.title}
                            </Text>
                        )
                    }
                    keyExtractor={(item) => item._id}
                    onEndReached={this.props.onEndReached}
                />
            </View>
        );
    }
}

export default EventList;

