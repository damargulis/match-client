import { SectionList, Text, View } from 'react-native';
import EventListItem from './EventListItem';
import React from 'react';

const EventList = ({ events, toggleRsvp }) => {
    return (
        <View style={{flex: 10}} >
            <SectionList
                sections={[{
                    title: 'Now',
                    data: events,
                }]}
                renderItem={
                    ({item}) => {
                        return(
                            <EventListItem
                                {...item}
                                onClick={() => toggleRsvp(item._id)}
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
            />
        </View>
    );
}
;

export default EventList;

