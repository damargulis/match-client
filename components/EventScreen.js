import EventFilterContainer from './EventFilterContainer';
import EventListContainer from './EventListContainer';
import React from 'react';
import {View} from 'react-native';

const EventScreen = () => (
    <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <EventFilterContainer />
        <EventListContainer />
    </View>
);

export default EventScreen;
