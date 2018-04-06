import EventFilterContainer from './EventFilterContainer';
import EventListContainer from './EventListContainer';
import React from 'react';
import {View} from 'react-native';

const EventScreenNew = () => (
    <View>
        <EventFilterContainer />
        <EventListContainer />
    </View>
);

export default EventScreenNew;
