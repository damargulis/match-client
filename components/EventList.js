import React from 'react';
import EventListItem from './EventListItem';
import { SectionList, Text } from 'react-native';

const EventList = ({ events, toggleRsvp }) => (
    <SectionList
        sections={[{
            title: 'Now',
            data: events,
        }]}
        renderItem={
            ({item}) => (
                <EventListItem
                    {...item}
                    onClick={() => toggleRsvp(event._id)}
                />
            )
        }
        renderSectionHeader={
            ({section}) => (
                <Text>
                    {section.title}
                </Text>
            )
        }
        keyExtractor={(item, index) => item._id}
    />
);

export default EventList;

