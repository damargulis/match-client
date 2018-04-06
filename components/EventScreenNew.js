import React from 'react';
import {View} from 'react-native';
import EventListContainer from './EventListContainer';
import EventFilterContainer from './EventFilterContainer';

const EventScreenNew = () => (
    <View>
        <EventFilterContainer />
        <EventListContainer />
    </View>
);

export default EventScreenNew;
