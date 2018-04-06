import { SectionList, Text } from 'react-native';
import EventListItem from './EventListItem';
import React from 'react';

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
                    onClick={() => toggleRsvp(item._id)}
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
        keyExtractor={(item) => item._id}
    />
);

export default EventList;

